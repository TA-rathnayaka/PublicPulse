import 'package:client/providers/screens_providers/navigator_provider.dart';
import 'package:flutter/material.dart';
import 'package:client/views/screens/_all.dart';
import 'package:provider/provider.dart';
import 'package:client/providers/screens_providers/siginup_validation_provider.dart'; // Import the provider for Signup
import 'package:client/providers/screens_providers/login_validation_provider.dart'; // Import the provider for Login

final routes = {
  SplashScreen.id: (context) => SplashScreen(),
  MainScreen.id: (context) => MainScreen(),
  Signup.id: (context) => ChangeNotifierProvider(
        create: (context) => SignupValidationProvider(),
        // Provide SignupValidationProvider locally
        child: Signup(),
      ),
  Login.id: (context) => ChangeNotifierProvider(
        create: (context) => LoginValidationProvider(),
        // Provide LoginValidationProvider locally
        child: Login(),
      ),
};
