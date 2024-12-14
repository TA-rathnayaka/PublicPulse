import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/models/poll.dart';

class PollService {
  final FirebaseFirestore _fireStore = FirebaseFirestore.instance;

  // Create a new poll
  Future<void> createPoll(Poll poll) async {
    try {
      // Add poll to the 'polls' collection
      DocumentReference pollRef = await _fireStore.collection('polls').add({
        'title': poll.title,
        'description': poll.description,
        'imageUrl': poll.imageUrl,
        'createdAt': poll.createDate, // Updated field name
        'relatedPolicy': 'multiple-choice', // Assuming this is a constant for now
      });

      // Add options to the 'options' collection with reference to pollId
      for (var option in poll.options) {
        final String key = option.keys.first;
        await _fireStore.collection('options').add({
          'pollId': pollRef.id,
          'text': key,
          'voteCount': option[key],
        });
      }
    } catch (e) {
      print("Error creating poll: $e");
    }
  }

  // Read: Get a list of polls with their options
  Future<List<Poll>> getPolls() async {
    try {
      // Fetch all polls
      QuerySnapshot pollSnapshot = await _fireStore.collection('polls').get();

      // Fetch all options
      QuerySnapshot optionSnapshot = await _fireStore.collection('options').get();

      // Create a map of pollId to options
      Map<String, List<Map<String, int>>> optionsMap = {};

      for (var optionDoc in optionSnapshot.docs) {
        Map<String, dynamic> optionData = optionDoc.data() as Map<String, dynamic>;
        String pollId = optionData['pollId'];
        String optionText = optionData['text'];
        int voteCount = optionData['voteCount'];

        optionsMap.putIfAbsent(pollId, () => []);
        optionsMap[pollId]!.add({optionText: voteCount});
      }

      // Combine polls with their corresponding options
      List<Poll> polls = pollSnapshot.docs.map((doc) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>;

        // Handle null createDate
        Timestamp? createDateTimestamp = data['createDate'] as Timestamp?;
        DateTime createDate = createDateTimestamp?.toDate() ?? DateTime.now();

        String pollId = doc.id;
        List<Map<String, int>> options = optionsMap[pollId] ?? [];

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
      // Update the poll document in the 'polls' collection
      await _fireStore.collection('polls').doc(pollId).update({
        'title': updatedPoll.title,
        'description': updatedPoll.description,
        'imageUrl': updatedPoll.imageUrl,
        'createDate': updatedPoll.createDate,
        'duration': updatedPoll.duration.inDays,
      });

      // Delete old options related to this poll
      QuerySnapshot optionsSnapshot = await _fireStore.collection('options')
          .where('pollId', isEqualTo: pollId)
          .get();

      for (var doc in optionsSnapshot.docs) {
        await doc.reference.delete();
      }

      // Add the updated options to the 'options' collection
      for (var option in updatedPoll.options) {
        final String key = option.keys.first;
        await _fireStore.collection('options').add({
          'pollId': pollId,
          'text': key,
          'voteCount': option[key],
        });
      }
    } catch (e) {
      print("Error updating poll: $e");
    }
  }

  // Delete a poll by ID
  Future<void> deletePoll(String pollId) async {
    try {
      // Delete the poll document in the 'polls' collection
      await _fireStore.collection('polls').doc(pollId).delete();

      // Delete all options associated with this poll
      QuerySnapshot optionsSnapshot = await _fireStore.collection('options')
          .where('pollId', isEqualTo: pollId)
          .get();

      for (var doc in optionsSnapshot.docs) {
        await doc.reference.delete();
      }
    } catch (e) {
      print("Error deleting poll: $e");
    }
  }
}