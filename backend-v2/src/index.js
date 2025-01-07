const express = require('express');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require("../policymaker-ee7e9-firebase-adminsdk-mhbqj-ffd5979fcb.json"); // Replace with the correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
// Middleware
app.use(express.json());
const adminDb = admin.firestore();

app.use(
  cors({
    origin: "http://localhost:3001", // React frontend URL
  })
);
// Fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const auth = admin.auth();
    const listUsersResult = await auth.listUsers(); // List all users (default max is 1000 users)

    // Transform users into a readable format
    const users = listUsersResult.users.map((user) => ({
      id: user.uid,
      username: user.displayName || '',
      email: user.email || '',
      status: user.disabled ? 'inactive' : 'active',
      birthdate: user.customClaims?.birthdate || '',
      district: user.customClaims?.district || '',
      photoUrl: user.photoURL,
    }));

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

app.delete('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;  // Correctly extract userId from the route parameters
  
  try {
    // Assuming admin.auth() is initialized
    await admin.auth().deleteUser(userId);
    console.log(`Successfully deleted user with UID: ${userId}`);
    res.status(200).send({ message: `User with UID ${userId} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Failed to delete user" });
  }
});


app.post('/api/users/:userId/make-admin', async (req, res) => {
  const { userId } = req.params; // Get the userId from the route parameters

  try {
    // Add a document with the userId as the document ID and role as "admin"
    await adminDb.collection('admins').doc(userId).set({
      role: 'admin'
    });

    console.log(`Successfully made user with UID: ${userId} an admin`);

    res.status(200).send({ message: `User with UID ${userId} is now an admin` });
  } catch (error) {
    console.error("Error making user admin:", error);
    res.status(500).send({ message: "Failed to make user an admin" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
