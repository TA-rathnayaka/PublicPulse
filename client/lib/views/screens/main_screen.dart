import 'package:client/models/navigator_provider.dart';
import 'package:flutter/material.dart';
import 'package:client/views/screens/_all.dart';
import 'package:client/views/components/bottom_navbar.dart';
import 'package:provider/provider.dart';
import 'package:client/models/polls_provider.dart';
import 'package:client/models/notification_provider.dart';

class MainScreen extends StatelessWidget {
  static String id = '/main-screen';

  final List<Widget> _pages = [
    ChangeNotifierProvider<PollsProvider>(
        create: (context) => PollsProvider(), child: Dashboard()),
    PollCreationScreen(),
    ChangeNotifierProvider<NotificationProvider>(
        create: (context) => NotificationProvider(),
        child: NotificationScreen()),
    UserProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Consumer<NavigatorProvider>(
      builder: (context, navigatorProvider, child) {
        return Material(
          child: Scaffold(
            body: (navigatorProvider.currentIndex >= 0 &&
                    navigatorProvider.currentIndex < _pages.length)
                ? _pages[navigatorProvider.currentIndex]
                : Dashboard(),
            bottomNavigationBar: BottomNavbar(
              currentIndex: navigatorProvider.currentIndex,
              onTap: (int index) {
                navigatorProvider.setCurrentIndex(index);
              },
            ),
          ),
        );
      }, // Closing parenthesis for Consumer
    );
  }
}
