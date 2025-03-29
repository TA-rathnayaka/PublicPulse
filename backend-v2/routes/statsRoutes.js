const { getDashboardStats } = require('../controllers/statsController');

const express = require("express");
const router = express.Router(); 

// Separate endpoints for each count
router.get("/stats", getDashboardStats);

module.exports = router;