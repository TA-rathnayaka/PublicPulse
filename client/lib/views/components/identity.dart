import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

// The Identity widget
class Identity extends StatelessWidget {
  final String imagePath;
  final String name;
  final String email;
  final String phoneNumber;
  final VoidCallback? onTap;

  const Identity({
    super.key,
    required this.imagePath,
    required this.name,
    required this.email,
    required this.phoneNumber,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context); // Get the current theme

    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        height: 200,
        decoration: BoxDecoration(
          color: theme.scaffoldBackgroundColor, // Using theme background color
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Conditional display for image or icon
            CircleAvatar(
              backgroundImage: imagePath.isNotEmpty
                  ? NetworkImage(imagePath) // Use NetworkImage for URL
                  : null, // Use no image if path is empty
              radius: 40,
              child: imagePath.isEmpty
                  ? Icon(
                Icons.person,
                size: 40,
                color: theme.colorScheme.onSurface,
              ) // Show an icon if the image path is empty
                  : null, // No icon if the image is not empty
            ),







            const SizedBox(height: 10),
            Text(
              name,
              style: GoogleFonts.poppins(
                fontWeight: FontWeight.bold,
                fontSize: 21,
                color: theme.colorScheme.onSurface, // Using the primary text color from the theme
              ),
            ),
            const SizedBox(height: 5),
            Text(
              email,
              style: GoogleFonts.poppins(
                color: theme.unselectedWidgetColor, // Using the unselectedWidgetColor for muted text
              ),
            ),
            const SizedBox(height: 5),
            Text(
              phoneNumber,
              style: GoogleFonts.poppins(
                color: theme.unselectedWidgetColor, // Using the unselectedWidgetColor for muted text
              ),
            ),
          ],
        ),
      ),
    );
  }
}