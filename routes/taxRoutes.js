const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/save', (req, res) => {
  const { user_id, annual_income, deductions, calculated_tax } = req.body;

  if (!user_id || !annual_income || !deductions || !calculated_tax) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO tax_data (user_id, annual_income, deductions, calculated_tax)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [user_id, annual_income, deductions, calculated_tax], (err, result) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'Tax data saved successfully' });
  });
});

module.exports = router;
