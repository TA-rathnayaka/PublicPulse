import 'package:flutter/material.dart';
import 'package:client/views/constants/dashboard_list_tile_constants.dart';

class DashboardListTile extends StatelessWidget {
  final String title;
  final String description;
  final String? imageUrl;
  final VoidCallback onTap;

  const DashboardListTile({
    super.key,
    required this.title,
    required this.description,
    this.imageUrl,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Card(
        elevation: 6,
        shadowColor: Colors.black.withOpacity(0.2),
        shape: const RoundedRectangleBorder(
          borderRadius: kImageBorderRadius,
        ),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: const BoxDecoration(
            color: kCardBackgroundColor,
            borderRadius: kImageBorderRadius,
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: kImageBorderRadius,
                child: Container(
                  height: kImageContainerHeight,
                  width: kImageContainerWidth,
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.grey.shade300, width: 2),
                  ),
                  child: imageUrl != null
                      ? Image.network(
                    imageUrl!,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) =>
                        Image.asset('images/placeholder.png'),
                  )
                      : Image.asset(
                    'images/placeholder.png',
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              const SizedBox(width: kSpaceBetweenImageAndText),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      title,
                      style: kTitleTextStyle.copyWith(
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                    ),
                    const SizedBox(height: kSpaceBetweenTitleAndDescription),
                    Text(
                      description,
                      style: kDescriptionTextStyle.copyWith(
                        color: Colors.grey.shade700,
                      ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 2,
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