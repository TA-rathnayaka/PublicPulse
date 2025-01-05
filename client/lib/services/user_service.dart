import 'package:cloud_firestore/cloud_firestore.dart';

class UserService {

  final FirebaseFirestore _fireStore = FirebaseFirestore.instance;

  Future<void> storeUserDetails(
      String? uid, String firstName, String lastName, String email) async {
    try {
      if (uid == null) {
        throw Exception("User ID (uid) cannot be null.");
      }

      await _fireStore.collection('users').doc(uid).set({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'createdAt': Timestamp.now(),
      });

      print("User details stored successfully.");
    } catch (e) {
      print("Error storing user details: $e");
    }
  }

  // Fetch user details
  Future<Map<String, dynamic>?> getUserDetails(String uid) async {
    try {
      DocumentSnapshot doc = await _fireStore.collection('users').doc(uid).get();
      if (doc.exists && doc.data() != null) {
        return doc.data() as Map<String, dynamic>;
      } else {
        print("User document is empty or not found.");
        return null;
      }
    } catch (e) {
      print("Error fetching user details for UID $uid: $e");
      return null;
    }
  }

  // Update user details
  Future<void> updateUserDetails(String uid, Map<String, dynamic> updatedData) async {
    try {
      await _fireStore.collection('users').doc(uid).update(updatedData);
      print("User details updated successfully.");
    } catch (e) {
      print("Error updating user details for UID $uid: $e");
      throw Exception("Failed to update user details.");
    }
  }
}
