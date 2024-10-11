import 'package:flutter/material.dart';

class SearchButton extends StatelessWidget {
  final String hintText;
  final ValueChanged<String> onChanged;

  const SearchButton({
    Key? key,
    required this.hintText,
    required this.onChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextField(
      onChanged: onChanged,
      decoration: InputDecoration(
        hintText: hintText,
        prefixIcon: Icon(Icons.search), // Add a search icon
        filled: true, // Enable filling
        fillColor: Color(0xFFF3F3F3), // Set fill color to #F3F3F3
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide.none, // No border
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide.none, // No border when enabled
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide.none, // No border when focused
        ),
        hintStyle: TextStyle(color: Colors.grey), // Optional: Set hint text color
      ),
    );
  }
}
