import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:client/services/auth_service.dart';

class MyAuthProvider with ChangeNotifier {
  final AuthService _authService = AuthService();
  User? _user;

  User? get user => _user;

  Stream<User?> get userStream => _authService.userStream;

  Future<void> signInWithGoogle() async {
      _user = await _authService.signInWithGoogle();
      notifyListeners();
  }

  Future<void> signInEmailAndPassword(String email, String password) async {
    _user = await _authService.signInEmailAndPassword(email, password);
    notifyListeners();
  }

  Future<void> registerUserAndPassword(String email, String password) async {
    _user = await _authService.registerUserAndPassword(email, password);
    notifyListeners();
  }

  Future<void> changeUserEmail(String newEmail) async {
    await _authService.changeUserEmail(newEmail);
    // Re-fetch the user after updating the email.
    _user = FirebaseAuth.instance.currentUser;
    notifyListeners();
  }

  void signOut() async {
    await _authService.signOut();
    _user = null;
    notifyListeners();
  }
}