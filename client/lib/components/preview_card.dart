import 'package:flutter/material.dart';
import 'package:client/constants/preview_card_constants.dart';

class PreviewCard extends StatelessWidget {
  final String username;
  final String avatarPath;
  final String title;
  final String subTitle;
  final String description;
  final String imageUrl;

  const PreviewCard({
    Key? key,
    required this.username,
    required this.avatarPath,
    required this.title,
    required this.subTitle,
    required this.description,
    required this.imageUrl,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: kCardClipBehaviorPreviewCard,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, // Align all content to the start (left)
        children: [
          // User info with avatar and username
          ListTile(
            leading: CircleAvatar(
              backgroundImage: AssetImage(avatarPath),
              radius: kAvatarRadiusPreviewCard,
            ),
            title: Text(username, style: kUsernameStylePreviewCard),
            trailing: Icon(Icons.more_vert),
          ),

          // Image displayed with fixed size
          Container(
            height: kImageHeightPreviewCard,
            width: double.infinity,
            child: Image.network(
              imageUrl,
              fit: BoxFit.cover,
            ),
          ),

          Padding(
            padding: kCardPaddingPreviewCard,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: kTitleStylePreviewCard,
                  textAlign: TextAlign.left, // Align title to the left
                ),
                SizedBox(height: 4),
                Text(
                  subTitle,
                  style: kSubTitleStylePreviewCard,
                  textAlign: TextAlign.left, // Align subtitle to the left
                ),
              ],
            ),
          ),

          // Main description or caption below
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              description,
              style: kDescriptionStylePreviewCard,
              textAlign: TextAlign.left, // Align description to the left
            ),
          ),

          // Tags or hashtags at the bottom
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Row(
              children: [
                Chip(label: Text("#OpinionPolls", style: kChipLabelStylePreviewCard)),
                SizedBox(width: kChipSpacingPreviewCard.horizontal),
                Chip(label: Text("#SummerActivities", style: kChipLabelStylePreviewCard)),
              ],
            ),
          )
        ],
      ),
    );
  }
}
