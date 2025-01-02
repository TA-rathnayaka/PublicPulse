import 'package:client/services/analytics_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/services/auth_service.dart';

class VoteService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final AnalyticsService _analyticsService = AnalyticsService();
  // Create a new vote
  Future<void> addVote(String pollId, String optionId) async {
    try {
      final userId = await AuthService().getCurrentUserUid();  // Await the user ID

      // Check if the user has already voted for this poll
      final existingVote = await _firestore
          .collection('analytics_events')
          .where('pollId', isEqualTo: pollId)
          .where('userId', isEqualTo: userId)
          .get();

      if (existingVote.docs.isNotEmpty) {
        print('User has already voted for this poll.');
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
      
      _analyticsService.logCustomEvent("voteButton", {"pollId":pollId,"userId":userId});

      print("Vote created successfully!");
    } catch (e) {
      print("Error creating vote: $e");
    }
  }

  Future<bool> checkVotedStatus(String pollId) async {
    try {
      final userId = await AuthService().getCurrentUserUid();

      // Query the 'votes' collection to check if the user has voted for the specific poll and option
      final querySnapshot = await _firestore
          .collection('analytics_events')
          .where('userId', isEqualTo: userId)
          .where('pollId', isEqualTo: pollId)
          .get();

      // If the query returns any documents, the user has already voted for this option
      return querySnapshot.docs.isNotEmpty;
    } catch (e) {
      print("Error checking voted status: $e");
      return false;   //
    }
  }
}