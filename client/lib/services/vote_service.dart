import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/services/auth_service.dart';

class VoteService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // Private method to get the user ID and check if the user has already voted
  Future<bool> _hasUserVoted(String pollId, String optionId) async {
    try {
      final userId = await AuthService().getCurrentUserUid();

      final querySnapshot = await _firestore
          .collection('votes')
          .where('pollId', isEqualTo: pollId)
          .where('userId', isEqualTo: userId)
          .where('optionId', isEqualTo: optionId)
          .get();

      return querySnapshot.docs.isNotEmpty;
    } catch (e) {
      print("Error checking vote status: $e");
      return false;
    }
  }

  // Create a new vote
  Future<void> addVote(String pollId, String optionId) async {
    try {
      // Check if the user has already voted for this poll and option
      final hasVoted = await _hasUserVoted(pollId, optionId);

      if (hasVoted) {
        throw Exception('User has already voted for this poll.');
      }

      final voteRef = _firestore.collection('votes').doc();

      await voteRef.set({
        'pollId': pollId,
        'userId': await AuthService().getCurrentUserUid(),
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

  // Check if the user has already voted for a specific option
  Future<bool> checkVotedStatus(String optionId) async {
    try {
      final userId = await AuthService().getCurrentUserUid();
      return await _hasUserVoted('', optionId);
    } catch (e) {
      print("Error checking voted status: $e");
      return false;
    }
  }
}
