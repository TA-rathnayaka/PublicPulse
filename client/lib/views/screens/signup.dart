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

  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _repeatPasswordController = TextEditingController();

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
          _buildFormFields(context),
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

  Widget _buildFormFields(BuildContext context) {
    return FadeInUp(
      duration: Duration(milliseconds: 1800),
      child: Column(
        children: <Widget>[
          _buildTextField(
            _firstNameController,
            'First Name',
            Icons.person,
          ),
          SizedBox(height: 20),
          _buildTextField(
            _lastNameController,
            'Last Name',
            Icons.person,
          ),
          SizedBox(height: 20),
          _buildTextField(
            _emailController,
            'Email',
            Icons.email,
          ),
          SizedBox(height: 20),
          _buildPasswordTextField(context),
          SizedBox(height: 20),
          _buildRepeatPasswordTextField(context),
        ],
      ),
    );
  }

  Widget _buildTextField(TextEditingController controller, String hintText, IconData icon) {
    return TextField(
      controller: controller,
      decoration: kTextFieldDecoration.copyWith(
        hintText: hintText,
        suffixIcon: Icon(
          icon,
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

  Widget _buildRepeatPasswordTextField(BuildContext context) {
    return TextField(
      controller: _repeatPasswordController,
      obscureText: true,
      decoration: kTextFieldDecoration.copyWith(
        hintText: 'Repeat Password',
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
          if (_validateInputs()) {
            context.read<MyAuthProvider>().registerUserAndPassword(
              _emailController.text,
              _passwordController.text,
              _firstNameController.text,
              _lastNameController.text,
            ).then((_) {
              if (context.read<MyAuthProvider>().user != null) {
                Navigator.pushNamed(context, Dashboard.id);
              }
            });
          }
        },
      ),
    );
  }

  bool _validateInputs() {
    // Here you can validate the form inputs
    if (_firstNameController.text.isEmpty || _lastNameController.text.isEmpty ||
        _emailController.text.isEmpty || _passwordController.text.isEmpty ||
        _repeatPasswordController.text.isEmpty) {
      return false;
    }
    if (_passwordController.text != _repeatPasswordController.text) {
      return false;
    }
    return true;
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