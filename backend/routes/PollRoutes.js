const express = require('express');
const { getPollById,createPoll,deletePoll, getPolls } = require('../controllers/pollController');
const Auth = require('../Middleware/auth');

const router = express.Router();

router.get('/:id',Auth ,getPollById);
router.post('/', Auth,createPoll);
router.get('/',Auth, getPolls);
router.delete('/:id',Auth,deletePoll);


module.exports = router;
