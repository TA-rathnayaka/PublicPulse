import 'package:flutter/material.dart';

final ThemeData kLightTheme = ThemeData(
  primaryColor: const Color(0xFF1F2937), // Slate Gray for a modern, professional touch
  scaffoldBackgroundColor: const Color(0xFFF5F5F5), // Soft, neutral background
  unselectedWidgetColor: Colors.grey[500], // Muted gray for unselected elements
  appBarTheme: const AppBarTheme(
    backgroundColor: Color(0xFFF5F5F5),
    iconTheme: IconThemeData(color: Color(0xFF1F2937)), // Slate Gray for icons
    titleTextStyle: TextStyle(
      color: Color(0xFF1F2937),
      fontSize: 20, // Same font size for consistency
      fontWeight: FontWeight.w600,
    ),
    elevation: 0,
  ),
  textTheme: const TextTheme(
    bodyMedium: TextStyle(
      color: Color(0xFF374151), // Darker gray for readable body text
      fontSize: 16, // Same font size for body text
    ),
  ),
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: Colors.white,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8), // Consistent border radius
      borderSide: BorderSide(color: Color(0xFF1F2937)), // Primary color for borders
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(color: Color(0xFF9CA3AF)), // Muted gray for enabled state
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(color: Color(0xFF1F2937), width: 1.5), // Focused border with consistent width
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
  primaryColor: const Color(0xFFD1D5DB), // Light Gray for subtle contrast
  scaffoldBackgroundColor: const Color(0xFF111827), // Dark Navy for a rich background
  unselectedWidgetColor: Colors.grey[600], // Slightly darker gray for unselected elements
  appBarTheme: const AppBarTheme(
    backgroundColor: Color(0xFF111827),
    iconTheme: IconThemeData(color: Color(0xFFE5E7EB)),
    titleTextStyle: TextStyle(
      color: Color(0xFFE5E7EB),
      fontSize: 20, // Same font size as light theme
      fontWeight: FontWeight.w600,
    ),
    elevation: 0,
  ),
  textTheme: const TextTheme(
    bodyMedium: TextStyle(
      color: Color(0xFFE5E7EB), // Light Gray for readable body text
      fontSize: 16, // Same font size for body text
    ),
  ),
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: Color(0xFF1F2937), // Darker fill color for dark theme
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8), // Consistent border radius
      borderSide: BorderSide(color: Color(0xFFD1D5DB)), // Light gray border for consistency
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(color: Color(0xFF9CA3AF)),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(color: Color(0xFFD1D5DB), width: 1.5), // Focused border with consistent width
    ),
  ),
  colorScheme: const ColorScheme.dark(
    primary: Color(0xFFD1D5DB),
    secondary: Color(0xFF9CA3AF),
    surface: Color(0xFF1F2937),
    onSurface: Color(0xFFE5E7EB),
  ),
);