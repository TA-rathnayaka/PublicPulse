import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:provider/provider.dart';
import 'package:client/services/auth_service.dart';
import 'package:client/views/screens/_all.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/views/components/top_navigation_bar.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:client/providers/auth_provider.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/providers/login_validation_provider.dart';
import 'package:google_sign_in/google_sign_in.dart';

class Login extends StatelessWidget {
  static const id = '/login';

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  Future<void> _signInWithGoogle(BuildContext context) async {
    final GoogleSignIn googleSignIn = GoogleSignIn();
    try {
      final GoogleSignInAccount? googleUser = await googleSignIn.signIn();
      if (googleUser != null) {
        // Handle Google sign-in logic here
        print("Google User Signed In: ${googleUser.displayName}");
        Navigator.pushNamed(context, Dashboard.id); // Navigate to Dashboard on success
      }
    } catch (error) {
      print("Error during Google Sign-In: $error");
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Google Sign-In failed. Please try again.")),
      );
    }
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              height: 400,
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('images/background.png'),
                  fit: BoxFit.fill,
                ),
              ),
              child: Stack(
                children: <Widget>[
                  Positioned(
                    left: 30,
                    width: 80,
                    height: 200,
                    child: FadeInUp(
                      duration: Duration(seconds: 1),
                      child: Image.asset('images/light-1.png'),
                    ),
                  ),
                  Positioned(
                    left: 140,
                    width: 80,
                    height: 150,
                    child: FadeInUp(
                      duration: Duration(milliseconds: 1200),
                      child: Image.asset('images/light-2.png'),
                    ),
                  ),
                  Positioned(
                    right: 40,
                    top: 40,
                    width: 80,
                    height: 150,
                    child: FadeInUp(
                      duration: Duration(milliseconds: 1300),
                      child: Image.asset('images/clock.png'),
                    ),
                  ),
                  Positioned(
                    child: FadeInUp(
                      duration: Duration(milliseconds: 1600),
                      child: Container(
                        margin: EdgeInsets.only(top: 50),
                        child: Center(
                          child: Text(
                            "Login",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 40,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.all(30.0),
              child: Column(
                children: <Widget>[
                  FadeInUp(
                    duration: Duration(milliseconds: 1800),
                    child: Column(
                      children: <Widget>[
                        // Email TextField
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
                        Consumer<LoginValidationProvider>(
                          builder: (context, provider, child) {
                            return Text(
                              provider.emailError ?? "",
                              style: TextStyle(color: Colors.red, fontSize: 14),
                            );
                          },
                        ),

                        // Password TextField
                        TextField(
                          controller: _passwordController,
                          obscureText: true,
                          decoration: kTextFieldDecoration.copyWith(
                            hintText: 'Password',
                            suffixIcon: Icon(
                              Icons.lock,
                              color: kTextFieldHintColor,
                            ),
                          ),
                        ),
                        Consumer<LoginValidationProvider>(
                          builder: (context, provider, child) {
                            return Text(
                              provider.passwordError ?? "",
                              style: TextStyle(color: Colors.red, fontSize: 14),
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 30),
                  FadeInUp(
                    duration: Duration(milliseconds: 1900),
                    child: PrimaryButton(
                      label: "Login",
                      onPressed: () {
                        // Validate inputs only when the button is pressed
                        context.read<LoginValidationProvider>().validateEmail(_emailController.text);
                        context.read<LoginValidationProvider>().validatePassword(_passwordController.text);

                        if (context.read<LoginValidationProvider>().isValid) {
                          // If valid, proceed with login
                          context.read<MyAuthProvider>().signInEmailAndPassword(
                              _emailController.text, _passwordController.text).then((_) {
                            if (context.read<MyAuthProvider>().user != null) {
                              Navigator.pushNamed(context, Dashboard.id);
                            } else {
                              // Show error if login failed
                              context.read<LoginValidationProvider>().validatePassword('');
                            }
                          });
                        }
                      },
                    ),
                  ),


                  SizedBox(height: 20),
                  FadeInUp(
                    duration: Duration(milliseconds: 1900),
                    child: PrimaryButton(
                      label: "Create Account",
                      onPressed: () {
                        Navigator.pushNamed(context, Signup.id);
                      },
                    ),
                  ),
                  SizedBox(height: 30),
                  // Google Login Button
                  FadeInUp(
                    duration: Duration(milliseconds: 1900),
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        // Button text color
                        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                        side: BorderSide(color: Colors.grey.shade300, width: 1),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      onPressed: () => _signInWithGoogle(context),
                      icon: Image.network(
                        "https://cdn-icons-png.flaticon.com/128/300/300221.png",
                        height: 20,
                      ),
                      label: Text(
                        "Sign in with Google",
                        style: TextStyle(
                            color: Colors.black
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 70),
                  FadeInUp(
                    duration: Duration(milliseconds: 2000),
                    child: TextButton(
                      onPressed: () {
                        // Forgot password logic here
                      },
                      child: Text(
                        "Forgot Password?",
                        style: TextStyle(color: kPrimaryColor),
                      ),
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