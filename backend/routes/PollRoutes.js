const express = require('express');
const { getPollById,createPoll,deletePoll, getPolls } = require('../controllers/pollController');


const router = express.Router();

router.get('/:id', getPollById);
router.post('/', createPoll);
router.get('/', getPolls);
router.delete('/:id',deletePoll);


module.exports = router;
