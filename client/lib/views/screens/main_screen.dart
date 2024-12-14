import 'package:client/providers/screens_providers/navigator_provider.dart';
import 'package:flutter/material.dart';
import 'package:client/views/screens/_all.dart';
import 'package:client/views/components/bottom_navbar.dart';
import 'package:provider/provider.dart';
import 'package:client/Providers/polls_provider.dart';
import 'package:client/Providers/notification_provider.dart';
import 'package:client/providers/user_provider.dart';
import 'package:client/providers/screens_providers/poll_creation_validation_provider.dart';

enum PageIndex { dashboard, pollCreation, notification, userProfile }

class MainScreen extends StatelessWidget {
  static String id = '/main-screen';

  final List<Widget> _pages = [
    const Dashboard(),
    ChangeNotifierProvider(
      create: (_) => PollCreationValidationProvider(),
      child: const PollCreationScreen(),
    ),
    const NotificationScreen(),
    const UserProfileScreen(),
  ];

  MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<UserProvider>(create: (context) => UserProvider()),
        ChangeNotifierProvider<PollsProvider>(create: (context) => PollsProvider()),
        ChangeNotifierProvider<NotificationProvider>(create: (context) => NotificationProvider()),
        ChangeNotifierProvider<NavigatorProvider>(create: (context) => NavigatorProvider()),
      ],
      child: Consumer<NavigatorProvider>(
        builder: (context, navigatorProvider, child) {
          PageIndex currentPage = PageIndex.values[navigatorProvider.currentIndex];

          return Scaffold(
            body: _pages[currentPage.index],
            bottomNavigationBar: BottomNavbar(
              items: [
                BottomNavbarItem(icon: Icons.home, index: PageIndex.dashboard.index),
                BottomNavbarItem(icon: Icons.create, index: PageIndex.pollCreation.index),
                BottomNavbarItem(icon: Icons.book, index: PageIndex.notification.index),
                BottomNavbarItem(icon: Icons.settings, index: PageIndex.userProfile.index),
              ],
              currentIndex: navigatorProvider.currentIndex,
              onTap: (int index) {
                navigatorProvider.setCurrentIndex(index);
              },
            ),
          );
        },
      ),
    );
  }
}