import 'package:client/screens/poll_dashboard.dart';
import 'package:client/screens/poll_creation.dart';
import 'package:flutter/material.dart';
import 'package:client/constants/constants.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: KLightTheme,
      routes: {
        PollDashboardScreen.id: (context) => PollDashboardScreen(),
        PollCreationScreen.id: (context) => PollCreationScreen(),
      },
    );
  }
}
