import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

<<<<<<< HEAD
=======
// The Identity widget
>>>>>>> pasindu-models
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
<<<<<<< HEAD
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: theme.cardColor,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: theme.shadowColor.withOpacity(0.1),
              blurRadius: 10,
              offset: const Offset(0, 5),
            ),
          ],
=======
        height: 200,
        decoration: BoxDecoration(
          color: theme.scaffoldBackgroundColor, // Using theme background color
          borderRadius: BorderRadius.circular(20),
>>>>>>> pasindu-models
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
<<<<<<< HEAD
            ClipOval(
              child: imagePath.startsWith('http')
                  ? Image.network(
                imagePath,
                width: 80,
                height: 80,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return Image.asset(
                    'assets/default_profile.jpg', // Fallback asset image
                    width: 80,
                    height: 80,
                    fit: BoxFit.cover,
                  );
                },
              )
                  : Image.asset(
                imagePath,
                width: 80,
                height: 80,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 15),
=======
            CircleAvatar(
              backgroundImage: AssetImage(imagePath),
              radius: 40,
            ),
            const SizedBox(height: 10),
>>>>>>> pasindu-models
            Text(
              name,
              style: GoogleFonts.poppins(
                fontWeight: FontWeight.bold,
<<<<<<< HEAD
                fontSize: 20,
                color: theme.colorScheme.onSurface,
=======
                fontSize: 21,
                color: theme.colorScheme.onSurface, // Using the primary text color from the theme
>>>>>>> pasindu-models
              ),
            ),
            const SizedBox(height: 5),
            Text(
              email,
              style: GoogleFonts.poppins(
<<<<<<< HEAD
                fontSize: 14,
                color: theme.textTheme.bodySmall?.color,
=======
                color: theme.unselectedWidgetColor, // Using the unselectedWidgetColor for muted text
>>>>>>> pasindu-models
              ),
            ),
            const SizedBox(height: 5),
            Text(
              phoneNumber,
              style: GoogleFonts.poppins(
<<<<<<< HEAD
                fontSize: 14,
                color: theme.textTheme.bodySmall?.color,
=======
                color: theme.unselectedWidgetColor, // Using the unselectedWidgetColor for muted text
>>>>>>> pasindu-models
              ),
            ),
          ],
        ),
      ),
    );
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> pasindu-models
