import 'package:cloud_firestore/cloud_firestore.dart';

class StorageService {
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
}
