const express = require('express');
const AuthRoutes = require ('../routes/AuthRoutes')
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

app.use('/auth', AuthRoutes);

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
