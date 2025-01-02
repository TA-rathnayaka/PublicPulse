const express = require('express');
const { registerUser, loginUser, logout, checkAuth } = require('../controllers/AuthController');


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout',logout);
router.get('/api/check-auth',checkAuth);


module.exports = router;
