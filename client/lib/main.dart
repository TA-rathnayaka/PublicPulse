import 'package:client/models/polls_provider.dart';
import 'package:client/views/screens/_all.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:client/config/app_routes.dart';
import 'package:client/config/app_theme.dart';
import 'package:provider/provider.dart';
import 'package:client/models/navigator_provider.dart';
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
    return ChangeNotifierProvider<NavigatorProvider>(
      create: (context) {
        return NavigatorProvider();
      },
      child: MaterialApp(

        theme: KLightTheme,
        routes: routes,
      ),
    );
  }
}
