const { getDashboardStats, getUserEngagement,  getLast7DaysComments , getUserCount} = require('../controllers/statsController');

const express = require("express");
const router = express.Router(); 

// Separate endpoints for each count
router.get("/stats", getDashboardStats);

router.get('/engagement',getUserEngagement );
router.get('/comments',getLast7DaysComments);
router.get('/user-count',getUserCount);

module.exports = router;