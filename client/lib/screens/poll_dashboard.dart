import 'package:flutter/material.dart';
import 'package:client/components/poll_dashboard_item.dart'; // Assuming PollCard is located here

class PollDashboardScreen extends StatelessWidget {
  static String id = '/';

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Poll Dashboard"),
        elevation: 0,
        toolbarHeight: 48,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 28), // Spacing before title
            Text(
              "Vote on the Government Policies & Polls", // Main Title
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              textAlign: TextAlign.left,
            ),
            Text(
              "Think and vote", // Subtitle
              style: TextStyle(fontSize: 16, color: Colors.grey),
              textAlign: TextAlign.left,
            ),
            SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: pollData.length, // Number of polls
                itemBuilder: (context, index) {
                  final poll =
                      pollData[index];
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
    );
  }
}
