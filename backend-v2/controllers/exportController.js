const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");
const { firestore } = require("../config/firebase");

const downloadPollCSV = async (req, res) => {
  try {
    const { pollId } = req.params;

    // Fetch poll details
    const pollDoc = await firestore.collection("polls").doc(pollId).get();
    if (!pollDoc.exists) return res.status(404).json({ error: "Poll not found" });

    const pollData = pollDoc.data();
    const pollTitle = pollData.question; // Assuming 'question' is the poll title

    // Fetch votes for the poll
    const votesSnapshot = await firestore.collection("votes").where("pollId", "==", pollId).get();
    if (votesSnapshot.empty) return res.status(404).json({ error: "No votes found for this poll" });

    let votes = votesSnapshot.docs.map((doc) => doc.data());

    // Fetch all option texts for this poll
    const optionsSnapshot = await firestore.collection("options").where("pollId", "==", pollId).get();
    let optionsMap = {};
    optionsSnapshot.docs.forEach((doc) => {
      optionsMap[doc.id] = doc.data().text; // Map optionId to its text
    });

    // Find all possible fields (since votes may have different structures)
    let allFields = new Set(["Poll Title", "Option"]); // Always include these

    votes.forEach((vote) => {
      Object.keys(vote).forEach((key) => {
        if (key !== "pollId" && key !== "optionId") allFields.add(key);
      });
    });

    // Convert Set to Array for CSV header
    const csvFields = Array.from(allFields);

    // Format data for CSV
    const csvData = votes.map((vote) => {
      let row = {
        "Poll Title": pollTitle,
        "Option": optionsMap[vote.optionId] || "Unknown Option", // Fetch option text
      };

      csvFields.forEach((field) => {
        if (field !== "Poll Title" && field !== "Option") {
          row[field] = vote[field] || "N/A"; // Add dynamic fields if available
        }
      });

      return row;
    });

    // Convert JSON to CSV
    const csvParser = new Parser({ fields: csvFields });
    const csv = csvParser.parse(csvData);

    // Define file path
    const filePath = path.join(__dirname, `${pollId}_votes.csv`);
    fs.writeFileSync(filePath, csv);

    // Send CSV file
    res.download(filePath, `${pollId}_votes.csv`, () => {
      fs.unlinkSync(filePath); // Delete file after sending
    });
  } catch (error) {
    console.error("Error generating CSV:", error);
    res.status(500).json({ error: "Failed to generate CSV" });
  }
};

module.exports = { downloadPollCSV };
