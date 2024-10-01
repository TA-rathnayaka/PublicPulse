const pool = require('../config/db'); // Assuming you are using a pool from a db.js file

// Function to cast a vote
const vote = async (req, res) => {
  const { userId, pollId, optionId } = req.body;

  try {
    // Check if the user has already voted in this poll
    const existingVoteQuery = `
      SELECT * FROM Votes
      WHERE UserId = $1 AND Poll_id = $2
    `;
    const existingVote = await pool.query(existingVoteQuery, [userId, pollId]);

    if (existingVote.rows.length > 0) {
      return res.status(400).json({ message: 'User has already voted in this poll.' });
    }

    // Insert the new vote
    const insertVoteQuery = `
      INSERT INTO Votes (UserId, Poll_id, OptionId)
      VALUES ($1, $2, $3)
    `;
    await pool.query(insertVoteQuery, [userId, pollId, optionId]);

    res.status(200).json({ message: 'Vote successfully cast.' });
  } catch (error) {
    res.status(500).json({ message: 'Error casting vote', error });
  }
};

// Function to cancel a vote
const cancelVote = async (req, res) => {
  const { userId, pollId } = req.body;

  try {
    // Check if the user has voted in this poll
    const existingVoteQuery = `
      SELECT * FROM Votes
      WHERE UserId = $1 AND Poll_id = $2
    `;
    const existingVote = await pool.query(existingVoteQuery, [userId, pollId]);

    if (existingVote.rows.length === 0) {
      return res.status(404).json({ message: 'Vote not found for this poll and user.' });
    }

    // Delete the vote
    const deleteVoteQuery = `
      DELETE FROM Votes
      WHERE UserId = $1 AND Poll_id = $2
    `;
    await pool.query(deleteVoteQuery, [userId, pollId]);

    res.status(200).json({ message: 'Vote successfully canceled.' });
  } catch (error) {
    res.status(500).json({ message: 'Error canceling vote', error });
  }
};

module.exports = { vote, cancelVote };
