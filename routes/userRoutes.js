const express = require('express');
const router = express.Router();
const { registerUser } = require('../models/userModel');

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  registerUser(username, password, (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // ✅ Return user_id so frontend can store it
    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  });
});

module.exports = router;
