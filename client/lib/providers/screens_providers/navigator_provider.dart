import 'package:flutter/foundation.dart';

class NavigatorProvider extends ChangeNotifier {
  int _currentIndex;

  NavigatorProvider([int startIndex = 0]) : _currentIndex = startIndex;

  int get currentIndex => _currentIndex;

  void setCurrentIndex(int index) {
    if (index != _currentIndex) {
      _currentIndex = index;
      notifyListeners();
    }
  }
}
