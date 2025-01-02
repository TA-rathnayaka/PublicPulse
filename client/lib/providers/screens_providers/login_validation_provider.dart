import 'package:flutter/material.dart';

class LoginValidationProvider extends ChangeNotifier {
  String? _emailError;
  String? _passwordError;

  String? get emailError => _emailError;
  String? get passwordError => _passwordError;

  void validateEmail(String email) {
    if (email.isEmpty) {
      _emailError = "Email cannot be empty.";
    } else if (!_isValidEmail(email)) {
      _emailError = "Please enter a valid email address.";
    } else {
      _emailError = null;
    }
    notifyListeners();
  }

  void validatePassword(String password) {
    if (password.isEmpty) {
      _passwordError = "Password cannot be empty.";
    } else {
      _passwordError = null;
    }
    notifyListeners();
  }

  bool get isValid => _emailError == null && _passwordError == null;

  bool _isValidEmail(String email) {
    final RegExp emailRegExp = RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    return emailRegExp.hasMatch(email);
  }
}