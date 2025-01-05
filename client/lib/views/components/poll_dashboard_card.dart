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
                title: title,
                description: subtitle,
                imageUrl: imageUrl,
                options: [],
                // Replace with actual options if available
                createDate: DateTime.now(),
                duration: const Duration(days: 7), // Example duration
              ),
            ),
          ),
        );
      },
      child: Card(
        elevation: kCardElevationPollDashBoardCard,
        shape: const RoundedRectangleBorder(
          borderRadius: kCardBorderRadiusPollDashBoardCard,
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              // Left side image (network image or asset image)
              ClipRRect(
                borderRadius: kCardBorderRadiusPollDashBoardCard,
                child: SizedBox(
                  width: 120, // Set image width
                  height: 120, // Set image height
                  child: Image.network(
                    imageUrl,
                    fit: BoxFit.contain,
                    alignment: Alignment.centerLeft,
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
                      style:
                          kTitleTextStylePollDashBoardCard, // Ensure text is legible and accessible
                    ),
                    const SizedBox(height: 8),
                    // Spacing between title and subtitle
                    Text(
                      subtitle,
                      style: kSubtitleTextStylePollDashBoardCard,
                    ),
                    const SizedBox(height: 16),
                    // Space between subtitle and button
                    ElevatedButton(
                      onPressed: () {
                        // Add button action here
                      },
                      style: ElevatedButton.styleFrom(
                        side: kButtonBorderSidePollDashBoardCard,
                        backgroundColor:
                            kButtonBackgroundColorPollDashBoardCard,
                        shape: const RoundedRectangleBorder(
                          borderRadius: kButtonBorderRadiusPollDashBoardCard,
                        ),
                        padding: kButtonPaddingPollDashBoardCard,
                      ),
                      child: const Text(
                        'View Policy',
                        style:
                            kButtonTextStylePollDashBoardCard, // Ensure text is large and readable
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
