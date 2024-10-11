
import 'package:flutter/material.dart';
import '../constants/constants.dart';
import '../components/StatelessWidget.dart';
import 'package:client/components/preview_card.dart';
import 'package:client/components/top_navigation_bar.dart';

class PollCreationScreen extends StatelessWidget {
  static String id = '/poll-creation';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kBackgroundColor,
      appBar: TopNavigationBar(),
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
                    imageUrl: 'https://as2.ftcdn.net/v2/jpg/02/29/51/37/1000_F_229513787_8XjaId5E9g3DYxHNialX7xUr0pppLXLJ.jpg',
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
                  // PollTopicInput(label: 'Poll Topic'),
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
    );
  }
}

