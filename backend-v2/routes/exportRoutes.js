const express = require('express');
const router = express.Router();
const { exportCollectionToCSV } = require('../controllers/exportController');

// Route for exporting collection data as CSV
router.get('/export/:collectionName', exportCollectionToCSV);

module.exports = router;
