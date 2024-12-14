import 'package:flutter/material.dart';

final ThemeData kLightTheme = ThemeData(
  primaryColor: const Color(0xFF1F2937), // Slate Gray for modern elegance
  scaffoldBackgroundColor: const Color(0xFFF5F5F5), // Clean, neutral background
  unselectedWidgetColor: Colors.grey[600], // Muted gray for unselected items
  appBarTheme: const AppBarTheme(
    backgroundColor: Color(0xFFF5F5F5),
    iconTheme: IconThemeData(color: Color(0xFF1F2937)),
    titleTextStyle: TextStyle(
      color: Color(0xFF1F2937),
      fontSize: 20,
      fontWeight: FontWeight.w600,
    ),
    elevation: 1, // Subtle elevation for the app bar
  ),
  textTheme: const TextTheme(
    bodyMedium: TextStyle(
      color: Color(0xFF374151), // Darker gray for better contrast
      fontSize: 16,
      fontWeight: FontWeight.w400, // Light weight for easy reading
    ),
  ),
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: Colors.white,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10), // Softer corners for a refined look
      borderSide: BorderSide(color: Color(0xFF1F2937)), // Matching primary color for consistency
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: Color(0xFF9CA3AF)),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: Color(0xFF1F2937), width: 1.5),
    ),
  ),
  colorScheme: const ColorScheme.light(
    primary: Color(0xFF1F2937),
    secondary: Color(0xFF4B5563),
    surface: Colors.white,
    onSurface: Color(0xFF1F2937),
  ),
);

final ThemeData kDarkTheme = ThemeData(
  primaryColor: const Color(0xFFD1D5DB), // Soft Light Gray for contrast
  scaffoldBackgroundColor: const Color(0xFF111827), // Rich dark background
  unselectedWidgetColor: Colors.grey[700], // Muted gray for unselected elements
  appBarTheme: const AppBarTheme(
    backgroundColor: Color(0xFF111827),
    iconTheme: IconThemeData(color: Color(0xFFE5E7EB)),
    titleTextStyle: TextStyle(
      color: Color(0xFFE5E7EB),
      fontSize: 20,
      fontWeight: FontWeight.w600,
    ),
    elevation: 1, // Slight elevation for depth
  ),
  textTheme: const TextTheme(
    bodyMedium: TextStyle(
      color: Color(0xFFE5E7EB), // Lighter text for dark mode readability
      fontSize: 16,
      fontWeight: FontWeight.w400,
    ),
  ),
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: Color(0xFF1F2937),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10), // Consistent border radius
      borderSide: BorderSide(color: Color(0xFFD1D5DB)), // Light gray for contrast
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: Color(0xFF9CA3AF)),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: Color(0xFFD1D5DB), width: 1.5),
    ),
  ),
  colorScheme: const ColorScheme.dark(
    primary: Color(0xFFD1D5DB),
    secondary: Color(0xFF9CA3AF),
    surface: Color(0xFF1F2937),
    onSurface: Color(0xFFE5E7EB),
  ),
);