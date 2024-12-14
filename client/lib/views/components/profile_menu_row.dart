import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

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

    return GestureDetector(
      onTap: widget.onTap ?? showSnackbar, // Use the provided onTap or default to showSnackbar
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 20),
        color: backgroundColor, // Apply the current theme's background color
        child: Row(
          children: [
            Icon(widget.icon, size: 30),
            const SizedBox(width: 20),
            Text(
              widget.text,
              style: GoogleFonts.poppins(
                fontSize: 17,
              ),
            ),
          ],
        ),
      ),
    );
  }
}