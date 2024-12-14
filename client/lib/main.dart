import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:client/config/app_routes.dart';
import 'package:client/config/app_theme.dart';
import 'package:provider/provider.dart';
import 'package:client/providers/auth_provider.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<MyAuthProvider>(create: (context) => MyAuthProvider()),
      ],
      child: MaterialApp(
        theme: KLightTheme,
        routes: routes,
      ),
    );
  }
}

