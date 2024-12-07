import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:provider/provider.dart';
import 'package:client/views/screens/_all.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/views/components/top_navigation_bar.dart';
import 'package:client/providers/auth_provider.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/providers/siginup_validation_provider.dart';

class Signup extends StatelessWidget {
  static const id = '/signup';

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildBackgroundSection(),
            _buildFormSection(context),
          ],
        ),
      ),
    );
  }

  Widget _buildBackgroundSection() {
    return Container(
      height: 400,
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('images/background.png'),
          fit: BoxFit.fill,
        ),
      ),
      child: Stack(
        children: <Widget>[
          _buildPositionedImage('images/light-1.png', 30, 80, 200, 1),
          _buildPositionedImage('images/light-2.png', 140, 80, 150, 1.2),
          _buildPositionedImage('images/clock.png', 40, 80, 150, 1.3),
          _buildTitleText(),
        ],
      ),
    );
  }

  Widget _buildPositionedImage(String image, double left, double width, double height, double duration) {
    return Positioned(
      left: left,
      width: width,
      height: height,
      child: FadeInUp(
        duration: Duration(milliseconds: (duration * 1000).toInt()),
        child: Image.asset(image),
      ),
    );
  }

  Widget _buildTitleText() {
    return Positioned(
      child: FadeInUp(
        duration: Duration(milliseconds: 1600),
        child: Container(
          margin: EdgeInsets.only(top: 50),
          child: Center(
            child: Text(
              "Sign Up",
              style: TextStyle(
                color: Colors.white,
                fontSize: 40,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFormSection(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(30.0),
      child: Column(
        children: <Widget>[
          _buildEmailPasswordFields(context),
          SizedBox(height: 30),
          _buildSignupButton(context),
          SizedBox(height: 20),
          _buildLoginButton(context),
          SizedBox(height: 70),
          _buildForgotPasswordButton(),
        ],
      ),
    );
  }

  Widget _buildEmailPasswordFields(BuildContext context) {
    return FadeInUp(
      duration: Duration(milliseconds: 1800),
      child: Column(
        children: <Widget>[
          _buildEmailTextField(context),
          SizedBox(height: 20),  // Add spacing between email and password fields
          _buildPasswordTextField(context),
        ],
      ),
    );
  }

  Widget _buildEmailTextField(BuildContext context) {
    return TextField(
      controller: _emailController,
      decoration: kTextFieldDecoration.copyWith(
        hintText: 'User name or email',
        suffixIcon: Icon(
          Icons.person,
          color: kTextFieldHintColor,
        ),
      ),
    );
  }

  Widget _buildPasswordTextField(BuildContext context) {
    return TextField(
      controller: _passwordController,
      obscureText: true,
      decoration: kTextFieldDecoration.copyWith(
        hintText: 'Password',
        suffixIcon: Icon(
          Icons.lock,
          color: kTextFieldHintColor,
        ),
      ),
    );
  }

  Widget _buildSignupButton(BuildContext context) {
    return FadeInUp(
      duration: Duration(milliseconds: 1900),
      child: PrimaryButton(
        label: "Sign Up",
        onPressed: () {
          context.read<SignupValidationProvider>().validateEmail(_emailController.text);
          context.read<SignupValidationProvider>().validatePassword(_passwordController.text);

          if (context.read<SignupValidationProvider>().isValid) {
            context.read<MyAuthProvider>().signInEmailAndPassword(
              _emailController.text, _passwordController.text,
            ).then((_) {
              if (context.read<MyAuthProvider>().user != null) {
                Navigator.pushNamed(context, Dashboard.id);
              } else {
                context.read<SignupValidationProvider>().validatePassword('');
              }
            });
          }
        },
      ),
    );
  }

  Widget _buildLoginButton(BuildContext context) {
    return FadeInUp(
      duration: Duration(milliseconds: 1900),
      child: PrimaryButton(
        label: "Already have an account?",
        onPressed: () {
          Navigator.pushNamed(context, Login.id);
        },
      ),
    );
  }

  Widget _buildForgotPasswordButton() {
    return FadeInUp(
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
    );
  }
}