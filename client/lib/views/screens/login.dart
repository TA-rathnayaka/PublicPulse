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
                          child: Image.network(
                            "https://cdn-icons-png.flaticon.com/128/300/300221.png",
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
                          child: Image.network(
                            "https://cdn-icons-png.flaticon.com/128/145/145802.png",
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
                            Icons.phone_android,
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
