import 'package:client/views/screens/_all.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:client/config/app_routes.dart';
import 'package:client/config/app_theme.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) {

      },
      child: MaterialApp(
        theme: KLightTheme,
        routes: routes,
      ),
    );
  }
}
