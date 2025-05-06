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
const downloadPolicyCSV = async (req, res) => {
  try {
    const { policyId } = req.params;

    // Fetch policy
    const policyDoc = await firestore.collection("policies").doc(policyId).get();
    if (!policyDoc.exists) return res.status(404).json({ error: "Policy not found" });

    const policyData = policyDoc.data();
    const policyTitle = policyData.title || policyData.name || "Untitled Policy";

    // Fetch comments for this policy (based on group_id)
    const commentsSnapshot = await firestore
      .collection("comments")
      .where("group_id", "==", policyId)
      .get();

    if (commentsSnapshot.empty) {
      return res.status(404).json({ error: "No comments found for this policy" });
    }

    const comments = commentsSnapshot.docs.map((doc) => doc.data());

    // Define base CSV fields
    let allFields = new Set(["Policy Title", "Comment Text", "Display Name", "User ID", "Created At"]);

    // Add any extra dynamic fields in comments (e.g., instituteId)
    comments.forEach((comment) => {
      Object.keys(comment).forEach((key) => {
        if (!["text", "display_name", "user_id", "createdAt", "group_id"].includes(key)) {
          allFields.add(key);
        }
      });
    });

    const csvFields = Array.from(allFields);

    // Prepare CSV rows
    const csvData = comments.map((comment) => {
      const row = {
        "Policy Title": policyTitle,
        "Comment Text": comment.text || "",
        "Display Name": comment.display_name || "",
        "User ID": comment.user_id || "",
        "Created At": comment.createdAt
          ? new Date(comment.createdAt.toDate()).toLocaleString("en-US", { timeZone: "Asia/Colombo" })
          : "N/A",
      };

      csvFields.forEach((field) => {
        if (!(field in row) && comment[field]) {
          row[field] = comment[field];
        }
      });

      return row;
    });

    // Convert to CSV
    const csvParser = new Parser({ fields: csvFields });
    const csv = csvParser.parse(csvData);

    // File path
    const filePath = path.join(__dirname, `${policyId}_comments.csv`);
    fs.writeFileSync(filePath, csv);

    // Send and clean
    res.download(filePath, `${policyId}_comments.csv`, () => {
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error("Error generating policy CSV:", error);
    res.status(500).json({ error: "Failed to generate policy CSV" });
  }
};

module.exports = { downloadPollCSV, downloadPolicyCSV };
