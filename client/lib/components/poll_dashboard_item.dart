import 'package:flutter/material.dart';

class PollCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String label;
  final String avatarLabel;
  final Color avatarBackgroundColor;
  final String imageUrl;

  // Constructor for PollCard to accept dynamic values
  PollCard({
    required this.title,
    required this.subtitle,
    required this.label,
    required this.avatarLabel,
    this.avatarBackgroundColor = Colors.black12,
    this.imageUrl = '', // You can provide a default image if needed
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image on the left
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              color: Colors.black12,
              borderRadius: BorderRadius.circular(8),
              image: imageUrl.isNotEmpty
                  ? DecorationImage(
                      image: NetworkImage(imageUrl),
                      fit: BoxFit.cover,
                    )
                  : null, // If imageUrl is empty, no image is shown
            ),
          ),
          SizedBox(width: 12),
          // Poll details in a column
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title, // Dynamic Title
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 4),
                Text(
                  subtitle, // Dynamic Subtitle
                  style: TextStyle(fontSize: 14, color: Colors.grey),
                ),
                SizedBox(height: 6),
                Text(
                  label, // Dynamic Label
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.black,
                  ),
                  textAlign: TextAlign.left,
                ),
                SizedBox(height: 6),
                Row(
                  children: [
                    CircleAvatar(
                      radius: 10,
                      backgroundColor:
                          avatarBackgroundColor, // Dynamic avatar color
                    ),
                    SizedBox(width: 8),
                    Text(avatarLabel), // Dynamic Avatar Label
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
