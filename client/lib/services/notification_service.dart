import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/models/notifications.dart';

class NotificationService {
  final FirebaseFirestore _fireStore = FirebaseFirestore.instance;

  Future<List<Notification>> getNotifications() async {
    try {
      QuerySnapshot snapshot = await _fireStore.collection('notifications').get();
      List<Notification> notifications = snapshot.docs.map((doc) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>;

        bool isRead = data['isRead'] as bool? ?? false;
        String message = data['message'] as String? ?? '';
        Timestamp? timestamp = data['timestamp'] as Timestamp?;
        DateTime notificationTime = timestamp?.toDate() ?? DateTime.now();
        String userId = data['userId'] as String? ?? '';

        return Notification(
          isRead: isRead,
          message: message,
          timestamp: notificationTime,
          userId: userId,
        );
      }).toList();
      return notifications;
    } catch (e) {
      print("Error fetching notifications: $e");
      return [];
    }
  }
}
