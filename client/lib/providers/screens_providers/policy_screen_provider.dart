import 'package:flutter/material.dart';

class PolicyScreenProvider extends ChangeNotifier {
  int _currentIndex = 0;

  int get currentIndex => _currentIndex;

  // Go to the next policy section if not at the last index
  void next() {
    if (_currentIndex < 2) {
      _currentIndex++;
      notifyListeners();
    }
  }

  // Go to the previous policy section if not at the first index
  void previous() {
    if (_currentIndex > 0) {
      _currentIndex--;
      notifyListeners();
    }
  }

  // Reset the index to the first section
  void reset() {
    _currentIndex = 0;
    notifyListeners();
  }
}