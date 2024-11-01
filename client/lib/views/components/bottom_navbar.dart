import 'package:client/views/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:client/views/constants/bottom_navbar_constants.dart';

class BottomNavbar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;

  const BottomNavbar({
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          backgroundColor: kCommonGrayColor, // Match navbar color
          elevation: 0,
          currentIndex: currentIndex,
          onTap: onTap,
          selectedItemColor: kSelectedItemColorBottomNavbar,
          unselectedItemColor: kUnselectedItemColorBottomNavbar,
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home, size: 20),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.bar_chart, size: 20),
              label: 'Poll',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.notifications, size: 20),
              label: 'Notification',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person, size: 20),
              label: 'Profile',
            ),
          ],
        ),

      ],
    );
  }
}
