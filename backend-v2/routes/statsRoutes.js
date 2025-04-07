const { getDashboardStats, getUserEngagement,  getLast7DaysComments } = require('../controllers/statsController');

const express = require("express");
const router = express.Router(); 

// Separate endpoints for each count
router.get("/stats", getDashboardStats);

router.get('/engagement',getUserEngagement );
router.get('/comments',getLast7DaysComments);


module.exports = router;