import 'package:flutter/material.dart';
import 'package:client/views/constants/top_navigation_bar_constants.dart';

class TopNavigationBar extends StatelessWidget implements PreferredSizeWidget {
  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Navigator.canPop(context)
          ? kTopNavBarBackgroundColor
          : Colors.transparent, // Set background transparent if no back button
      elevation: Navigator.canPop(context) ? kTopNavBarElevation : 0, // Remove elevation if no back button
      leading: Navigator.canPop(context)
          ? Padding(
        padding: kLeadingButtonPadding,
        child: Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: kLeadingButtonColor, // The button itself has a color
            boxShadow: [
              BoxShadow(
                color: kLeadingButtonShadowColor.withOpacity(kLeadingButtonShadowOpacity),
                spreadRadius: kLeadingButtonShadowSpreadRadius,
                blurRadius: kLeadingButtonShadowBlurRadius,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: IconButton(
            icon: Icon(
              Icons.arrow_back_ios_new,
              color: kLeadingButtonIconColor,
              size: kLeadingButtonIconSize,
            ),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
      )
          : null, // Only show back button if there's a screen to pop
      title: const SizedBox.shrink(),
    );
  }
}