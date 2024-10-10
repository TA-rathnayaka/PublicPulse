const pool = require("../config/db");

const getPollById = async (req, res) => {
    const pollId = req.params.id; // Get pollId from request parameters
  
    try {
      // Fetch poll along with options and vote counts
      const pollQuery = `
          SELECT p.Question, p.Description, o.Option, COUNT(v.Optionid) AS vote_count
          FROM Polls p
          LEFT JOIN Options o ON p.PollId = o.Poll_id
          LEFT JOIN Votes v ON o.OptionId = v.Optionid
          WHERE p.PollId = $1
          GROUP BY p.Question, p.Description, o.Option
      `;
  
      // Fetch poll from database using pollId
      const result = await pool.query(pollQuery, [pollId]);
  
      // Handle case where poll is not found
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Poll not found" });
      }
  
      // Return poll details with options
      res.status(200).json(result.rows);
    } catch (error) {
      // Catch and return any errors
      res.status(500).json({ message: "Error fetching poll", error });
    }
  };
  

  const getPolls = async (req, res) => {
    try {
      // Fetch all polls along with their options and vote counts
      const pollQuery = `
        SELECT p.PollId, p.Question, p.Description, p.EndDate, o.Option, COUNT(v.Optionid) AS vote_count
        FROM Polls p
        LEFT JOIN Options o ON p.PollId = o.Poll_id
        LEFT JOIN Votes v ON o.OptionId = v.Optionid
        GROUP BY p.PollId, p.Question, p.Description, p.EndDate, o.Option, o.OptionId
        ORDER BY p.PollId, o.OptionId
      `;
  
      // Fetch all polls from the database
      const result = await pool.query(pollQuery);
  
      // Handle case where no polls are found
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No polls found" });
      }
  
      // Process result to group options and vote counts by poll
      const pollsMap = {};
  
      result.rows.forEach(row => {
        const pollId = row.pollid;
  
        // If poll is not in the map, add it
        if (!pollsMap[pollId]) {
          pollsMap[pollId] = {
            question: row.question,
            description: row.description,
            endDate: row.enddate,
            options: []
          };
        }
  
        // Add option and vote count to the poll's options array
        pollsMap[pollId].options.push({
          option: row.option,
          vote_count: parseInt(row.vote_count, 10)
        });
      });
  
      // Convert the polls map to an array
      const pollsArray = Object.values(pollsMap);
  
      // Return all polls with grouped options
      res.status(200).json(pollsArray);
    } catch (error) {
      // Catch and return any errors
      res.status(500).json({ message: "Error fetching polls", error });
    }
  };
  
  

const createPoll = async (req, res) => {
 
  const { question, description, endDate, options } = req.body;

  // Check if all required fields are provided
  if (!question || !options || options.length === 0) {
    return res
      .status(400)
      .json({ message: "Question and at least one option are required." });
  }

  try {
    // Insert the poll into the Polls table and return the PollId
    const pollResult = await pool.query(
      "INSERT INTO Polls (Question, Description, EndDate) VALUES ($1, $2, $3) RETURNING PollId",
      [question, description, endDate]
    );

    const pollId = pollResult.rows[0].pollid;

    // Prepare the batch insert query for the options (array of strings)
    const values = options.map((_, index) => `($1, $${index + 2})`).join(", ");
    const queryParams = [pollId, ...options];

    // Check for null or empty options
    if (options.some((option) => !option || option.trim() === "")) {
      return res
        .status(400)
        .json({ message: "Options cannot be null or empty." });
    }

    // Insert all options in one query
    await pool.query(
      `INSERT INTO Options (Poll_id, Option) VALUES ${values}`,
      queryParams
    );

    // Return success message
    res
      .status(201)
      .json({ message: "Poll and options created successfully", pollId });
  } catch (error) {
    // Return error message in case of failure
    res.status(500).json({ message: "Error creating poll", error });
  }
};

const deletePollById = async (req, res) => {
  const { pollId } = req.params;

  try {
    // Deleting the poll will also delete the options due to ON DELETE CASCADE
    await pool.query("DELETE FROM Polls WHERE PollId = $1", [pollId]);

    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting poll", error });
  }
};

const addOption = async (pollId, optionText) => {
  try {
    await pool.query("INSERT INTO Options (Poll_id, Option) VALUES ($1, $2)", [
      pollId,
      optionText,
    ]);
    res.status(201).json({ message: "Option added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding option", error });
  }
};

const deleteOption = async (optionId) => {
  try {
    await pool.query("DELETE FROM Options WHERE OptionId = $1", [optionId]);

    res.status(200).json({ message: "Option deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting option", error });
  }
};

module.exports = { createPoll, deletePollById, getPollById, getPolls };
