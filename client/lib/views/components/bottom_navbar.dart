import 'package:client/views/constants/bottom_navbar_constants.dart';
import 'package:flutter/material.dart';

class BottomNavbar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;

  const BottomNavbar({
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black, // Set background color for the navbar
      child: BottomNavigationBar(
        showSelectedLabels: false, // Hide selected labels
        showUnselectedLabels: false, // Hide unselected labels
        type: BottomNavigationBarType.fixed,
        backgroundColor: kBackgroundColorBottomNavbar, // Match navbar background color
        elevation: 0,
        currentIndex: currentIndex,
        onTap: onTap,
        items: [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.home,
              color: currentIndex == 0 ? kSelectedItemColorBottomNavbar : Colors.grey.withOpacity(0.6),
            ),
            label: 'Home', // Keep label for the sake of structure but won't be displayed
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.poll,
              color: currentIndex == 1 ? kSelectedItemColorBottomNavbar : Colors.grey.withOpacity(0.6),
            ),
            label: 'Shop', // Keep label for the sake of structure but won't be displayed
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.policy,
              color: currentIndex == 2 ? kSelectedItemColorBottomNavbar : Colors.grey.withOpacity(0.6),
            ),
            label: 'Favourite', // Keep label for the sake of structure but won't be displayed
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.account_circle,
              color: currentIndex == 3 ? kSelectedItemColorBottomNavbar : Colors.grey.withOpacity(0.6),
            ),
            label: 'Notification', // Keep label for the sake of structure but won't be displayed
          ),
        ],
      ),
    );
  }
}
