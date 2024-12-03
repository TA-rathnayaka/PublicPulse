import 'package:client/services/auth.dart';
import 'package:client/views/screens/_all.dart';
import 'package:flutter/material.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/views/components/top_navigation_bar.dart';
import 'package:firebase_auth/firebase_auth.dart';

class Login extends StatefulWidget {
  static const id = '/login';

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final AuthService _auth = AuthService();

  String? _emailError;
  String? _passwordError;

  @override
  void initState() {
    super.initState();
    // Add listeners to clear errors on valid input
    _emailController.addListener(() {
      if (_emailError != null && _emailController.text.isNotEmpty) {
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
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  // Validation method
  void _validateInputs() {
    setState(() {
      _emailError = _emailController.text.isEmpty
          ? "Email cannot be empty."
          : !_isValidEmail(_emailController.text)
          ? "Please enter a valid email address."
          : null;
      _passwordError =
      _passwordController.text.isEmpty ? "Password cannot be empty." : null;
    });
  }

  // Email validation regex
  bool _isValidEmail(String email) {
    final RegExp emailRegExp = RegExp(
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    );
    return emailRegExp.hasMatch(email);
  }

  void _handleLogin() async {
    _validateInputs();

    // If any error exists, stop further execution
    if (_emailError != null || _passwordError != null) {
      return;
    }

    // If validation passes, proceed with the login logic
    String email = _emailController.text;
    String password = _passwordController.text;

    try {
      User? user = await _auth.signInEmailAndPassword(email, password);
      if (user != null) {
        Navigator.pushNamed(context, Dashboard.id); // Replace with your home screen
      } else {
        setState(() {
          _passwordError = "Login failed. Please check your credentials.";
        });
      }
    } catch (e) {
      setState(() {
        _passwordError = "Login failed. Please check your credentials.";
      });
    }
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
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(height: kSizedBoxHeight),
            Center(
              child: Column(
                children: [
                  Icon(Icons.how_to_vote, size: 100, color: kPrimaryColor),
                  SizedBox(height: kSizedBoxHeight),
                  Text(
                    "Welcome to Public Pulse",
                    style: kHeadlineStyle,
                  ),
                  SizedBox(height: kSizedBoxHeight),
                  TextField(
                    controller: _emailController,
                    decoration: kTextFieldDecoration.copyWith(
                      hintText: 'User name or email',
                      suffixIcon: Icon(
                        Icons.person,
                        color: kTextFieldHintColor,
                      ),
                    ),
                  ),
                  _buildErrorMessage(_emailError),
                  SizedBox(height: kSizedBoxHeight),
                  TextField(
                    controller: _passwordController,
                    obscureText: true,
                    decoration: kTextFieldDecoration.copyWith(
                      hintText: "Password",
                      suffixIcon: Icon(
                        Icons.visibility_off,
                        color: kTextFieldHintColor,
                      ),
                    ),
                  ),
                  _buildErrorMessage(_passwordError),
                  SizedBox(height: kSizedBoxHeight),
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () {
                        // Add forgot password logic here
                      },
                      child: Text(
                        "Forgot a password?",
                        style: TextStyle(color: kPrimaryColor),
                      ),
                    ),
                  ),
                  SizedBox(height: kSizedBoxHeight),
                  SizedBox(
                    width: double.infinity,
                    child: PrimaryButton(
                      label: "Enter",
                      onPressed: _handleLogin,
                    ),
                  ),
                  SizedBox(height: kSizedBoxHeight),
                  SizedBox(
                    width: double.infinity,
                    child: PrimaryButton(
                      label: "Create Account",
                      onPressed: () {
                        Navigator.pushNamed(context, Signup.id);
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
