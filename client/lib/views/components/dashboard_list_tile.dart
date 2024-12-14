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
    final ThemeData theme = Theme.of(context); // Get the current theme

    return GestureDetector(
      onTap: onTap,
      child: Card(
        elevation: 8, // Slightly higher elevation to create separation
        shadowColor: theme.shadowColor.withOpacity(0.4), // Adding more shadow to separate card
        shape: const RoundedRectangleBorder(
          borderRadius: kImageBorderRadius,
        ),
        color: theme.colorScheme.surface, // Set the card color to 'surface' for better distinction
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: theme.colorScheme.surface, // Match container color to card color for consistency
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
                    border: Border.all(
                      color: Colors.transparent, // Border color for the image
                      width: 1,
                    ),
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
                      style: theme.textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                        color: theme.colorScheme.primary, // Title text color
                      ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                    ),
                    const SizedBox(height: kSpaceBetweenTitleAndDescription),
                    Text(
                      description,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.colorScheme.secondary, // Description text color
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