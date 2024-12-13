import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:provider/provider.dart';
import 'package:client/views/screens/_all.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/views/components/top_navigation_bar.dart';
import 'package:client/providers/auth_provider.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/providers/user_provider.dart';
import 'package:client/providers/screens_providers/siginup_validation_provider.dart';

class Signup extends StatelessWidget {
  static const id = '/signup';

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => SignupValidationProvider(),
      child: Scaffold(
        backgroundColor: Colors.white,
        body: SingleChildScrollView(
          child: Column(
            children: [
              _buildBackgroundSection(),
              _buildFormSection(context),
            ],
          ),
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
            context,
            'First Name',
            Icons.person,
                (value) {
              context.read<SignupValidationProvider>().validateFirstName(value);
            },
            errorText: context.watch<SignupValidationProvider>().firstNameError,
          ),
          SizedBox(height: 20),
          _buildTextField(
            context,
            'Last Name',
            Icons.person,
                (value) {
              context.read<SignupValidationProvider>().validateLastName(value);
            },
            errorText: context.watch<SignupValidationProvider>().lastNameError,
          ),
          SizedBox(height: 20),
          _buildTextField(
            context,
            'Email',
            Icons.email,
                (value) {
              context.read<SignupValidationProvider>().validateEmail(value);
            },
            errorText: context.watch<SignupValidationProvider>().emailError,
          ),
          SizedBox(height: 20),
          _buildPasswordTextField(context),
          SizedBox(height: 20),
          _buildRepeatPasswordTextField(context),
        ],
      ),
    );
  }

  Widget _buildTextField(BuildContext context, String hintText, IconData icon, Function(String) onChanged, {String? errorText}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextField(
          controller: context.read<SignupValidationProvider>().getController(hintText),
          decoration: kTextFieldDecoration.copyWith(
            hintText: hintText,
            suffixIcon: Icon(
              icon,
              color: kTextFieldHintColor,
            ),
          ),
          onChanged: onChanged,
        ),
        if (errorText != null)
          Text(
            errorText,
            style: TextStyle(color: Colors.red, fontSize: 12),
          ),
      ],
    );
  }

  Widget _buildPasswordTextField(BuildContext context) {
    return TextField(
      controller: context.read<SignupValidationProvider>().passwordController,
      obscureText: true,
      decoration: kTextFieldDecoration.copyWith(
        hintText: 'Password',
        suffixIcon: Icon(
          Icons.lock,
          color: kTextFieldHintColor,
        ),
      ),
      onChanged: (value) {
        context.read<SignupValidationProvider>().validatePassword(value);
      },
    );
  }

  Widget _buildRepeatPasswordTextField(BuildContext context) {
    return TextField(
      controller: context.read<SignupValidationProvider>().repeatPasswordController,
      obscureText: true,
      decoration: kTextFieldDecoration.copyWith(
        hintText: 'Repeat Password',
        suffixIcon: Icon(
          Icons.lock,
          color: kTextFieldHintColor,
        ),
      ),
      onChanged: (value) {
        context.read<SignupValidationProvider>().validateRepeatPassword();
      },
    );
  }

  Widget _buildSignupButton(BuildContext context) {
    return FadeInUp(
      duration: Duration(milliseconds: 1900),
      child: PrimaryButton(
        label: "Sign Up",
        onPressed: () async {
          if (context.read<SignupValidationProvider>().canProceed()) {
            String email = context.read<SignupValidationProvider>().emailController.text;
            String password = context.read<SignupValidationProvider>().passwordController.text;

            // Register user via MyAuthProvider
            await context.read<MyAuthProvider>().registerUserAndPassword(email, password);

            // After successful registration, store user details in UserProvider
            String uid = context.read<MyAuthProvider>().user!.uid;  // Assuming user is authenticated
            String firstName = context.read<SignupValidationProvider>().firstNameController.text;
            String lastName = context.read<SignupValidationProvider>().lastNameController.text;

            await context.read<UserProvider>().storeUserDetails(uid, firstName, lastName, email);

            // Navigate to home or another screen
            Navigator.pushReplacementNamed(context, Dashboard.id); // Adjust based on your app's flow
          } else {
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Please fill in all the fields correctly")));
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