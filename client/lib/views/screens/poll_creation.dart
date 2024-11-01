import 'package:flutter/material.dart';
import '../constants/constants.dart';
import '../components/StatelessWidget.dart';
import 'package:client/views/components/preview_card.dart';
import 'package:client/views/components/top_navigation_bar.dart';
import 'package:client/views/components/primary_button.dart';

class PollCreationScreen extends StatelessWidget {
  static String id = '/poll-creation';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kBackgroundColor,
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
            title: "title",
            subTitle: "subtitle",
            username: '@username',
            avatarPath: 'images/avatar.png',
            imageUrl:
            'https://as2.ftcdn.net/v2/jpg/02/29/51/37/1000_F_229513787_8XjaId5E9g3DYxHNialX7xUr0pppLXLJ.jpg',
            description:
            'This is a sample description for the poll preview.',
          ),
          SizedBox(height: kSizedBoxHeight),
          // Poll Topic
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Poll Topic",
                style: kHeadlineStyle,
              ),
              SizedBox(height: kSizedBoxHeight),
              TextField(
                decoration: kTextFieldDecoration.copyWith(hintText: 'Write a Topic'),
              ),
            ],
          ),
          SizedBox(height: kSizedBoxHeight),
          // Poll Description
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Poll Description',
                style: kHeadlineStyle,
              ),
              SizedBox(height: kSizedBoxHeight),
              TextField(
                maxLines: 5,
                decoration:
                kTextFieldDecoration.copyWith(hintText: 'Write a Description'),
              ),
            ],
          ),
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
        Container(
          width: double.infinity,
          child: PrimaryButton(label: "Create Poll", onPressed: () {}),
        )

        // Add extra space at the bottom
        ],
      ),
    ),)
    ,
    );
  }
}
