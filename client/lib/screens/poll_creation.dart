
import 'package:flutter/material.dart';
import '../constants/constants.dart';
import '../components/StatelessWidget.dart';
import 'package:client/components/preview_card.dart'; // Import the PreviewCard

class PollCreationScreen extends StatelessWidget {
  static String id = '/poll-creation';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kBackgroundColor,
      appBar: AppBar(
        backgroundColor: kPrimaryColor,
        title: Row(
          children: [
            SizedBox(width: kAppBarTitleSpacing),
            Text(
              "Poll Create",
              style: TextStyle(color: Colors.white),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: kPaddingHorizontal),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 28),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Preview Card
                  PreviewCard(
                    username: '@username',
                    avatarPath: 'images/avatar.png',
                    imageUrl: 'https://picsum.photos/250?image=9',
                    description:
                        'This is a sample description for the poll preview.',
                  ),
                  SizedBox(height: kSizedBoxHeight),
                  // Poll Topic
                  PollTopicInput(label: 'Poll Topic'),
                  SizedBox(height: kSizedBoxHeight),
                  // Poll Description
                  PollDescriptionInput(),
                  SizedBox(height: kSizedBoxHeight),
                  // Another Poll Topic Input (for multiple options)
                  PollTopicInput(label: 'Poll Topic'),
                ],
              ),
              SizedBox(height: kSizedBoxHeight),
              // Poll Results
              PollResultsSection(),
              SizedBox(height: kSizedBoxHeight),
              // Pro Security Toggle (can add functionality later)
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Pro Security',
                    style: kHeadlineStyle,
                  ),
                  Switch(
                    value: true, // Example value
                    onChanged: (bool value) {
                      // Handle switch change
                    },
                  ),
                ],
              ),
              SizedBox(height: kSizedBoxHeight),
              // Create Poll Button
              CreatePollButton(),
              SizedBox(height: 100), // Add extra space at the bottom
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.bar_chart),
            label: 'Poll',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.notifications),
            label: 'Notification',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],

        unselectedItemColor: Colors.black, // Color for unselected items
        backgroundColor: Colors.black, // Background color of the BottomNavigationBar
        onTap: (int index) {
        },
      ),
    );
  }
}

