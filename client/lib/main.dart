import 'package:client/Providers/polls_provider.dart';
import 'package:client/views/screens/_all.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:client/config/app_routes.dart';
import 'package:client/config/app_theme.dart';
import 'package:provider/provider.dart';
import 'package:client/providers/navigator_provider.dart';
import 'package:client/providers/auth_provider.dart';
import 'package:client/models/user.dart';
import 'package:client/models/poll.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<PollsProvider>(create: (context) => PollsProvider()),
        ChangeNotifierProvider(create: (context) => MyAuthProvider())// Add your additional providers here
        // Add more providers as needed
      ],
      child: MaterialApp(
        theme: KLightTheme,
        routes: routes,
      ),
    );
  }
}

