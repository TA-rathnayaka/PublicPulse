
import 'package:flutter/material.dart';
import 'package:client/config/app_routes.dart';
import 'package:client/config/app_theme.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: KLightTheme,
      // home: Signup(),
      routes: routes,
    );
  }
}
