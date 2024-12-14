import 'package:flutter/material.dart';

// Colors

const double kPaddingHorizontal = 12.0;
const double kPaddingVertical = 16.0;
const double kSizedBoxHeight = 16.0;
const double kButtonRadius = 10.0;
const double kAppBarTitleSpacing = 8.0;

// Colors
const Color kPrimaryColor = Color(0xFF4A3AFF);
const Color kSecondaryColor = Color(0xff673AB7);
const Color kCommonGrayColor = Color(0xFFF3F3F3);
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

const InputDecoration kTextFieldDecoration = InputDecoration(
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


