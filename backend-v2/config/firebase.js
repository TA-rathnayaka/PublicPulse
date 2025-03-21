const admin = require('firebase-admin');
const path = require('path');

// Load Firebase Admin SDK credentials
const serviceAccountPath = path.resolve(__dirname, '../policymaker-ee7e9-firebase-adminsdk-mhbqj-3fb1249b9a.json');

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
  
});

// Initialize Firestore and Storage
const firestore = admin.firestore();

module.exports = { firestore, admin };
