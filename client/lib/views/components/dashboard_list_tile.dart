import 'package:flutter/material.dart';
import 'package:client/views/constants/dashboard_list_tile_constants.dart';

class DashboardListTile extends StatelessWidget {
  final String title;
  final String description;
  final String? imageUrl;
  final VoidCallback onTap;

  const DashboardListTile({
    Key? key,
    required this.title,
    required this.description,
    this.imageUrl,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector( // Use GestureDetector to detect taps
      onTap: onTap, // Call the onTap callback when tapped
      child: Card(
        color: kCardBackgroundColor, // Use the background color constant
        shape: RoundedRectangleBorder(
          borderRadius: kImageBorderRadius,
        ),
        child: Container(
          margin: EdgeInsets.all(kCardMargin),
          height: kImageContainerHeight,
          child: Row(
            children: [
              ClipRRect(
                borderRadius: kImageBorderRadius,
                child: Container(
                  height: kImageContainerHeight,
                  width: kImageContainerWidth,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: imageUrl != null
                          ? NetworkImage(imageUrl!)
                          : AssetImage('images/placeholder.png'), // Fixed path without leading './'
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              SizedBox(width: kSpaceBetweenImageAndText),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      title,
                      style: kTitleTextStyle,
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                    ),
                    SizedBox(height: kSpaceBetweenTitleAndDescription),
                    Flexible(
                      child: Text(
                        description,
                        style: kDescriptionTextStyle,
                        overflow: TextOverflow.ellipsis,
                        maxLines: 2,
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
