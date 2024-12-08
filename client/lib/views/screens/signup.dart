import 'package:client/services/auth.dart';
import 'package:client/services/user_service.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:flutter/material.dart';
import 'package:client/views/components/top_navigation_bar.dart';
import 'package:client/views/constants/constants.dart';
import 'package:firebase_auth/firebase_auth.dart';

class Signup extends StatefulWidget {
  static const id = '/signup';

  @override
  _SignupState createState() => _SignupState();
}

class _SignupState extends State<Signup> {
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _repeatPasswordController =
  TextEditingController();
  final AuthService _auth = AuthService();
  final UserService _userService = UserService();

  String? _firstNameError;
  String? _lastNameError;
  String? _emailError;
  String? _passwordError;
  String? _repeatPasswordError;

  @override
  void initState() {
    super.initState();

    _firstNameController.addListener(() {
      if (_firstNameError != null && _firstNameController.text.isNotEmpty) {
        setState(() {
          _firstNameError = null;
        });
      }
    });
    _lastNameController.addListener(() {
      if (_lastNameError != null && _lastNameController.text.isNotEmpty) {
        setState(() {
          _lastNameError = null;
        });
      }
    });
    _emailController.addListener(() {
      if (_emailError != null &&
          _emailController.text.isNotEmpty &&
          _isValidEmail(_emailController.text)) {
        setState(() {
          _emailError = null;
        });
      }
    });
    _passwordController.addListener(() {
      if (_passwordError != null && _passwordController.text.isNotEmpty) {
        setState(() {
          _passwordError = null;
        });
      }
    });
    _repeatPasswordController.addListener(() {
      if (_repeatPasswordError != null &&
          _repeatPasswordController.text.isNotEmpty) {
        setState(() {
          _repeatPasswordError = null;
        });
      }
    });
  }

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _repeatPasswordController.dispose();
    super.dispose();
  }

  void _validateInputs() {
    setState(() {
      _firstNameError = _firstNameController.text.isEmpty
          ? "First name cannot be empty."
          : null;
      _lastNameError = _lastNameController.text.isEmpty
          ? "Last name cannot be empty."
          : null;
      _emailError = _emailController.text.isEmpty
          ? "Email cannot be empty."
          : _isValidEmail(_emailController.text)
          ? null
          : "Please enter a valid email address.";
      _passwordError =
      _passwordController.text.isEmpty ? "Password cannot be empty." : null;
      _repeatPasswordError =
      _passwordController.text != _repeatPasswordController.text
          ? "Passwords do not match."
          : null;
    });
  }

  bool _isValidEmail(String email) {
    final RegExp emailRegExp = RegExp(
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    );
    return emailRegExp.hasMatch(email);
  }

  void _handleSignup() async {
    _validateInputs();

    if (_firstNameError != null ||
        _lastNameError != null ||
        _emailError != null ||
        _passwordError != null ||
        _repeatPasswordError != null) {
      return;
    }

    String firstName = _firstNameController.text;
    String lastName = _lastNameController.text;
    String email = _emailController.text;
    String password = _passwordController.text;

    User? user = await _auth.registerUserAndPassword(email, password);
    _userService.storeUserDetails(user?.uid, firstName, lastName, email);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Signup successful!')),
    );
  }

  Widget _buildErrorMessage(String? errorMessage) {
    if (errorMessage == null) return SizedBox.shrink();

    return Text(
      errorMessage,
      style: TextStyle(color: Colors.red, fontSize: 14),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TopNavigationBar(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(kPaddingHorizontal),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Create account",
              style: kHeadlineStyle,
            ),
            SizedBox(height: kSizedBoxHeight),
            TextField(
              controller: _firstNameController,
              decoration: kTextFieldDecoration.copyWith(
                  hintText: "First name", hintStyle: kInputHintTextStyle),
            ),
            _buildErrorMessage(_firstNameError),
            SizedBox(height: kSizedBoxHeight),
            TextField(
              controller: _lastNameController,
              decoration: kTextFieldDecoration.copyWith(
                  hintText: "Last name", hintStyle: kInputHintTextStyle),
            ),
            _buildErrorMessage(_lastNameError),
            SizedBox(height: kSizedBoxHeight),
            TextField(
              controller: _emailController,
              decoration: kTextFieldDecoration.copyWith(
                  hintText: "Email", hintStyle: kInputHintTextStyle),
            ),
            _buildErrorMessage(_emailError),
            SizedBox(height: kSizedBoxHeight),
            TextField(
              controller: _passwordController,
              obscureText: true,
              decoration: kTextFieldDecoration.copyWith(
                  hintText: "Password", hintStyle: kInputHintTextStyle),
            ),
            _buildErrorMessage(_passwordError),
            SizedBox(height: kSizedBoxHeight),
            TextField(
              controller: _repeatPasswordController,
              obscureText: true,
              decoration: kTextFieldDecoration.copyWith(
                  hintText: "Repeat password", hintStyle: kInputHintTextStyle),
            ),
            _buildErrorMessage(_repeatPasswordError),
            SizedBox(height: kSizedBoxHeight),
            SizedBox(
              width: double.infinity,
              child: PrimaryButton(
                label: 'Enter',
                onPressed: _handleSignup,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
