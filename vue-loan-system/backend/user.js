const bcrypt = require('bcryptjs')

const user = [
  {
    id: 1,
    name: 'Alice Example',
    email: 'user@example.com',
    passwordHash: bcrypt.hashSync('password123', 10), // store hashed passwords
  },

  {
  id: 2,
  name: 'Test',
  email: 'test@test.com',
  passwordHash: bcrypt.hashSync('test', 10)
}
]

module.exports = user
