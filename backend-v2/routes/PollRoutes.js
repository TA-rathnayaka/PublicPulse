const {createPoll, deletePollById, getPollById, getPolls,getLatestPolls } = require('../controllers/pollController');
const express = require("express");
const router = express.Router();

router.get('/company/:institudeId', getPolls);
router.delete('/:pollId', deletePollById);
router.post('/', createPoll);
router.get('/', getPolls);
router.get('/latest', getLatestPolls);
  

module.exports = router;
