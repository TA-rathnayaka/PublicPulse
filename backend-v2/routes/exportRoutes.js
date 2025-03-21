const express = require('express');
const router = express.Router();
const { downloadPollCSV } = require('../controllers/exportController');

// Route for exporting collection data as CSV
router.get('/:pollId', downloadPollCSV);

module.exports = router;
