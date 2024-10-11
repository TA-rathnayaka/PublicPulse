import 'package:flutter/material.dart';
import 'package:client/constants/constants.dart';
import 'package:client/components/top_navigation_bar.dart';

class NotificationScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TopNavigationBar(),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 12, 8, 12),
              child: Column(
                children: [
                  ListView.builder(
                    physics: NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: notificationList.length,
                    // Assuming notificationList is provided
                    itemBuilder: (context, index) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(
                            vertical: 12, horizontal: 14),
                        child: Row(
                          children: [
                            Icon(Icons.arrow_back),
                            SizedBox(width: 8),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        "New Message",
                                        style: TextStyle(fontSize: 16),
                                      ),
                                      Text(
                                        "2 hours ago",
                                        style: TextStyle(
                                            fontSize: 12, color: Colors.grey),
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: 4),
                                  Text(
                                    "You have a new message from John Doe.",
                                    style: TextStyle(fontSize: 14),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Sample notification data
List<Map<String, String>> notificationList = [
  {
    'title': 'New Message',
    'time': '2 hours ago',
    'description': 'You have a new message from John Doe.'
  },
  {
    'title': 'App Update',
    'time': 'Yesterday',
    'description': 'A new version of the app is available for update.'
  },
  // Add more notifications here
];
