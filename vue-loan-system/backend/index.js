require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const users = require('./user')
const authMiddleware = require('./middleware/auth')
const db = require('./db');

const app = express()
app.use(cors())
app.use(express.json())

const existing = db.prepare('SELECT * FROM users WHERE email = ?').get('user@test.com');

if (!existing) {
  const passwordHash = bcrypt.hashSync('test123', 10);

  db.prepare(`INSERT INTO users (email, password_hash) VALUES (?, ?)`).run('user@test.com', passwordHash);


  console.log('Test user inserted: user@test.com / test123');
}

// POST /auth/login
app.post('/auth/login', async (req, res) => {
  console.log('Incoming request body:', req.body);
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  console.log('Matched user:', user);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash)
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  })
})

// GET /profile (protected)
app.get('/profile', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id)
  res.json({ user: { id: user.id, name: user.name, email: user.email } })
})

// Start server
app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`)
})
