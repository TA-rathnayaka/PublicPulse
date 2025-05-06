const express = require('express');
const router = express.Router();
const { downloadPollCSV,downloadPolicyCSV } = require('../controllers/exportController');

// Route for exporting collection data as CSV
router.get('/:pollId', downloadPollCSV);
router.get('policy/:policyId',downloadPolicyCSV)

module.exports = router;
