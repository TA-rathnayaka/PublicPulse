import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class UserService {
  final FirebaseFirestore _fireStore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Store basic user profile in Firebase Auth and additional details in Firestore
  Future<void> storeUserDetails(String firstName, String lastName, String email) async {
    try {
      // Get current user UID
      User? user = _auth.currentUser;
      if (user == null) {
        throw Exception("User is not authenticated.");
      }

      String uid = user.uid;

      // Update Firebase Auth profile
      await user.updateDisplayName('$firstName $lastName');
      await user.updatePhotoURL('https://example.com/photo.jpg'); // If you have a photo URL

      // Store additional details in Firestore
      await _fireStore.collection('users').doc(uid).set({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'createdAt': Timestamp.now(),
      });

      print("User details stored successfully in both Auth and Firestore.");
    } catch (e) {
      print("Error storing user details: $e");
    }
  }

  // Fetch user details from both Firebase Auth and Firestore
  Future<Map<String, dynamic>?> getUserDetails() async {
    try {
      // Get the current authenticated user from Firebase Auth
      User? user = _auth.currentUser;
      if (user == null) {
        throw Exception("User is not authenticated.");
      }

      // Fetch user details from Firestore
      DocumentSnapshot doc = await _fireStore.collection('users').doc(user.uid).get();

      // Check if the user exists in Firestore
      if (doc.exists && doc.data() != null) {
        Map<String, dynamic> firestoreData = doc.data() as Map<String, dynamic>;

        // Add Firebase Auth data to Firestore data
        firestoreData['uid'] = user.uid;
        firestoreData['displayName'] = user.displayName ?? "No display name";
        firestoreData['photoURL'] = user.photoURL ?? "No photo";

        return firestoreData;
      } else {
        print("User document not found in Firestore.");
        return null;
      }
    } catch (e) {
      print("Error fetching user details: $e");
      return null;
    }
  }

  // Update user details in both Firebase Auth and Firestore
  Future<void> updateUserDetails(
      String firstName, String lastName, String email) async {
    try {
      // Get the current authenticated user from Firebase Auth
      User? user = _auth.currentUser;
      if (user == null) {
        throw Exception("User is not authenticated.");
      }

      String uid = user.uid;

      // Update Firebase Auth profile (e.g., display name)
      await user.updateDisplayName('$firstName $lastName');
      await user.updatePhotoURL('https://example.com/photo.jpg'); // If you have a new photo URL

      // Update Firestore with the new user details
      await _fireStore.collection('users').doc(uid).update({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'updatedAt': Timestamp.now(), // Add the update timestamp
      });

      print("User details updated successfully in both Auth and Firestore.");
    } catch (e) {
      print("Error updating user details: $e");
      throw Exception("Failed to update user details.");
    }
  }

  // Get the current authenticated user from FirebaseAuth
  User? getCurrentUser() {
    return _auth.currentUser;
  }
}