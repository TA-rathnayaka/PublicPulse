import 'package:flutter/material.dart';
import 'package:client/services/vote_service.dart';

class VotesProvider with ChangeNotifier {
  final VoteService _voteService = VoteService();

  bool _hasVoted = false;

  bool get hasVoted {
    return _hasVoted;
  }

  String? _pollId;
  String? _optionId;

  void setVoteContext(String pollId, String optionId) {
    _pollId = pollId;
    _optionId = optionId;
  }

  // Add a vote
  Future<void> addVote(String pollId, String optionId) async {
    try {
      await _voteService.addVote(pollId, optionId);
      _hasVoted = true; // assuming this is to mark that the user has voted
      notifyListeners();
      // Indicates success
    } catch (e) {
      print("Error adding vote in provider: $e");
// Indicates failure (e.g., if an error occurs)
    }
  }
}
