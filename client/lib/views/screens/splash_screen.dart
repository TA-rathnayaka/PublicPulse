import 'package:flutter/material.dart';
import 'package:client/views/screens/_all.dart';
import 'package:client/services/auth_service.dart';
import 'package:provider/provider.dart';
import 'package:client/providers/screens_providers/login_validation_provider.dart'; // Import the provider

class SplashScreen extends StatelessWidget {
  static String id = '/';
  final AuthService authService = AuthService();

  SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => LoginValidationProvider(), // Add LoginValidationProvider here
      child: Material(
        child: StreamBuilder(
          stream: authService.userStream,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            }

            // Check if the user is logged in
            if (snapshot.hasData) {
              // If the user is logged in, navigate to the MainScreen
              WidgetsBinding.instance.addPostFrameCallback((_) {
                Navigator.pushReplacementNamed(context, MainScreen.id);
              });
              return Container(); // Return empty container while navigation happens
            } else {
              // If the user is not logged in, navigate to the Login screen
              WidgetsBinding.instance.addPostFrameCallback((_) {
                Navigator.pushReplacementNamed(context, Login.id);
              });
              return Container(); // Return empty container while navigation happens
            }
          },
        ),
      ),
    );
  }
}