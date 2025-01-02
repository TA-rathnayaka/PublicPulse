import 'dart:collection';
import 'package:flutter/foundation.dart';
import 'package:client/models/poll.dart';
import 'package:client/services/poll_service.dart';

class PollsProvider extends ChangeNotifier {
  final PollService storageService = PollService();
  List<Poll> _polls = [];

  PollsProvider() {
    fetchPolls();
  }

  UnmodifiableListView<Poll> get polls => UnmodifiableListView(_polls);

  // Fetch all polls from Firestore
  Future<void> fetchPolls() async {
    _polls = await storageService.getPolls();
    notifyListeners();
  }

  // Add a new poll and sync with Firestore
  Future<void> addPoll(Poll poll) async {
    try {
      await storageService.createPoll(poll);
      _polls.add(poll);
      notifyListeners();
    } catch (e) {
      print("Error adding poll: $e");
    }
  }

  // Remove a poll by index and sync with Firestore
  Future<void> removePoll(String pollId, int index) async {
    try {
      await storageService.deletePoll(pollId);
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
      await storageService.updatePoll(pollId, updatedPoll);
      if (index >= 0 && index < _polls.length) {
        _polls[index] = updatedPoll;
        notifyListeners();
      }
    } catch (e) {
      print("Error updating poll: $e");
    }
  }

}