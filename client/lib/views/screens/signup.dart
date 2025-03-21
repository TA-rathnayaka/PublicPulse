import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:provider/provider.dart';
import 'package:client/views/screens/_all.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/providers/auth_provider.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/providers/user_provider.dart';
import 'package:client/providers/screens_providers/siginup_validation_provider.dart';

class Signup extends StatelessWidget {
  static const id = '/signup';

  const Signup({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => SignupValidationProvider(),
      child: Scaffold(
        backgroundColor: Theme.of(context).scaffoldBackgroundColor, // Theme-based background
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
      decoration: const BoxDecoration(
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
        duration: const Duration(milliseconds: 1600),
        child: Container(
          margin: const EdgeInsets.only(top: 50),
          child: const Center(
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
      padding: const EdgeInsets.all(30.0),
      child: Column(
        children: <Widget>[
          _buildFormFields(context),
          const SizedBox(height: 30),
          _buildSignupButton(context),
          const SizedBox(height: 20),
          _buildLoginButton(context),
          const SizedBox(height: 70),

        ],
      ),
    );
  }

  Widget _buildFormFields(BuildContext context) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1800),
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
          const SizedBox(height: 20),
          _buildTextField(
            context,
            'Last Name',
            Icons.person,
                (value) {
              context.read<SignupValidationProvider>().validateLastName(value);
            },
            errorText: context.watch<SignupValidationProvider>().lastNameError,
          ),
          const SizedBox(height: 20),
          _buildTextField(
            context,
            'Email',
            Icons.email,
                (value) {
              context.read<SignupValidationProvider>().validateEmail(value);
            },
            errorText: context.watch<SignupValidationProvider>().emailError,
          ),
          const SizedBox(height: 20),
          _buildPasswordTextField(context),
          const SizedBox(height: 20),
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
          decoration: InputDecoration(
            hintText: hintText,
            suffixIcon: Icon(
              icon,
              color: Theme.of(context).hintColor,  // Use the dynamic theme's hint color
            ),
            filled: true,
            fillColor: Theme.of(context).inputDecorationTheme.fillColor,
            border: Theme.of(context).inputDecorationTheme.border,
            enabledBorder: Theme.of(context).inputDecorationTheme.enabledBorder,
            focusedBorder: Theme.of(context).inputDecorationTheme.focusedBorder,
          ),
          onChanged: onChanged,
        ),
        if (errorText != null)
          Text(
            errorText,
            style: const TextStyle(color: Colors.red, fontSize: 12),
          ),
      ],
    );
  }

  Widget _buildPasswordTextField(BuildContext context) {
    return TextField(
      controller: context.read<SignupValidationProvider>().passwordController,
      obscureText: true,
      decoration: InputDecoration(
        hintText: 'Password',
        suffixIcon: const Icon(
          Icons.lock,
          color: kTextFieldHintColor,
        ),
        filled: true,
        fillColor: Theme.of(context).inputDecorationTheme.fillColor,
        border: Theme.of(context).inputDecorationTheme.border,
        enabledBorder: Theme.of(context).inputDecorationTheme.enabledBorder,
        focusedBorder: Theme.of(context).inputDecorationTheme.focusedBorder,
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
      decoration: InputDecoration(
        hintText: 'Repeat Password',
        suffixIcon: const Icon(
          Icons.lock,
          color: kTextFieldHintColor,
        ),
        filled: true,
        fillColor: Theme.of(context).inputDecorationTheme.fillColor,
        border: Theme.of(context).inputDecorationTheme.border,
        enabledBorder: Theme.of(context).inputDecorationTheme.enabledBorder,
        focusedBorder: Theme.of(context).inputDecorationTheme.focusedBorder,
      ),
      onChanged: (value) {
        context.read<SignupValidationProvider>().validateRepeatPassword();
      },
    );
  }

  Widget _buildSignupButton(BuildContext context) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1900),
      child: PrimaryButton(
        label: "Sign Up",
        onPressed: () async {
          if (context.read<SignupValidationProvider>().canProceed()) {
            String email = context.read<SignupValidationProvider>().emailController.text;
            String password = context.read<SignupValidationProvider>().passwordController.text;

            String firstName = context.read<SignupValidationProvider>().firstNameController.text;
            String lastName = context.read<SignupValidationProvider>().lastNameController.text;
            await context.read<MyAuthProvider>().registerUserAndPassword(firstName + " " +lastName, email, password);
            await context.read<MyAuthProvider>().signInEmailAndPassword(email, password);
            await context.read<UserProvider>().storeUserDetails(displayName: "$firstName $lastName");
            await context.read<UserProvider>().getCurrentUserDetails();
            // Navigate to home or another screen
            Navigator.pushReplacementNamed(context, SplashScreen.id); // Adjust based on your app's flow
          } else {
            ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Please fill in all the fields correctly")));
          }
        },
      ),
    );
  }

  Widget _buildLoginButton(BuildContext context) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1900),
      child: PrimaryButton(
        label: "Already have an account?",
        onPressed: () {
          Navigator.pushNamed(context, Login.id);
        },
      ),
    );
  }


}