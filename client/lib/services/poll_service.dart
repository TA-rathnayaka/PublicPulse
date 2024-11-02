import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/models/poll.dart';

class PollService {
  final FirebaseFirestore _fireStore = FirebaseFirestore.instance;

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
          duration: Duration(days: data['duration']),
        );
      }).toList();
      return polls;
    } catch (e) {
      print("Error fetching polls: $e");
      return [];
    }
  }
}
