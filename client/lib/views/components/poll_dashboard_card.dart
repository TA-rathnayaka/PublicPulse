import 'package:flutter/material.dart';
import 'package:client/views/screens/poll_screen.dart';
import 'package:client/views/constants/poll_dashboard_card_constants.dart';
import 'package:client/models/poll.dart';

class PollDashBoardCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String imageUrl;

  const PollDashBoardCard({
    super.key,
    required this.title,
    required this.subtitle,
    required this.imageUrl,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => PollScreen(
              poll: Poll(
                title: title, // replace with actual title
                description: subtitle, // replace with actual subtitle or description
                imageUrl: imageUrl, // replace with actual imageUrl
                options: [], // replace with actual options if available
                createDate: DateTime.now(), // replace with actual createDate if needed
                duration: const Duration(days: 7), // example duration
              ), // Pass actual comments if available
            ),
          ),
        );
      },
      child: Card(
        elevation: kCardElevationPollDashBoardCard, // Use extracted elevation
        shape: const RoundedRectangleBorder(
          borderRadius: kCardBorderRadiusPollDashBoardCard, // Rounded corners
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0), // Adjust padding
          child: Row(
            children: [
              // Left side image (network image or asset image)
              ClipRRect(
                borderRadius: kCardBorderRadiusPollDashBoardCard, // Rounded corners for the image
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
                      style: kTitleTextStylePollDashBoardCard, // Use extracted title text style
                    ),
                    const SizedBox(height: 8), // Spacing between title and subtitle
                    Text(
                      subtitle,
                      style: kSubtitleTextStylePollDashBoardCard, // Use extracted subtitle text style
                    ),
                    const SizedBox(height: 16), // Space between subtitle and button
                    ElevatedButton(
                      onPressed: () {
                        // Add button action here
                      },
                      style: ElevatedButton.styleFrom(
                        side: kButtonBorderSidePollDashBoardCard, // Use extracted button border style
                        backgroundColor: kButtonBackgroundColorPollDashBoardCard, // Use extracted button background
                        shape: const RoundedRectangleBorder(
                          borderRadius: kButtonBorderRadiusPollDashBoardCard, // Use extracted button border radius
                        ),
                        padding: kButtonPaddingPollDashBoardCard, // Use extracted button padding
                      ),
                      child: const Text(
                        'View Policy',
                        style: kButtonTextStylePollDashBoardCard, // Use extracted button text style
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
