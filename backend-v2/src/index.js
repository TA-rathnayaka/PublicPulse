const express = require('express');
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO Users (email, password) VALUES ($1, $2) RETURNING UserId',
      [email, hashedPassword]
    );
    res.status(201).json({ userId: result.rows[0].userid });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

app.get('/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Users');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
