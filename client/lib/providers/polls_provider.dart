import 'dart:collection';
import 'package:client/services/vote_service.dart';
import 'package:flutter/foundation.dart';
import 'package:client/models/poll.dart';
import 'package:client/services/poll_service.dart';

class PollsProvider extends ChangeNotifier {
  final PollService _storageService = PollService();
  final VoteService _voteService = VoteService();
  List<Poll> _polls = [];

  PollsProvider() {
    fetchPolls();
  }

  UnmodifiableListView<Poll> get polls => UnmodifiableListView(_polls);

  // Fetch all polls from Firestore
  Future<void> fetchPolls() async {
    _polls = await _storageService.getPolls();
    notifyListeners();
  }

  Poll? getPollByIndex(int index) {
    if (0 <= index && index < polls.length) {
      Poll selectedPoll = polls[index];
      // _voteService.checkVotedStatus(optionId);
      return selectedPoll;
    }
    return null;
  }



  Future<void> addPoll(Poll poll) async {
    try {
      await _storageService.createPoll(poll);
      _polls.add(poll);
      notifyListeners();
    } catch (e) {
      print("Error adding poll: $e");
    }
  }

  // Remove a poll by index and sync with Firestore
  Future<void> removePoll(String pollId, int index) async {
    try {
      await _storageService.deletePoll(pollId);
      if (index >= 0 && index < _polls.length) {
        _polls.removeAt(index);
        notifyListeners();
      }
    } catch (e) {
      print("Error deleting poll: $e");
    }
  }

  // Update a poll by index and sync with Firestore
  Future<void> updatePoll(String pollId, int index, Poll updatedPoll) async {
    try {
      await _storageService.updatePoll(pollId, updatedPoll);
      if (index >= 0 && index < _polls.length) {
        _polls[index] = updatedPoll;
        notifyListeners();
      }
    } catch (e) {
      print("Error updating poll: $e");
    }
  }


  Future<void> addVote(int index, String optionId) async {
    try {
      Poll? selected_poll = getPollByIndex(index);

      if (selected_poll != null) {
        await _voteService.addVote(selected_poll.id ?? "", optionId);
        selected_poll.hasVoted = true; // only access hasVoted if selected_poll is not null
        notifyListeners();
        // Indicates success
      } else {
        print("Poll not found.");
      }
    } catch (e) {
      print("Error adding vote in provider: $e");
      // Indicates failure (e.g., if an error occurs)
    }
  }
}
