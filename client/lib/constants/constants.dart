import 'package:flutter/material.dart';

// Colors
const Color kResultCardGreyColor = Color(0xFFB0BEC5); // Original border color for ResultCard
const Color kResultCardWhiteColor = Color(0xFFFFFFFF);
const Color kDashBackgroundColor = Color(0xFFF5F5F5);
const Color kDashPrimaryColor = Color(0xFF6200EE);
const double kDashAppBarTitleSpacing = 10.0;
const double kDashPaddingHorizontal = 16.0; // White color for ResultCard

// Sizes
const double kResultCardPadding = 10.0; // Padding for ResultCard
const double kResultCardBorderRadius = 8.0; // Border radius for ResultCard

// Text Styles
const TextStyle kResultCardTitleStyle = TextStyle(fontSize: 14); // Original title style for ResultCard
const TextStyle kResultCardPercentageStyle = TextStyle(fontSize: 16, fontWeight: FontWeight.bold); // Original percentage style for ResultCard


const double kPaddingHorizontal = 12.0;
const double kSizedBoxHeight = 16.0;
const double kButtonRadius = 10.0;
const double kAppBarTitleSpacing = 8.0;

// Colors
const Color kPrimaryColor = Color(0xFF4A3AFF); // Example color
const Color kBackgroundColor = Color(0xFFF6F6F6); // Light grey background
const Color kTextFieldBackgroundColor =
    Color(0xFFEEEEEE); // Text field background

// Text Styles
const TextStyle kHeadlineStyle = TextStyle(
  fontSize: 24,
  fontWeight: FontWeight.bold,
  color: Colors.black,
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
    borderRadius: BorderRadius.all(Radius.circular(8.0)),
    borderSide: BorderSide.none,
  ),
);
