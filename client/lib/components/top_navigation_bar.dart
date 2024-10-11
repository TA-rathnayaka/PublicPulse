import 'package:flutter/material.dart';

class TopNavigationBar extends StatelessWidget implements PreferredSizeWidget {
  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.transparent, // Keep background transparent
      elevation: 0, // Remove AppBar shadow
      leading: Padding(
        padding: const EdgeInsets.all(8.0), // Add padding for better positioning
        child: Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Colors.deepPurpleAccent, // Set the background color of the button
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1), // Light shadow for depth
                spreadRadius: 2,
                blurRadius: 5,
                offset: Offset(0, 2), // Shadow position
              ),
            ],
          ),
          child: IconButton(
            icon: Icon(Icons.arrow_back_ios_new, color: Colors.white, size: 18), // Make the icon smaller
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
      ),
      title: const SizedBox.shrink(), // Remove the title for a minimalistic look
    );
  }
}
