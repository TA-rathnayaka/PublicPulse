import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/models/poll.dart';

class PollService {
  final FirebaseFirestore _fireStore = FirebaseFirestore.instance;

  Future<List<Poll>> getPolls() async {
    try {
      QuerySnapshot snapshot = await _fireStore.collection('polls').get();
      List<Poll> polls = snapshot.docs.map((doc) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>;




        // Extract options in the correct format
        List<Map<String, int>> options = (data['options'] as List<dynamic>).map((optionData) {
          final Map<String, dynamic> optionMap = optionData as Map<String, dynamic>;
          // Create a map with option as key and count as value
          return {optionMap['option'] as String: optionMap['count'] as int}; // Explicitly cast the types
        }).toList();

        // Handle null createDate
        Timestamp? createDateTimestamp = data['createDate'] as Timestamp?;
        DateTime createDate = createDateTimestamp?.toDate() ?? DateTime.now(); // Use DateTime.now() if null

        return Poll(
          title: data['title'],
          description: data['description'],
          imageUrl: data['imageUrl'],
          options: options,
          createDate: createDate,
          duration: Duration(days: data['duration'] ?? 0), // Handle null duration if necessary
        );
      }).toList();
      return polls;
    } catch (e) {
      print("Error fetching polls: $e");
      return [];
    }
  }
}
