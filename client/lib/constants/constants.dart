import 'package:flutter/material.dart';

// Colors

const double kPaddingHorizontal = 12.0;
const double kSizedBoxHeight = 16.0;
const double kButtonRadius = 10.0;
const double kAppBarTitleSpacing = 8.0;

// Colors
const Color kPrimaryColor = Color(0xFF4A3AFF);
const Color kSecondaryColor = Color(0xff673AB7);
const Color kBackgroundColor = Colors.white;

const Color kTextFieldBackgroundColor = Color(0xFFF3F3F3);
const Color kTextFieldHintColor = Colors.grey;

const kBorderRadius = BorderRadius.all(Radius.circular(15));

// Text Styles
const TextStyle kHeadlineStyle = TextStyle(
  fontSize: 24,
  fontWeight: FontWeight.bold,
  color: Colors.black,
);

final InputDecoration kTextFieldDecoration = InputDecoration(
  filled: true,
  fillColor: kTextFieldBackgroundColor,
  border: OutlineInputBorder(
    borderRadius: kBorderRadius,
    borderSide: BorderSide.none,
  ),
  enabledBorder: OutlineInputBorder(
    borderRadius: kBorderRadius,
    borderSide: BorderSide.none,
  ),
  focusedBorder: OutlineInputBorder(
    borderRadius: kBorderRadius,
    borderSide: BorderSide.none,
  ),
  hintStyle: TextStyle(
    color: kTextFieldHintColor,
  ),
);

const TextStyle kButtonTextStyle = TextStyle(
  fontSize: 18,
  fontWeight: FontWeight.bold,
  color: Colors.white,
);

const InputDecoration kInputDecoration = InputDecoration(
  hintText: 'Write Here',
  filled: true,
  fillColor: kTextFieldBackgroundColor,
  border: OutlineInputBorder(
    borderRadius: kBorderRadius,
    borderSide: BorderSide.none,
  ),
);

const TextStyle kInputHintTextStyle = TextStyle(color:kTextFieldHintColor);

final ThemeData KLightTheme = ThemeData(
  primaryColor: Colors.white,
  scaffoldBackgroundColor: Colors.white,
  appBarTheme: const AppBarTheme(
    backgroundColor: Colors.white,
    iconTheme: IconThemeData(color: Colors.black),
    titleTextStyle: TextStyle(
      color: Colors.black,
      fontSize: 20,
      fontWeight: FontWeight.bold,
    ),
  ),
  textTheme: const TextTheme(
    bodyMedium: TextStyle(color: Colors.black),
  ),
  colorScheme: ColorScheme.fromSwatch().copyWith(
    primary: Colors.white,
    secondary: Colors.black,
    background: Colors.white,
  ),
);

final ThemeData KDarkTheme = ThemeData(
  primaryColor: Colors.black,
  scaffoldBackgroundColor: Colors.black,
  appBarTheme: const AppBarTheme(
    backgroundColor: Colors.black,
    iconTheme: IconThemeData(color: Colors.white),
    titleTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 20,
      fontWeight: FontWeight.bold,
    ),
  ),
  textTheme: const TextTheme(
    bodyMedium: TextStyle(color: Colors.white),
  ),
  colorScheme: ColorScheme.fromSwatch().copyWith(
    primary: Colors.black,
    secondary: Colors.white,
  ),
);
