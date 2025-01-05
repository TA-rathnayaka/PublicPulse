import 'package:cloud_firestore/cloud_firestore.dart';

class AnalyticsService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<void> logCustomEvent(String eventName, Map<String, dynamic> eventData) async {

    // Save to Firestore for later display
    await _firestore.collection('analytics_events').add({
      'eventName': eventName,
      'eventData': eventData,
      'timestamp': FieldValue.serverTimestamp(),
    });
  }
}
