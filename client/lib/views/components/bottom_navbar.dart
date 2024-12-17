import 'package:flutter/material.dart';

class BottomNavbar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;
  final List<BottomNavbarItem> items;
  final double iconSize;
  final double elevation;
  final double borderRadius;

  const BottomNavbar({
    super.key,
    required this.currentIndex,
    required this.onTap,
    required this.items,
    this.iconSize = 28.0,
    this.elevation = 10.0,
    this.borderRadius = 24.0,
  });

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    final Color backgroundColor = theme.scaffoldBackgroundColor;
    final Color selectedItemColor = theme.primaryColor;
    final Color unselectedItemColor = theme.unselectedWidgetColor;

    return Container(
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(borderRadius),
          topRight: Radius.circular(borderRadius),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            blurRadius: elevation,
            spreadRadius: 1,
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(borderRadius),
          topRight: Radius.circular(borderRadius),
        ),
        child: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          backgroundColor: backgroundColor,
          elevation: 0,
          currentIndex: currentIndex,
          onTap: onTap,
          selectedItemColor: selectedItemColor, // Set the selected item color explicitly
          unselectedItemColor: unselectedItemColor, // Set the unselected item color explicitly
          showSelectedLabels: false,
          showUnselectedLabels: false,
          items: items.map((item) {
            return _buildNavItem(context, item.icon, item.index);
          }).toList(),
        ),
      ),
    );
  }

  BottomNavigationBarItem _buildNavItem(BuildContext context, IconData icon, int index) {
    return BottomNavigationBarItem(
      icon: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.all(12), // Slightly larger padding for better touch target
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(
          icon,
          size: iconSize,
          color: currentIndex == index
              ? Theme.of(context).primaryColor // Ensure selected color is set
              : Theme.of(context).unselectedWidgetColor, // Ensure unselected color is set
        ),
      ),
      label: '',
    );
  }
}

class BottomNavbarItem {
  final IconData icon;
  final int index;

  BottomNavbarItem({required this.icon, required this.index});
}