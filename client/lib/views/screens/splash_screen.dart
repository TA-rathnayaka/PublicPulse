import 'package:client/models/polls_provider.dart';
import 'package:flutter/material.dart';
import 'package:client/views/screens/_all.dart';
import 'package:client/services/auth.dart';
import 'package:provider/provider.dart';

class SplashScreen extends StatelessWidget {
  static String id = '/';
  final AuthService authService = AuthService();

  @override
  Widget build(BuildContext context) {
    return Material(
      child: StreamBuilder(
        stream: authService.userStream,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasData) {
            return ChangeNotifierProvider<PollsProvider>(
              create: (context) => PollsProvider(),
              child: MainScreen(),
            );
          } else {
            // User is not logged in
            return Login();
          }
        },
      ),
    );
    ;
  }
}
