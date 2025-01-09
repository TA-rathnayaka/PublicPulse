import 'dart:collection';
import 'package:client/services/vote_service.dart';
import 'package:flutter/foundation.dart';
import 'package:client/models/poll.dart';
import 'package:client/services/poll_service.dart';

class PollsProvider extends ChangeNotifier {
  final PollService _storageService = PollService();
  final VoteService _voteService = VoteService();

  int? _selectedIndex;
  List<Poll> _polls = [];
  List<Poll> _filteredPolls = [];
  String _searchTerm = "";

  UnmodifiableListView<Poll> get polls => UnmodifiableListView(_polls);


  PollsProvider() {
    fetchPolls();
  }

  void setSelectedIndex(int index) {
    if (0 <= index && index < polls.length) {
      _selectedIndex = index;
    }
  }

  void setSearchTerm(String searchTerm) {
    _searchTerm = searchTerm;
    _filterPolls();
    notifyListeners();
  }

  void _filterPolls() {
    if (_searchTerm.isEmpty) {
      _filteredPolls = [];
    } else {
      _filteredPolls = _polls.where((poll) {
        return poll.title.toLowerCase().contains(_searchTerm.toLowerCase()) ||
            poll.description.toLowerCase().contains(_searchTerm.toLowerCase());  // Filter by title or description
      }).toList();
    }
  }




  Future<void> fetchPolls() async {
    _polls = await _storageService.getPolls();
    notifyListeners();
  }

  Future<Poll?> getPollByIndex() async {
    if (_selectedIndex != null) {
      Poll selectedPoll = polls[_selectedIndex!];
      selectedPoll.hasVoted =
          await _voteService.hasUserVoted(selectedPoll.id ?? "");
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


  Future<void> addVote(String optionId) async {
    try {
      Poll? selected_poll = await getPollByIndex();

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
    }
  }
}
