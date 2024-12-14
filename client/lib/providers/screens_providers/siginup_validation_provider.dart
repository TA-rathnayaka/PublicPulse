import 'package:flutter/material.dart';

class SignupValidationProvider extends ChangeNotifier {
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

  void validateFirstName(String value) {
    if (value.isEmpty) {
      firstNameError = "First Name is required";
    } else {
      firstNameError = null;
    }
    notifyListeners();
  }

  void validateLastName(String value) {
    if (value.isEmpty) {
      lastNameError = "Last Name is required";
    } else {
      lastNameError = null;
    }
    notifyListeners();
  }

  void validateEmail(String value) {
    if (value.isEmpty) {
      emailError = "Email is required";
    } else if (!RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$').hasMatch(value)) {
      emailError = "Invalid email format";
    } else {
      emailError = null;
    }
    notifyListeners();
  }

  void validatePassword(String value) {
    if (value.isEmpty) {
      passwordError = "Password is required";
    } else if (value.length < 6) {
      passwordError = "Password must be at least 6 characters long";
    } else {
      passwordError = null;
    }
    notifyListeners();
  }

  void validateRepeatPassword() {
    if (repeatPasswordController.text != passwordController.text) {
      repeatPasswordError = "Passwords do not match";
    } else {
      repeatPasswordError = null;
    }
    notifyListeners();
  }

  TextEditingController getController(String hintText) {
    switch (hintText) {
      case 'First Name':
        return firstNameController;
      case 'Last Name':
        return lastNameController;
      case 'Email':
        return emailController;
      default:
        return TextEditingController();
    }
  }

  void handleSignup(BuildContext context) {
    if (firstNameError == null && lastNameError == null && emailError == null && passwordError == null && repeatPasswordError == null) {
      // Proceed with signup
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Signup Successful")));
    } else {
      // Show error message
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Please fix the errors")));
    }
  }

  bool canProceed() {
    // Return true if all fields are valid (no error messages)
    return firstNameError == null && lastNameError == null && emailError == null && passwordError == null && repeatPasswordError == null;
  }
}