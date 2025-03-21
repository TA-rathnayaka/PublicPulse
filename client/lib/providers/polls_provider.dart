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

  UnmodifiableListView<Poll> get polls => UnmodifiableListView(_filteredPolls);

  PollsProvider() {
    fetchPolls();
  }

  void setSelectedIndex(int index) {
    if (0 <= index && index < _filteredPolls.length) {
      _selectedIndex = index;
    } else {
      _selectedIndex = null; // Reset to null if the index is out of bounds
    }
  }

  void setSearchTerm(String searchTerm) {
    _searchTerm = searchTerm;
    _filterPolls();
    notifyListeners();
  }

  void _filterPolls() {
    if (_searchTerm.isEmpty) {
      _filteredPolls = List.from(_polls);
    } else {
      final searchLower = _searchTerm.toLowerCase();

      _filteredPolls = _polls.where((poll) {
        // Basic title and description matching
        final titleMatch = poll.title.toLowerCase().contains(searchLower);
        final descMatch = poll.description.toLowerCase().contains(searchLower);

        final optionsMatch = poll.options?.any((option) =>
            option.text.toLowerCase().contains(searchLower)) ?? false;


        // Return true if any relevant field matches
        return titleMatch ||
            descMatch ||
            optionsMatch;
      }).toList();
    }
  }

  Future<void> fetchPolls() async {
    _polls = await _storageService.getPolls();
    _filterPolls(); // Update the filtered polls based on current search term
    notifyListeners();
  }

  Future<Poll?> getPollByIndex() async {
    if (_selectedIndex != null && _selectedIndex! >= 0 && _selectedIndex! < _filteredPolls.length) {
      Poll selectedPoll = _filteredPolls[_selectedIndex!];
      selectedPoll.hasVoted = await _voteService.hasUserVoted(selectedPoll.id ?? "");
      return selectedPoll;
    }
    return null;
  }

  Future<void> addPoll(Poll poll) async {
    try {
      await _storageService.createPoll(poll);
      _polls.add(poll);
      _filterPolls();  // Update filtered polls list after adding a new poll
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
        _filterPolls();  // Reapply filtering after removal
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
        _filterPolls();  // Reapply filtering after update
        notifyListeners();
      }
    } catch (e) {
      print("Error updating poll: $e");
    }
  }

  Future<void> addVote(String optionId) async {
    try {
      Poll? selectedPoll = await getPollByIndex();

      if (selectedPoll != null) {
        await _voteService.addVote(selectedPoll.id ?? "", optionId);
        selectedPoll.hasVoted = true;
        notifyListeners();
      } else {
        print("Poll not found.");
      }
    } catch (e) {
      print("Error adding vote in provider: $e");
    }
  }
}