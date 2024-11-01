import 'dart:collection';
import 'package:flutter/foundation.dart';
import 'package:client/models/poll.dart';
import 'package:client/services/firestore.dart';

class PollsProvider extends ChangeNotifier {
  final StorageService storageService = StorageService();
  List<Poll> _polls = [];

  UnmodifiableListView<Poll> get polls => UnmodifiableListView(_polls);

  Future<void> fetchPolls() async {
    _polls = await storageService.getPolls();
    notifyListeners();
  }

  void addPoll(Poll poll) {
    _polls.add(poll);
    notifyListeners();
  }

  void removePoll(int index) {
    if (index >= 0 && index < _polls.length) {
      _polls.removeAt(index);
      notifyListeners();
    }
  }

  void updatePoll(int index, Poll updatedPoll) {
    if (index >= 0 && index < _polls.length) {
      _polls[index] = updatedPoll;
      notifyListeners();
    }
  }
}
