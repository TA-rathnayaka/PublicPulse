import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

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
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        height: 200,
        decoration: BoxDecoration(
          color: Colors.grey[100],
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            CircleAvatar(
              backgroundImage: AssetImage(imagePath),
              radius: 40,
            ),
            SizedBox(height: 10),
            Text(
              name,
              style: GoogleFonts.poppins(
                fontWeight: FontWeight.bold,
                fontSize: 21,
              ),
            ),
            SizedBox(height: 5),
            Text(
              email,
              style: GoogleFonts.poppins(
                color: Colors.grey,
              ),
            ),
            SizedBox(height: 5),
            Text(
              phoneNumber,
              style: GoogleFonts.poppins(
                color: Colors.grey,
              ),
            ),
          ],
        ),
      ),
    );
  }
}