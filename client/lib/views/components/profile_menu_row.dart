import 'package:flutter/material.dart';

class MenuRow extends StatefulWidget {
  final IconData icon;
  final String text;
  final VoidCallback? onTap; // Optional onTap callback

  const MenuRow({
    super.key,
    required this.icon,
    required this.text,
    this.onTap, // Optional parameter
  });

  @override
  State<MenuRow> createState() => _MenuRowState();
}

class _MenuRowState extends State<MenuRow> {
  void showSnackbar() {
    const snackBar = SnackBar(
      content: Text("Not available for the moment"),
    );
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  @override
  Widget build(BuildContext context) {
    // Get the current theme's background color
    final backgroundColor = Theme.of(context).scaffoldBackgroundColor;
    final textColor = Theme.of(context).textTheme.bodyLarge?.color ?? Colors.black;

    return GestureDetector(
      onTap: widget.onTap ?? showSnackbar, // Use the provided onTap or default to showSnackbar
      child: Material(
        color: Colors.transparent, // Transparent background to allow custom background color
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20), // Increased horizontal padding for better touch targets
          color: backgroundColor, // Apply the current theme's background color
          child: Row(
            children: [
              Icon(
                widget.icon,
                size: 30,
                color: textColor.withOpacity(0.8), // Adjust icon color to match the theme
              ),
              const SizedBox(width: 16), // Consistent spacing between icon and text
              Text(
                widget.text,
                style: TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.w500, // Slightly bolder text for better readability
                  color: textColor, // Ensure text color matches the theme
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}