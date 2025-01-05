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


  set pollId(String value) {
    _pollId = value;
  }
  set optionId(String value) {
    _optionId = value;
  }

  Future<bool> getHasVoted() async {
    if (_pollId == null || _optionId == null) {
      throw Exception("Poll ID and Option ID must be set before checking vote status.");
    }
    try {
      _hasVoted = await _voteService.hasUserVoted(_pollId!, _optionId!);
      notifyListeners();
      return _hasVoted;
    } catch (e) {
      print("Error checking vote status: $e");
      return false; // Default to false in case of error
    }
  }
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
      // Indicates success
    } catch (e) {
      print("Error adding vote in provider: $e");
// Indicates failure (e.g., if an error occurs)
    }
  }

  // Asynchronous check for voting status
  Future<void> _triggerCheckVotedStatus() async {

    if (_pollId != null && _optionId != null) {
      try {

        _hasVoted = await _voteService.hasUserVoted(_pollId!, _optionId!);

        print(_hasVoted);
        notifyListeners();
      } catch (e) {
        print("Error checking voted status in provider: $e");
      }
    }
  }
}
