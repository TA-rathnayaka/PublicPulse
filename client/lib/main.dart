import 'package:client/screens/poll_dashboard.dart';
import 'package:client/screens/poll_creation.dart';
import 'package:flutter/material.dart';
import 'package:client/constants/constants.dart';
import 'package:client/screens/login.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: KLightTheme,
      home: Login(),
      // routes: {
      //   PollDashboardScreen.id: (context) => PollDashboardScreen(),
      //   PollCreationScreen.id: (context) => PollCreationScreen(),
      // },
    );
  }
}
