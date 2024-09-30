const express = require('express');
const router = express.Router();
const { uploadUserImage, uploadPollImage } = require('../controllers/uploadController');

// Route to upload user image
router.post('/user', uploadUserImage);

// Route to upload poll image
router.post('/poll', uploadPollImage);

module.exports = router;
