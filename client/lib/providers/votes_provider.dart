import 'package:flutter/material.dart';
import 'package:client/services/vote_service.dart';


class VotesProvider with ChangeNotifier {
  final VoteService _voteService = VoteService();

  bool _hasVoted = false;
  bool get hasVoted {
    // Trigger a background check when the getter is accessed
    _triggerCheckVotedStatus();
    return _hasVoted;
  }

  String? _pollId;
  String? _optionId;

  // Method to set the pollId and optionId before accessing hasVoted
  void setVoteContext(String pollId, String optionId) {
    _pollId = pollId;
    _optionId = optionId;
  }

  // Add a vote
  Future<void> addVote(String pollId, String optionId) async {
    try {
      await _voteService.addVote(pollId, optionId);
      _hasVoted = true;
      notifyListeners();
    } catch (e) {
      print("Error adding vote in provider: $e");
    }
  }

  // Asynchronous check for voting status
  Future<void> _triggerCheckVotedStatus() async {
    if (_pollId != null && _optionId != null) {
      try {
        _hasVoted = await _voteService.checkVotedStatus(_optionId!);
        notifyListeners();
      } catch (e) {
        print("Error checking voted status in provider: $e");
      }
    }
  }
}