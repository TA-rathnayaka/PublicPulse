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

class Login extends StatelessWidget {
  static const id = '/login';

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();


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
                              Navigator.pushNamed(context, MainScreen.id);
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
                      duration: const Duration(milliseconds: 1900),
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                          side: BorderSide(color: Colors.grey.shade300, width: 1),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        onPressed: () {
                          // Validate any preconditions if needed
                          if (context.read<LoginValidationProvider>().isValid) {
                            // Proceed with Google sign-in
                            context.read<MyAuthProvider>().signInWithGoogle().then((_) {
                              if (context.read<MyAuthProvider>().user != null) {
                                // Navigate to the dashboard on success
                                Navigator.pushNamed(context, MainScreen.id);
                              } else {
                                // Show error if Google sign-in failed
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(content: Text("Google Sign-In failed")),
                                );
                              }
                            }).catchError((error) {
                              // Handle any error that might occur during Google sign-in
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text("Error: ${error.toString()}")),
                              );
                            });
                          } else {
                            // Show validation error or feedback to the user if needed
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text("Please fix validation issues before proceeding.")),
                            );
                          }
                        },

                        icon: Image.network(
                          "https://cdn-icons-png.flaticon.com/128/300/300221.png",
                          height: 20,
                        ),
                        label: const Text(
                          "Sign in with Google",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                      ),),
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