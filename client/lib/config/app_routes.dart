import 'package:flutter/material.dart';
import 'package:client/views/screens/_all.dart';
import 'package:provider/provider.dart';
import 'package:client/providers/siginup_validation_provider.dart'; // Import the provider for Signup
import 'package:client/providers/login_validation_provider.dart'; // Import the provider for Login

final routes = {
  SplashScreen.id: (context) => SplashScreen(),
  Dashboard.id: (context) => Dashboard(),
  PollCreationScreen.id: (context) => PollCreationScreen(),
  Signup.id: (context) => ChangeNotifierProvider(
    create: (context) => SignupValidationProvider(), // Provide SignupValidationProvider locally
    child: Signup(),
  ),
  Login.id: (context) => ChangeNotifierProvider(
    create: (context) => LoginValidationProvider(), // Provide LoginValidationProvider locally
    child: Login(),
  ),
};