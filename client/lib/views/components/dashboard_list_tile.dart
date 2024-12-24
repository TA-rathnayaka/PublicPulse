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
      child: Material(
        color: Colors.transparent,
        child: Card(
          elevation: 4,  // Reduced elevation for a cleaner, softer look
          shadowColor: theme.shadowColor.withOpacity(0.2), // Softer shadow for a more refined separation
          shape: const RoundedRectangleBorder(
            borderRadius: kImageBorderRadius,
          ),
          color: theme.colorScheme.surface, // Use surface color for a clean look
          child: Container(
            padding: const EdgeInsets.all(16), // Slightly reduced padding for compactness
            decoration: BoxDecoration(
              color: theme.colorScheme.surface, // Consistent with the card color
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
                        color: Colors.transparent,
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
                          fontWeight: FontWeight.w600,  // Semi-bold for better prominence
                          fontSize: 18,
                          color: theme.colorScheme.primary, // Strong contrast for title
                        ),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                      const SizedBox(height: kSpaceBetweenTitleAndDescription),
                      Text(
                        description,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          fontSize: 14,  // Slightly smaller font for description
                          color: theme.colorScheme.secondary, // Lighter color for secondary text
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
      ),
    );
  }
}