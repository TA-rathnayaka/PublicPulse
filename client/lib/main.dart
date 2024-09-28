import 'package:client/screens/poll_screen.dart';
import 'package:client/screens/settings.dart';
import 'package:client/screens/user_profile.dart';
import 'package:flutter/material.dart';
import 'package:client/screens/login.dart';
import 'package:client/screens/signup.dart';
import 'package:client/screens/notifications.dart';
import 'package:client/screens/poll_creation.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {
        PollScreen.id: (context) => PollScreen(),
        PollCreationScreen.id: (context) => PollCreationScreen(),
      },
    );
  }
}
