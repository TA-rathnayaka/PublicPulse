const express = require('express');
const router = express.Router();
const { vote, cancelVote } = require('../controllers/voteController');

// Route for casting a vote
router.post('/vote', vote);

// Route for canceling a vote
router.post('/cancel-vote', cancelVote);

module.exports = router;
