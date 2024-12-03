import 'package:flutter/material.dart';
import 'package:client/views/screens/_all.dart';

final routes = {
  SplashScreen.id: (context) => SplashScreen(),
  Dashboard.id: (context) => Dashboard(),
  PollCreationScreen.id: (context) => PollCreationScreen(),
  Signup.id: (context) => Signup(),
  Login.id: (context) => Login(),
};
