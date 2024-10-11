import 'package:flutter/material.dart';
import 'package:client/components/custom_bottom_navbar.dart';
import 'package:client/components/dashboard_status_card.dart';
import 'package:client/screens/notifications.dart';
import 'package:client/screens/poll_creation.dart';
import 'package:client/screens/user_profile.dart';
import 'package:client/components/poll_card.dart';
import 'package:client/constants/constants.dart';
import 'package:client/components/search_button.dart';
import 'dummy_data.dart';

class PollDashboardScreen extends StatefulWidget {
  static String id = '/';

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
      bottomNavigationBar: CustomBottomNavigationBar(
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
              Row(
                children: [
                  CircleAvatar(
                    radius: 30,
                    backgroundImage: pollData[0]['imageUrl']!.isNotEmpty
                        ? NetworkImage(pollData[0]['imageUrl']!)
                        : null,
                    child: pollData[0]['imageUrl']!.isNotEmpty
                        ? null
                        : Text(
                            'PJ',
                            style: TextStyle(color: Colors.white),
                          ),
                  ),
                  SizedBox(width: 10),
                  Text(
                    'Pasindu Jayasena',
                    style: kHeadlineStyle,
                  ),
                ],
              ),
              const SizedBox(height: 16),
              DashBoardStatusCard(
                activeCount: activeCount,
                endedCount: endedCount,
                recentCount: recentCount,
                dormantCount: dormantCount,
              ),
              SizedBox(height: 16),
              const Text(
                "Government Policies & Polls",
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
                  return PollCard(
                    title: poll['title']!,
                    subtitle: poll['subtitle']!,
                    imageUrl: poll['imageUrl']!,
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
