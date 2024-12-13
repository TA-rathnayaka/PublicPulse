import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/models/poll.dart';

class PollService {
  final FirebaseFirestore _fireStore = FirebaseFirestore.instance;

  // Create a new poll
  Future<void> createPoll(Poll poll) async {
    try {
      await _fireStore.collection('polls').add({
        'title': poll.title,
        'description': poll.description,
        'imageUrl': poll.imageUrl,
        'options': poll.options.map((option) {
          final String key = option.keys.first;
          return {'option': key, 'count': option[key]};
        }).toList(),
        'createDate': poll.createDate,
        'duration': poll.duration.inDays,
      });
    } catch (e) {
      print("Error creating poll: $e");
    }
  }

  // Read: Get a list of polls (already implemented)
  Future<List<Poll>> getPolls() async {
    try {
      QuerySnapshot snapshot = await _fireStore.collection('polls').get();
      List<Poll> polls = snapshot.docs.map((doc) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>;

        // Extract options in the correct format
        List<Map<String, int>> options = (data['options'] as List<dynamic>).map((optionData) {
          final Map<String, dynamic> optionMap = optionData as Map<String, dynamic>;
          return {optionMap['option'] as String: optionMap['count'] as int};
        }).toList();

        // Handle null createDate
        Timestamp? createDateTimestamp = data['createDate'] as Timestamp?;
        DateTime createDate = createDateTimestamp?.toDate() ?? DateTime.now();

        return Poll(
          title: data['title'],
          description: data['description'],
          imageUrl: data['imageUrl'],
          options: options,
          createDate: createDate,
          duration: Duration(days: data['duration'] ?? 0),
        );
      }).toList();
      return polls;
    } catch (e) {
      print("Error fetching polls: $e");
      return [];
    }
  }

  // Update an existing poll by ID
  Future<void> updatePoll(String pollId, Poll updatedPoll) async {
    try {
      await _fireStore.collection('polls').doc(pollId).update({
        'title': updatedPoll.title,
        'description': updatedPoll.description,
        'imageUrl': updatedPoll.imageUrl,
        'options': updatedPoll.options.map((option) {
          final String key = option.keys.first;
          return {'option': key, 'count': option[key]};
        }).toList(),
        'createDate': updatedPoll.createDate,
        'duration': updatedPoll.duration.inDays,
      });
    } catch (e) {
      print("Error updating poll: $e");
    }
  }

  // Delete a poll by ID
  Future<void> deletePoll(String pollId) async {
    try {
      await _fireStore.collection('polls').doc(pollId).delete();
    } catch (e) {
      print("Error deleting poll: $e");
    }
  }
}