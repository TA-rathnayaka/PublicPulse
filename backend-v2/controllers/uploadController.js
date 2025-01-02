const { storage } = require('../config/firebase');
const pool = require('../db'); // Your database connection
const multer = require('multer'); // For handling file uploads
const { v4: uuidv4 } = require('uuid'); // For generating unique filenames

// Initialize multer for file handling
const upload = multer({ storage: multer.memoryStorage() }).single('image'); // Single image file

// Function to upload user image
const uploadUserImage = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading file', error: err });
      }

      const userId = req.body.userId;
      const file = req.file;
      const uniqueFilename = uuidv4() + '-' + file.originalname;

      // Upload image to Firebase Storage
      const storageRef = storage.ref(`user-images/${uniqueFilename}`);
      const snapshot = await storageRef.put(file.buffer);
      const imageUrl = await snapshot.ref.getDownloadURL();

      // Save the image URL to SQL database
      const updateUserQuery = `UPDATE Users SET ImgURL = $1 WHERE UserId = $2`;
      await pool.query(updateUserQuery, [imageUrl, userId]);

      res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
};

// Function to upload poll image
const uploadPollImage = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading file', error: err });
      }

      const pollId = req.body.pollId;
      const file = req.file;
      const uniqueFilename = uuidv4() + '-' + file.originalname;

      // Upload image to Firebase Storage
      const storageRef = storage.ref(`poll-images/${uniqueFilename}`);
      const snapshot = await storageRef.put(file.buffer);
      const imageUrl = await snapshot.ref.getDownloadURL();

      // Save the image URL to SQL database
      const updatePollQuery = `UPDATE Polls SET ImgURL = $1 WHERE PollId = $2`;
      await pool.query(updatePollQuery, [imageUrl, pollId]);

      res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
};

module.exports = { uploadUserImage, uploadPollImage };
