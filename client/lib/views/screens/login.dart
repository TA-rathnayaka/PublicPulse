import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:provider/provider.dart';
import 'package:client/views/screens/_all.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/providers/auth_provider.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/providers/screens_providers/login_validation_provider.dart';

class Login extends StatelessWidget {
  static const id = '/login';

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _forgotEmailController = TextEditingController(); // Added

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
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
                          decoration: InputDecoration(
                            hintText: 'User name or email',
                            hintStyle: TextStyle(
                                color: Theme.of(context)
                                    .hintColor), // Set hint style dynamically
                            suffixIcon: Icon(
                              Icons.person,
                              color: Theme.of(context)
                                  .hintColor, // Use dynamic hint color
                            ),
                          ),
                        ),
                        Consumer<LoginValidationProvider>(
                          builder: (context, provider, child) {
                            return Text(
                              provider.emailError ?? "",
                              style: TextStyle(
                                color: Colors.red,
                                fontSize: 14,
                              ),
                            );
                          },
                        ),
                        TextField(
                          controller: _passwordController,
                          obscureText: true,
                          decoration: InputDecoration(
                            hintText: 'Password',
                            hintStyle:
                                TextStyle(color: Theme.of(context).hintColor),
                            suffixIcon: Icon(
                              Icons.lock,
                              color: Theme.of(context)
                                  .hintColor, // Use dynamic hint color
                            ),
                          ),
                        ),
                        Consumer<LoginValidationProvider>(
                          builder: (context, provider, child) {
                            return Text(
                              provider.passwordError ?? "",
                              style: TextStyle(
                                color: Colors.red,
                                fontSize: 14,
                              ),
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
                        context
                            .read<LoginValidationProvider>()
                            .validateEmail(_emailController.text);
                        context
                            .read<LoginValidationProvider>()
                            .validatePassword(_passwordController.text);

                        if (context.read<LoginValidationProvider>().isValid) {
                          context
                              .read<MyAuthProvider>()
                              .signInEmailAndPassword(_emailController.text,
                                  _passwordController.text)
                              .then((_) {
                            if (context.read<MyAuthProvider>().user != null) {
                              Navigator.pushReplacementNamed(
                                  context, SplashScreen.id);
                            } else {
                              context
                                  .read<LoginValidationProvider>()
                                  .validatePassword('');
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
                  SizedBox(height: 20),
                  FadeInUp(
                    duration: const Duration(milliseconds: 1900),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        // Google Icon Button
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.all(12),
                            shape: const CircleBorder(),
                            backgroundColor: Colors.white,
                            side: BorderSide(
                                color: Colors.grey.shade300, width: 1),
                          ),
                          onPressed: () {
                            // Google Sign-In logic
                            context
                                .read<MyAuthProvider>()
                                .signInWithGoogle()
                                .then((_) {
                              if (context.read<MyAuthProvider>().user != null) {
                                Navigator.pushNamed(context, MainScreen.id);
                              } else {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                      content: Text("Google Sign-In failed")),
                                );
                              }
                            }).catchError((error) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                    content:
                                        Text("Error: ${error.toString()}")),
                              );
                            });
                          },
                          child: Image.asset(
                            "images/google.png",
                            height: 24,
                            width: 24,
                          ),
                        ),

                        // Facebook Icon Button
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.all(12),
                            shape: const CircleBorder(),
                            backgroundColor: Colors.white,
                            side: BorderSide(
                                color: Colors.grey.shade300, width: 1),
                          ),
                          onPressed: () {
                            // Facebook Sign-In logic
                            context
                                .read<MyAuthProvider>()
                                .signInWithFacebook()
                                .then((_) {
                              if (context.read<MyAuthProvider>().user != null) {
                                Navigator.pushNamed(context, MainScreen.id);
                              } else {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                      content: Text("Facebook Sign-In failed")),
                                );
                              }
                            }).catchError((error) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                    content:
                                        Text("Error: ${error.toString()}")),
                              );
                            });
                          },
                          child: Image.asset(
                            "images/facebook.png",
                            height: 24,
                            width: 24,
                          ),
                        ),

                        // Mobile Icon Button
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.all(12),
                            shape: const CircleBorder(),
                            backgroundColor: Colors.white,
                            side: BorderSide(
                                color: Colors.grey.shade300, width: 1),
                          ),
                          onPressed: () {
                            // Mobile Sign-In logic
                          },

                          child: Icon(
                            Icons.phone_iphone_outlined,
                            color: Colors.black,
                            size: 24,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 70),
                  FadeInUp(
                    duration: Duration(milliseconds: 2000),
                    child: TextButton(
                      onPressed: () {
                        _showForgotPasswordSheet(context);
                      },
                      child: const Text(
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
  void _showForgotPasswordSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      isScrollControlled: true,
      builder: (BuildContext context) {
        return Padding(
          padding: MediaQuery.of(context).viewInsets,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 30),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  "Reset Password",
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  "Enter your email address and we will send you a link to reset your password.",
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 16, color: Colors.grey),
                ),
                const SizedBox(height: 20),
              TextField(
                controller: _emailController,
                decoration: InputDecoration(
                  hintText: 'Email Address',
                  hintStyle: TextStyle(
                      color: Theme.of(context)
                          .hintColor), // Set hint style dynamically
                  suffixIcon: Icon(
                    Icons.email,
                    color: Theme.of(context)
                        .hintColor, // Use dynamic hint color
                  ),
                ),
              ),
                const SizedBox(height: 20),
                PrimaryButton(
                  label: "Send Reset Link",
                  onPressed: () {
                    final email = _forgotEmailController.text;
                    if (email.isNotEmpty) {
                      context.read<MyAuthProvider>().resetPassword(email).then((_) {
                        Navigator.of(context).pop(); // Close the dialog
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Password reset email sent!')),
                        );
                      }).catchError((error) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Error: ${error.toString()}')),
                        );
                      });
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Please enter an email')),
                      );
                    }
                  },
                ),
                const SizedBox(height: 10),
            Material(
              color: Colors.transparent,  // Transparent to allow child decoration to be visible
              child: Container(
                height: 56,  // Standard minimum height for touch targets
                width: double.infinity,  // Button width expands to fit its parent
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),  // Slightly larger radius for modern design
                  gradient: LinearGradient(
                    colors: [
                      Colors.redAccent,  // Primary red for the cancel button
                      Colors.redAccent.withOpacity(0.6),  // Slightly faded color for a modern effect
                    ],
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.2),
                      blurRadius: 6,
                      offset: Offset(0, 4),  // Creates a shadow effect
                    ),
                  ],
                ),
                child: InkWell(
                  onTap: () {
                    Navigator.pop(context);
                  },  // Single onTap callback to handle button press
                  borderRadius: BorderRadius.circular(12),  // Ensures the ripple effect is within the button's shape
                  child: Center(
                    child: const Text(
                      "Cancel",
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,  // Adjusted font size for better readability
                      ),
                    ),
                  ),
                ),
              ),
            )
              ],
            ),
          ),
        );
      },
    );
  }
}
