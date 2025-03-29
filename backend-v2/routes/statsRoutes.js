const { getDashboardStats, getUserEngagement } = require('../controllers/statsController');

const express = require("express");
const router = express.Router(); 

// Separate endpoints for each count
router.get("/stats", getDashboardStats);

router.get('/engagement',getUserEngagement );


module.exports = router;