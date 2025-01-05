import 'package:client/services/analytics_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/services/auth_service.dart';

class VoteService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final AnalyticsService _analyticsService = AnalyticsService();
  // Private method to get the user ID and check if the user has already voted
  Future<bool> _hasUserVoted(String pollId, String optionId) async {
    try {
      final userId = await AuthService().getCurrentUserUid();

      final querySnapshot = await _firestore
          .collection('analytics_events')
          .where('eventName', isEqualTo: "voteButton")
          .where('eventData.userId', isEqualTo: userId)
          .where('eventData.pollId', isEqualTo: pollId)
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
        'optionId': optionId,
      });

      await _firestore.collection('options').doc(optionId).update({
        'voteCount': FieldValue.increment(1),
      });
      _analyticsService.logCustomEvent("voteButton",{
        'userId': await AuthService().getCurrentUserUid(),
        'pollId':pollId,
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
