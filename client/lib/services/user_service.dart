import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class UserService {
  final FirebaseFirestore _fireStore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<void> storeUserDetails(
      {String? displayName,
      String? photoUrl,
      Map<String, dynamic>? customData}) async {
    try {
      // Ensure the user is authenticated
      User? user = _auth.currentUser;
      if (user == null) {
        throw Exception("User is not authenticated.");
      }

      String uid = user.uid;

      if (displayName != null) {
        await user.updateDisplayName(displayName);
      }

      if (photoUrl != null) {
        await user.updatePhotoURL(photoUrl);
      }

      if (customData != null) {
        customData.removeWhere((key, value) => value == null);

        await _fireStore
            .collection('users')
            .doc(uid)
            .set(customData, SetOptions(merge: true));
      }
      print("User details stored successfully in Firebase Auth and Firestore.");
    } catch (e) {
      print("Error storing user details: $e");
      rethrow; // Optionally rethrow to propagate the error
    }
  }

  Future<Map<String, dynamic>?> getUserDetails() async {
    try {
      User? user = _auth.currentUser;
      if (user == null) {
        throw Exception("User is not authenticated.");
      }

      DocumentSnapshot doc =
          await _fireStore.collection('users').doc(user.uid).get();

      Map<String, dynamic> firestoreData = {
        'uid': user.uid,
        'displayName': user.displayName ?? "No display name",
        'photoURL': user.photoURL ?? "No photo",
      };

      if (doc.exists && doc.data() != null) {
        Map<String, dynamic> docData = doc.data() as Map<String, dynamic>;
        firestoreData.addAll(docData);
      } else {
        print("User document not found in Firestore.");
      }

      return firestoreData;
    } catch (e) {
      print("Error fetching user details: $e");
      return null;
    }
  }

  Future<void> updateUserDetails(String? displayName, String? photoUrl,
      Map<String, dynamic>? userDetails) async {
    try {
      // Get the current authenticated user from Firebase Auth
      User? user = _auth.currentUser;
      if (user == null) {
        throw Exception("User is not authenticated.");
      }

      String uid = user.uid;

      if (displayName != null) {
        await user.updateDisplayName(displayName);
      }

      if (photoUrl != null) {
        await user.updatePhotoURL(photoUrl);
      }


      // Update Firestore with the new user details
      if (userDetails != null) {
        await _fireStore.collection('users').doc(uid).update(userDetails);
      }
      print("User details updated successfully in both Auth and Firestore.");
    } catch (e) {
      print("Error updating user details: $e");
      throw Exception("Failed to update user details.");
    }
  }

  User? getCurrentUser() {
    return _auth.currentUser;
  }
}
