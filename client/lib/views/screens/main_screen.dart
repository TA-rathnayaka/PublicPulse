import 'package:client/providers/screens_providers/navigator_provider.dart';
import 'package:client/views/screens/policy_dashboard.dart';
import 'package:flutter/material.dart';
import 'package:client/views/screens/_all.dart';
import 'package:client/views/components/bottom_navbar.dart';
import 'package:provider/provider.dart';
import 'package:client/Providers/polls_provider.dart';
import 'package:client/providers/screens_providers/poll_creation_validation_provider.dart';
import 'package:client/providers/policy_provider.dart';

enum PageIndex { poll_dashboard, pollCreation, policy_dashbord, userProfile }

class MainScreen extends StatelessWidget {
  static String id = '/main-screen';

  final List<Widget> _pages = [
    PollDashboard(),
    ChangeNotifierProvider(
      create: (_) => PollCreationValidationProvider(),
      child: const PollCreationScreen(),
    ),
    const PolicyDashboard(),
    const UserProfileScreen(),
  ];

  MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<PollsProvider>(
            create: (context) => PollsProvider()),
        ChangeNotifierProvider<NavigatorProvider>(
            create: (context) => NavigatorProvider()),
        ChangeNotifierProvider<PoliciesProvider>(
            create: (context) => PoliciesProvider()),
      ],
      child: Consumer<NavigatorProvider>(
        builder: (context, navigatorProvider, child) {
          PageIndex currentPage =
              PageIndex.values[navigatorProvider.currentIndex];

          return Scaffold(
            body: _pages[currentPage.index],
            bottomNavigationBar: BottomNavbar(
              items: [
                BottomNavbarItem(
                    icon: Icons.home, index: PageIndex.poll_dashboard.index),
                BottomNavbarItem(
                    icon: Icons.create, index: PageIndex.pollCreation.index),
                BottomNavbarItem(
                    icon: Icons.book, index: PageIndex.policy_dashbord.index),
                BottomNavbarItem(
                    icon: Icons.settings, index: PageIndex.userProfile.index),
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
