import 'package:flutter/material.dart';
import 'package:client/services/auth_service.dart';
import 'package:client/services/user_service.dart';
import 'package:firebase_auth/firebase_auth.dart';

class SignupValidationProvider extends ChangeNotifier {
  final AuthService _auth = AuthService();
  final UserService _userService = UserService();

  TextEditingController firstNameController = TextEditingController();
  TextEditingController lastNameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController repeatPasswordController = TextEditingController();

  String? firstNameError;
  String? lastNameError;
  String? emailError;
  String? passwordError;
  String? repeatPasswordError;

  bool get isValid => firstNameError == null &&
      lastNameError == null &&
      emailError == null &&
      passwordError == null &&
      repeatPasswordError == null;

  void validateFirstName() {
    firstNameError = firstNameController.text.isEmpty ? "First name cannot be empty." : null;
    notifyListeners();
  }

  void validateLastName() {
    lastNameError = lastNameController.text.isEmpty ? "Last name cannot be empty." : null;
    notifyListeners();
  }

  void validateEmail(String email) {
    emailError = email.isEmpty
        ? "Email cannot be empty."
        : _isValidEmail(email)
        ? null
        : "Please enter a valid email address.";
    notifyListeners();
  }

  void validatePassword(String password) {
    passwordError = password.isEmpty ? "Password cannot be empty." : null;
    notifyListeners();
  }

  void validateRepeatPassword() {
    repeatPasswordError = passwordController.text != repeatPasswordController.text
        ? "Passwords do not match."
        : null;
    notifyListeners();
  }

  bool _isValidEmail(String email) {
    final RegExp emailRegExp = RegExp(
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    );
    return emailRegExp.hasMatch(email);
  }

  Future<void> handleSignup(BuildContext context) async {
    if (!isValid) {
      return;
    }

    String firstName = firstNameController.text;
    String lastName = lastNameController.text;
    String email = emailController.text;
    String password = passwordController.text;

    try {
      User? user = await _auth.registerUserAndPassword(email, password);
      await _userService.storeUserDetails(user?.uid, firstName, lastName, email);

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Signup successful!')),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Signup failed. Please try again.')),
      );
    }
  }

  void clearInputs() {
    firstNameController.clear();
    lastNameController.clear();
    emailController.clear();
    passwordController.clear();
    repeatPasswordController.clear();
  }
}