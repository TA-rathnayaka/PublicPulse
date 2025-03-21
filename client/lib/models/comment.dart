import 'package:cloud_firestore/cloud_firestore.dart';

class Comment {
  final String commentId;  // This will be the document ID
  final String userId;
  final String groupId;
  final String text;
  final Timestamp createdAt;
  final String displayName;  // Added displayName field

  Comment({
    required this.commentId,  // Still required, but will be set from document ID
    required this.userId,
    required this.groupId,
    required this.text,
    required this.createdAt,
    required this.displayName,  // Added to constructor
  });

  // When creating a new comment to send to Firestore, we don't include commentId
  // because Firestore will generate it, but we do include displayName
  Map<String, dynamic> toMap() {
    return {
      'user_id': userId,
      'group_id': groupId,
      'text': text,
      'createdAt': createdAt,
      'display_name': displayName,
    };
  }

  // Factory method to create Comment from a Firestore document
  factory Comment.fromDocument(DocumentSnapshot doc) {
    final Map<String, dynamic> data = doc.data() as Map<String, dynamic>;
    return Comment(
      commentId: doc.id,  // Use the document ID
      userId: data['user_id'] as String,
      groupId: data['group_id'] as String,
      text: data['text'] as String,
      createdAt: data['createdAt'] as Timestamp,
      displayName: data['display_name'] as String? ?? 'Unknown',  // Added with fallback
    );
  }
}