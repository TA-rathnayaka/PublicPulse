import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:client/models/comment.dart';
import 'package:client/services/auth_service.dart';


class CommentService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final String collectionName = 'comments'; // Firestore collection name



  // Get all comments as a stream for real-time updates
  Stream<List<Comment>> getComments({required String groupId}) {
    return _firestore
        .collection(collectionName)
        .where('group_id', isEqualTo: groupId) // Filter by groupId
        .snapshots()
        .map((snapshot) {
      return snapshot.docs.map((doc) => Comment.fromDocument(doc)).toList();
    });
  }
  // Add a new comment to Firestore
  Future<void> addComment(String group, String text, BuildContext context, ThemeData theme) async {
    if (text.trim().isEmpty) return;

    try {
      final authService = AuthService();
      final uid = await authService.getCurrentUserUid();
      if (uid == null) {
        throw Exception('User not authenticated');
      }
      final displayName = authService.getCurrentUserDisplayName() ?? 'Anonymous';

      final newComment = Comment(
        commentId: '',
        groupId: group,
        text: text.trim(),
        userId: uid,
        createdAt: Timestamp.now(),
        displayName: displayName,
      );

      final docRef = await _firestore.collection(collectionName).add(newComment.toMap());

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Comment submitted: $text',
            style: TextStyle(color: theme.colorScheme.onSurface),
          ),
          backgroundColor: theme.colorScheme.surface,
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error adding comment: $e')),
      );
      rethrow;
    }
  }


  // Remove a comment from Firestore by ID
  Future<void> removeComment(String id, BuildContext context) async {
    try {
      await _firestore.collection(collectionName).doc(id).delete();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Comment deleted')),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error deleting comment: $e')),
      );
    }
  }

  // Fetch initial comments (optional, if you need a one-time fetch instead of stream)
  Future<List<Comment>> fetchComments() async {
    try {
      final snapshot = await _firestore.collection(collectionName).get();
      return snapshot.docs.map((doc) => Comment.fromDocument(doc)).toList();
    } catch (e) {
      print('Error fetching comments: $e');
      return [];
    }
  }
}