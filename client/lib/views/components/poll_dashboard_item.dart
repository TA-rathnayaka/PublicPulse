import 'package:flutter/material.dart';
import 'package:client/views/screens/poll_screen.dart';
import 'package:client/views/constants/poll_dashboard_item.dart';

class PollCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String label;
  final String avatarLabel;
  final Color avatarBackgroundColor;
  final String imageUrl;

  PollCard({
    required this.title,
    required this.subtitle,
    required this.label,
    required this.avatarLabel,
    this.avatarBackgroundColor = kAvatarBackgroundColorPollCard,
    this.imageUrl = '',
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        Navigator.pushNamed(context, PollScreen.id);
      },
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.all(16.0),
        shape: RoundedRectangleBorder(
          borderRadius: kBorderRadiusPollCard,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.only(bottom: 16.0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: kContainerBackgroundColorPollCard,
                borderRadius: kImageBorderRadiusPollCard,
                image: imageUrl.isNotEmpty
                    ? DecorationImage(
                  image: NetworkImage(imageUrl),
                  fit: BoxFit.cover,
                )
                    : null,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: kTitleTextStylePollCard,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: kSubtitleTextStylePollCard,
                  ),
                  const SizedBox(height: 6),
                  Text(
                    label,
                    style: kLabelTextStylePollCard,
                    textAlign: TextAlign.left,
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 10,
                        backgroundColor: avatarBackgroundColor,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        avatarLabel,
                        style: kAvatarLabelTextStylePollCard,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
