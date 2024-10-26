import 'package:flutter/material.dart';
import 'package:client/views/constants/top_navigation_bar_constants.dart';

class TopNavigationBar extends StatelessWidget implements PreferredSizeWidget {
  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: kTopNavBarBackgroundColor,
      elevation: kTopNavBarElevation,
      leading: Padding(
        padding: kLeadingButtonPadding,
        child: Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: kLeadingButtonColor,
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
            icon: Icon(Icons.arrow_back_ios_new, color: kLeadingButtonIconColor, size: kLeadingButtonIconSize),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
      ),
      title: const SizedBox.shrink(),
    );
  }
}
