import 'package:flutter/material.dart';
import 'package:client/screens/poll_screen.dart'; // Ensure this import is correct

class PollCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String label;
  final String avatarLabel;
  final String imageUrl;

  const PollCard({
    Key? key,
    required this.title,
    required this.subtitle,
    required this.label,
    required this.avatarLabel,
    required this.imageUrl,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => PollScreen(
              username: avatarLabel, // You can set this to the avatar label
              avatarPath: 'path/to/avatar.jpg', // Update this with actual path
              imageUrl: imageUrl,
              title: title,
              subtitle: subtitle,
              description: subtitle, // You can change this if you have a different description
              results: {}, // Pass an empty map or actual results if available
              comments: [], // Pass an empty list or actual comments if available
            ),
          ),
        );
      },
      child: Card(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Image.network(imageUrl), // Display the poll image
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                title,
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: Text(subtitle),
            ),
          ],
        ),
      ),
    );
  }
}
