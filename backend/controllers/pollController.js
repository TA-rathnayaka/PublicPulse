const User = require('../models/user');
const Poll = require('../models/poll');

const createPoll = async (req, res) => {
    try {
      const { question, description, options, endDate, status } = req.body;
  
      const newPoll = new Poll({
        question,
        description,
        options,
        endDate
      });
  
      const savedPoll = await newPoll.save();
      res.status(201).json({ message: 'Poll created successfully', poll: savedPoll });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create poll', error });
    }
  };
  
  const getPollById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const poll = await Poll.findById(id);
      if (!poll) {
        return res.status(404).json({ message: 'Poll not found' });
      }
      res.status(200).json({ poll });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch poll', error });
    }
  };
  
  const deletePoll = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedPoll = await Poll.findByIdAndDelete(id);
      if (!deletedPoll) {
        return res.status(404).json({ message: 'Poll not found' });
      }
      res.status(200).json({ message: 'Poll deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete poll', error });
    }
  };

/*  const voteCounts = await Vote.aggregate([
    { $match: { pollId: mongoose.Types.ObjectId(pollId) } },
    { $group: { _id: '$optionId', count: { $sum: 1 } } }
  ]);
  ******for counting votes*****
  **complete this later**
  
  */


module.exports = { analyzeVotesByDistrict,analyzeVotesByAge  };
