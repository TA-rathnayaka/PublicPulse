import 'package:flutter/material.dart';

class BottomNavbar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;
  final List<BottomNavbarItem> items;
  final double iconSize;
  final Color backgroundColor;
  final Color selectedItemColor;
  final Color unselectedItemColor;
  final double elevation;
  final double borderRadius;

  const BottomNavbar({
    required this.currentIndex,
    required this.onTap,
    required this.items,
    this.iconSize = 28.0,
    this.backgroundColor = const Color(0xFFF5F5F5), // Default background color
    this.selectedItemColor = const Color(0xFF6200EE), // Default selected item color
    this.unselectedItemColor = const Color(0xFF9E9E9E), // Default unselected item color
    this.elevation = 10.0, // Default elevation
    this.borderRadius = 24.0, // Default border radius
  });

  @override
  Widget build(BuildContext context) {
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
          showSelectedLabels: false,
          showUnselectedLabels: false,
          items: items.map((item) {
            return _buildNavItem(item.icon, item.index);
          }).toList(),
        ),
      ),
    );
  }

  BottomNavigationBarItem _buildNavItem(IconData icon, int index) {
    return BottomNavigationBarItem(
      icon: AnimatedContainer(
        duration: Duration(milliseconds: 200),
        padding: EdgeInsets.all(8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(
          icon,
          size: iconSize,
          color: currentIndex == index
              ? selectedItemColor
              : unselectedItemColor,
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