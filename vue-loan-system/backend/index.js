require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const users = require('./user')
const authMiddleware = require('./middleware/auth')
const pool = require('./db');
const hashed = '$2b$10$2P6C7nh1/MT3huRGim6kg.iawilLYzUudb2pEQCoUCbDx/fnsRVAm'
const input = 'test'
const app = express()
app.use(cors())
app.use(express.json())

// POST /auth/login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Sending login response...');
res.json({
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email
  }
});
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const [existing] = await pool.query('SELECT id FROM user WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );

    const newUser = {
      id: result.insertId,
      name,
      email,
    };

    // Optionally auto-login: generate JWT
    const token = jwt.sign({ id: newUser.id, name: newUser.name, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: newUser,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /profile (protected)
// app.get('/profile', authMiddleware, async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT id, name, email FROM user WHERE id = ?', [req.user.id]);
//     const user = rows[0];

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ user });
//   } catch (err) {
//     console.error('Profile fetch error:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// Start server
app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});
