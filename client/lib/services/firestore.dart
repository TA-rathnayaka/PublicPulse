import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/models/poll.dart';

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

  Future<List<Poll>> getPolls() async {
    try {
      QuerySnapshot snapshot = await _fireStore.collection('polls').get();
      List<Poll> polls = snapshot.docs.map((doc) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>;
        return Poll(
          title: data['title'],
          description: data['description'],
          options: List<Map<String, int>>.from(data['options']),
          createDate: (data['createDate'] as Timestamp).toDate(),
          duration: Duration(days: data['duration']), // Adjust if needed
        );
      }).toList();
      return polls;
    } catch (e) {
      print("Error fetching polls: $e");
      return [];
    }
  }
}
