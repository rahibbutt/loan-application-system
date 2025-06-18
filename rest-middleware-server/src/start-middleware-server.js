const express = require('express');
const { ZBClient } = require('zeebe-node');
const cors = require('cors');

const app = express();
const port = 3005;

// Zeebe client
const zbc = new ZBClient({
  brokerContactPoint: 'zeebe:26500',
  hostname: 'zeebe'
});

// Middleware
app.use(express.json());
app.use(cors());

// 🚀 Register user route
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Registering user:', { name, email });

    // ✅ TODO: Add database and password hashing here
    // This is a dummy response for now
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server error during registration' });
  }
});

// 🚀 Zeebe start process route
app.post('/start-middleware-server', async (req, res) => {
  try {
    console.log("GOT POST REQUEST.....");
    const { workflowKey, variables } = req.body;

    const response = await zbc.createProcessInstanceWithResult({
      bpmnProcessId: workflowKey,
      variables,
    });

    console.log("Zeebe response", response);

    res.json({ success: true, response });
  } catch (error) {
    console.error('Error starting process instance:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server on 0.0.0.0 to work inside Docker
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server is running on http://0.0.0.0:${port}`);
});
