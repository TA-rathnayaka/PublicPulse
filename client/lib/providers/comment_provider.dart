import 'package:flutter/material.dart';
import 'package:client/services/comment_service.dart';
import 'package:client/models/comment.dart';

class CommentProvider with ChangeNotifier {
  final CommentService _commentService = CommentService();

  // Expose the comments stream
  Stream<List<Comment>> getComments(String groupId) {
    return _commentService.getComments(groupId: groupId);
  }
  // Expose comments list (optional, for one-time fetch)
  List<Comment> _comments = [];
  List<Comment> get comments => _comments;

  // Add a comment
  Future<void> addComment(String group, String text, BuildContext context, ThemeData theme) async {
    await _commentService.addComment(group, text, context, theme);
    notifyListeners(); // Notify listeners after adding
  }

  // Remove a comment
  Future<void> removeComment(String commentId, BuildContext context) async {
    await _commentService.removeComment(commentId, context);
    notifyListeners(); // Notify listeners after removing
  }

  // Fetch initial comments (optional)
  Future<void> fetchComments() async {
    _comments = await _commentService.fetchComments();
    notifyListeners(); // Notify listeners after fetching
  }
}