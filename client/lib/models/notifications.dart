class Notification {
  bool isRead;
  String message;
  DateTime timestamp;
  String userId;

  Notification({
    required this.isRead,
    required this.message,
    required this.timestamp,
    required this.userId,
  });

  Map<String, dynamic> toMap() {
    return {
      'isRead': isRead,
      'message': message,
      'timestamp': timestamp.toIso8601String(),
      'userId': userId,
    };
  }

  factory Notification.fromMap(Map<String, dynamic> map) {
    return Notification(
      isRead: map['isRead'] as bool,
      message: map['message'] as String,
      timestamp: DateTime.parse(map['timestamp']),
      userId: map['userId'] as String,
    );
  }
}
