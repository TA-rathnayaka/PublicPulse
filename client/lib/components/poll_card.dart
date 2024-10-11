import 'package:flutter/material.dart';
import 'package:client/screens/poll_screen.dart'; // Ensure this import is correct

class PollCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String imageUrl;

  const PollCard({
    Key? key,
    required this.title,
    required this.subtitle,
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
              username: "",
              avatarPath: "",
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
        elevation: 4, // Add elevation for a more prominent card
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16), // Rounded corners
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0), // Adjust padding
          child: Row(
            children: [
              // Left side image (network image or asset image)
              ClipRRect(
                borderRadius: BorderRadius.circular(16), // Rounded corners for the image
                child: SizedBox(
                  width: 120, // Set image width
                  height: 120, // Set image height
                  child: Image.network(
                    imageUrl,
                    fit: BoxFit.contain, // Ensure the image fits inside without distortion
                    alignment: Alignment.centerLeft, // Align image to the left
                  ),
                ),
              ),
              const SizedBox(width: 16), // Spacing between image and text
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 18, // Adjust font size
                      ),
                    ),
                    const SizedBox(height: 8), // Spacing between title and subtitle
                    Text(
                      subtitle,
                      style: const TextStyle(
                        fontSize: 14, // Adjust font size
                        color: Colors.black, // Subtle color for the subtitle
                      ),
                    ),
                    const SizedBox(height: 16), // Space between subtitle and button
                    ElevatedButton(
                      onPressed: () {
                        // Add button action here
                      },
                      style: ElevatedButton.styleFrom(
                        side: const BorderSide(color: Colors.deepPurpleAccent, width: 2), // Border color
                        backgroundColor: Colors.white, // White background
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16), // Rounded corners for button
                        ),
                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12), // Button padding
                      ),
                      child: const Text(
                        'View Policy',
                        style: TextStyle(
                          color: Colors.deepPurpleAccent, // Text color
                          fontWeight: FontWeight.bold,
                          fontSize: 15, // Adjust font size
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
