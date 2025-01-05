import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/services/auth_service.dart';

class VoteService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // Create a new vote
  Future<void> addVote(String pollId, String optionId) async {
    try {
      final userId = await AuthService().getCurrentUserUid();  // Await the user ID

      // Check if the user has already voted for this poll
      final existingVote = await _firestore
          .collection('votes')
          .where('pollId', isEqualTo: pollId)
          .where('userId', isEqualTo: userId)
          .get();

      if (existingVote.docs.isNotEmpty) {
        throw Exception('User has already voted for this poll.');
      }

      final voteRef = _firestore.collection('votes').doc();

      await voteRef.set({
        'pollId': pollId,
        'userId': userId,
        'optionId': optionId,
      });

      await _firestore.collection('options').doc(optionId).update({
        'voteCount': FieldValue.increment(1),
      });

      print("Vote created successfully!");
    } catch (e) {
      print("Error creating vote: $e");

    }
  }

  Future<bool> checkVotedStatus(String optionId) async {
    try {
      final userId = await AuthService().getCurrentUserUid();

      // Query the 'votes' collection to check if the user has voted for the specific poll and option
      final querySnapshot = await _firestore
          .collection('votes')
          .where('userId', isEqualTo: userId)
          .where('optionId', isEqualTo: optionId)
          .get();

      // If the query returns any documents, the user has already voted for this option
      return querySnapshot.docs.isNotEmpty;
    } catch (e) {
      print("Error checking voted status: $e");
      return false;
    }
  }
}