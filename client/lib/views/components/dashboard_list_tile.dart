import 'package:flutter/material.dart';
import 'package:client/views/constants/dashboard_list_tile_constants.dart';

class DashboardListTile extends StatelessWidget {
  final String title;
  final String subtitle;
  final String imageUrl;
  final VoidCallback onTap;

  const DashboardListTile({
    Key? key,
    required this.title,
    required this.subtitle,
    required this.imageUrl,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: kDividerColor, // Change the color as needed
            width: 0.7, // Change the thickness as needed
          ),
        ),
      ),
      child: ListTile(
        contentPadding: EdgeInsets.symmetric(
          vertical: kListTileVerticalPadding,
          horizontal: kListTileHorizontalPadding,
        ),
        title: Text(
          title,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Text(subtitle),
        leading: ClipRRect(
          borderRadius: kImageBorderRadius,
          child: Container(
            width: kImageWidth,
            height: kImageHeight,
            child: FittedBox(
              fit: BoxFit.cover,
              child: Image.network(imageUrl),
            ),
          ),
        ),
        onTap: onTap,
        trailing: Icon(Icons.arrow_forward_ios, size: kTrailingIconSize),
      ),
    );
  }
}
