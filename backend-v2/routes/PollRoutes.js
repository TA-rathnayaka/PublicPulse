const {createPoll, deletePollById, getPollById, getPolls, } = require('../controllers/pollController');
const express = require("express");
const router = express.Router();

router.get('/company/:institudeId', getPolls);
router.delete('/:pollId', deletePollById);
router.post('/', createPoll);
router.get('/', getPolls);

module.exports = router;
