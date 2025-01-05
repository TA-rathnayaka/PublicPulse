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
        'createdAt': poll.createDate,
        'relatedPolicy': 'multiple-choice',
        // Assuming this is a constant for now
        'duration': poll.duration.inDays,
        // Duration as a number of days
      });

      // Add options to the 'options' collection with reference to pollId
      for (var option in poll.options) {
        await _fireStore.collection('options').add({
          'pollId': pollRef.id,
          'text': option.text,
          'voteCount': option.voteCount,
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
      QuerySnapshot optionSnapshot =
          await _fireStore.collection('options').get();

      // Create a map of pollId to a list of options
      Map<String, List<Option>> optionsMap = {};

      for (var optionDoc in optionSnapshot.docs) {
        Map<String, dynamic> optionData =
            optionDoc.data() as Map<String, dynamic>;

        String pollId = optionData['pollId'] as String;
        String optionText = optionData['text'] as String;
        int voteCount = optionData['voteCount'] ?? 0;

        optionsMap.putIfAbsent(pollId, () => []);
        optionsMap[pollId]!.add(Option(
          optionId: optionDoc.id, // Assign optionDoc.id as optionId
          text: optionText,
          voteCount: voteCount,
        ));
      }

      // Combine polls with their corresponding options
      List<Poll> polls = pollSnapshot.docs.map((doc) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>;

        // Handle null createDate safely
        Timestamp? createDateTimestamp = data['createdAt'] as Timestamp?;
        DateTime createDate = createDateTimestamp?.toDate() ?? DateTime.now();

        String pollId = doc.id;
        List<Option> pollOptions = optionsMap[pollId] ?? [];

        return Poll(
          id: pollId,
          title: data['title'] as String,
          description: data['description'] as String,
          imageUrl: data['imageUrl'] as String?,
          options: pollOptions,
          createDate: createDate,
          duration: Duration(days: (data['duration'] as int?) ?? 0),
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
        'createdAt': updatedPoll.createDate,
        'duration': updatedPoll.duration.inDays,
      });

      // Fetch and delete old options related to this poll
      QuerySnapshot optionsSnapshot = await _fireStore
          .collection('options')
          .where('pollId', isEqualTo: pollId)
          .get();

      // Delete all old options concurrently
      await Future.wait(
          optionsSnapshot.docs.map((doc) => doc.reference.delete()));

      // Add the updated options to the 'options' collection
      for (var option in updatedPoll.options) {
        await _fireStore.collection('options').add({
          'pollId': pollId,
          'optionId': option.optionId,
          'text': option.text,
          'voteCount': option.voteCount,
        });
      }

      print("Poll updated successfully: $pollId");
    } catch (e) {
      print("Error updating poll: $e");
    }
  }

// Delete a poll by ID
  Future<void> deletePoll(String pollId) async {
    try {
      // Delete the poll document in the 'polls' collection
      await _fireStore.collection('polls').doc(pollId).delete();

      // Fetch and delete all options associated with this poll concurrently
      QuerySnapshot optionsSnapshot = await _fireStore
          .collection('options')
          .where('pollId', isEqualTo: pollId)
          .get();

      await Future.wait(
          optionsSnapshot.docs.map((doc) => doc.reference.delete()));

      print("Poll deleted successfully: $pollId");
    } catch (e) {
      print("Error deleting poll: $e");
    }
  }
}
