const pool = require('../config/db');

const getUsers = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Users');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  };

module.exports=getUsers;