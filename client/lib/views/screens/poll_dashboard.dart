import 'package:flutter/material.dart';
import 'package:client/views/components/bottom_navbar.dart';
import 'package:client/views/components/dashboard_status_card.dart';
import 'package:client/views/screens/notifications.dart';
import 'package:client/views/screens/poll_creation.dart';
import 'package:client/views/screens/user_profile.dart';
import 'package:client/views/components/poll_dashboard_card.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/views/components/search_button.dart';
import 'dummy_data.dart';
import 'package:client/views/components/dashboard_list_tile.dart';

class PollDashboardScreen extends StatefulWidget {
  static String id = '/poll-dashboard';

  @override
  _PollDashboardScreenState createState() => _PollDashboardScreenState();
}

class _PollDashboardScreenState extends State<PollDashboardScreen> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    PollDashboardScreen(),
    PollCreationScreen(),
    NotificationScreen(),
    UserProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _currentIndex == 0 ? _buildPollDashboard() : _pages[_currentIndex],
      bottomNavigationBar: BottomNavbar(
        currentIndex: _currentIndex,
        onTap: (int index) {
          setState(() {
            _currentIndex = index;
          });
        },
      ),
    );
  }

  Widget _buildPollDashboard() {
    int activeCount = pollData.where((poll) => poll['label'] == 'Open').length;
    int endedCount = pollData.where((poll) => poll['label'] == 'Closed').length;
    int recentCount = 0;
    int dormantCount = 0;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: kPaddingHorizontal),
      child: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 10),
              const SizedBox(height: 16),
              SizedBox(height: 16),
              const Text(
                "Polls",
                style: kHeadlineStyle,
              ),
              SizedBox(height: 12),
              SearchButton(
                hintText: "Search",
                onChanged: (id) {},
              ),
              const SizedBox(height: 16),
              ListView.builder(
                itemCount: pollData.length,
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                itemBuilder: (context, index) {
                  final poll = pollData[index];
                  return DashboardListTile(
                      title: poll['title']!,
                      subtitle: poll['subtitle']!,
                      imageUrl: poll['imageUrl']!,
                      onTap: () {

                      });
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
