import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class VoteService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Function to save the user's vote (UID and poll ID)
  Future<void> saveVote(String pollId) async {
    try {
      String uid = _auth.currentUser?.uid ?? '';
      if (uid.isEmpty) {
        throw Exception('User not logged in');
      }

      // Create the document ID as the user's UID and save the poll ID as the value
      await _firestore.collection('votes').doc(uid).set({
        'pollId': pollId,
        'timestamp': FieldValue.serverTimestamp(),
      });

      print("Vote saved successfully.");
    } catch (e) {
      print("Error saving vote: $e");
    }
  }

  // Function to check if the user has already voted for a poll
  Future<bool> hasVoted(String pollId) async {
    try {
      // Get the current user's UID
      String uid = _auth.currentUser?.uid ?? '';
      if (uid.isEmpty) {
        throw Exception('User not logged in');
      }

      // Check if the user has voted for the given poll ID
      DocumentSnapshot snapshot = await _firestore.collection('votes').doc(uid).get();

      if (snapshot.exists) {
        String? userPollId = snapshot.get('pollId');
        return userPollId == pollId;
      }

      return false;
    } catch (e) {
      print("Error checking vote status: $e");
      return false;
    }
  }
}