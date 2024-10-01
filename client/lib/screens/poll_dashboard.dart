import 'package:flutter/material.dart';
import '../components/Custom_BottomNavBar.dart'; // Adjusted to match your custom bottom navigation component
import '../components/poll_card.dart'; // Adjusted to match your custom poll card component
import '../constants/constants.dart'; // Ensure your constants file is correctly imported

class PollDashboardScreen extends StatefulWidget {
  static String id = '/';

  @override
  _PollDashboardScreenState createState() => _PollDashboardScreenState();
}

class _PollDashboardScreenState extends State<PollDashboardScreen> {
  final List<Map<String, String>> pollData = [
    {
      "title": "Government Healthcare Policy",
      "subtitle": "Vote for your stance on healthcare reforms",
      "label": "Open",
      "avatarLabel": "Admin",
      "imageUrl": "https://example.com/healthcare.jpg",
    },
    {
      "title": "Education Budget Allocation",
      "subtitle": "Do you agree with the proposed budget?",
      "label": "Closed",
      "avatarLabel": "Moderator",
      "imageUrl": "https://example.com/education.jpg",
    },
    {
      "title": "Climate Change Initiative",
      "subtitle": "Share your opinion on climate policies",
      "label": "Open",
      "avatarLabel": "User123",
      "imageUrl": "https://example.com/climate.jpg",
    },
    {
      "title": "Tax Reform Proposal",
      "subtitle": "Do you support the new tax policies?",
      "label": "Open",
      "avatarLabel": "Admin",
      "imageUrl": "https://example.com/tax.jpg",
    },
    {
      "title": "Public Transportation Funding",
      "subtitle": "Your input on the transportation budget",
      "label": "Closed",
      "avatarLabel": "User456",
      "imageUrl": "https://example.com/transport.jpg",
    },
  ];

  int _currentIndex = 0;

  void _onBottomNavTap(int index) {
    setState(() {
      _currentIndex = index;
      // Add navigation logic if necessary
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kBackgroundColor, // Use your custom background color
      appBar: AppBar(
        title: Row(
          children: [
            SizedBox(width: kAppBarTitleSpacing),
            const Text(
              "Poll Dashboard",
              style: TextStyle(color: Colors.white),
            ),
          ],
        ),
        elevation: 0,
        toolbarHeight: 48,
        backgroundColor: kPrimaryColor, // Use your primary color
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: kPaddingHorizontal),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 28), // Spacing before the title
            const Text(
              "Vote on the Government Policies & Polls", // Main title
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const Text(
              "Think and vote", // Subtitle
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: pollData.length, // Number of polls to display
                itemBuilder: (context, index) {
                  final poll = pollData[index];
                  return PollCard(
                    title: poll['title']!,
                    subtitle: poll['subtitle']!,
                    label: poll['label']!,
                    avatarLabel: poll['avatarLabel']!,
                    imageUrl: poll['imageUrl']!,
                  );
                },
              ),
            ),
          ],
        ),
      ),
      // Use your custom bottom navigation bar component
      bottomNavigationBar: CustomBottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: _onBottomNavTap,
      ),
    );
  }
}
