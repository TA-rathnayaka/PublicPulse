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

  Login({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              height: 400,
              decoration: const BoxDecoration(
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
                      duration: const Duration(seconds: 1),
                      child: Image.asset('images/light-1.png'),
                    ),
                  ),
                  Positioned(
                    left: 140,
                    width: 80,
                    height: 150,
                    child: FadeInUp(
                      duration: const Duration(milliseconds: 1200),
                      child: Image.asset('images/light-2.png'),
                    ),
                  ),
                  Positioned(
                    right: 40,
                    top: 40,
                    width: 80,
                    height: 150,
                    child: FadeInUp(
                      duration: const Duration(milliseconds: 1300),
                      child: Image.asset('images/clock.png'),
                    ),
                  ),
                  Positioned(
                    child: FadeInUp(
                      duration: const Duration(milliseconds: 1600),
                      child: Container(
                        margin: const EdgeInsets.only(top: 50),
                        child: const Center(
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
              padding: const EdgeInsets.all(30.0),
              child: Column(
                children: <Widget>[
                  FadeInUp(
                    duration: const Duration(milliseconds: 1800),
                    child: Column(
                      children: <Widget>[
                        // Email TextField
                        TextField(
                          controller: _emailController,
                          decoration: kTextFieldDecoration.copyWith(
                            hintText: 'User name or email',
                            suffixIcon: const Icon(
                              Icons.person,
                              color: kTextFieldHintColor,
                            ),
                          ),
                        ),
                        Consumer<LoginValidationProvider>(
                          builder: (context, provider, child) {
                            return Text(
                              provider.emailError ?? "",
                              style: const TextStyle(color: Colors.red, fontSize: 14),
                            );
                          },
                        ),

                        // Password TextField
                        TextField(
                          controller: _passwordController,
                          obscureText: true,
                          decoration: kTextFieldDecoration.copyWith(
                            hintText: 'Password',
                            suffixIcon: const Icon(
                              Icons.lock,
                              color: kTextFieldHintColor,
                            ),
                          ),
                        ),
                        Consumer<LoginValidationProvider>(
                          builder: (context, provider, child) {
                            return Text(
                              provider.passwordError ?? "",
                              style: const TextStyle(color: Colors.red, fontSize: 14),
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 30),
                  FadeInUp(
                    duration: const Duration(milliseconds: 1900),
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
                              Navigator.pushReplacementNamed(context, MainScreen.id);
                            } else {
                              // Show error if login failed
                              context.read<LoginValidationProvider>().validatePassword('');
                            }
                          });
                        }
                      },
                    ),
                  ),
                  const SizedBox(height: 20),
                  FadeInUp(
                    duration: const Duration(milliseconds: 1900),
                    child: PrimaryButton(
                      label: "Create Account",
                      onPressed: () {
                        Navigator.pushNamed(context, Signup.id);
                      },
                    ),
                  ),
                  const SizedBox(height: 70),
                  FadeInUp(
                    duration: const Duration(milliseconds: 2000),
                    child: TextButton(
                      onPressed: () {
                        // Forgot password logic here
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
}