// poll_widgets.dart
import 'package:flutter/material.dart';
import '../constants/constants.dart';

class PollTopicInput extends StatelessWidget {
  final String label;

  const PollTopicInput({Key? key, required this.label}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: kHeadlineStyle,
        ),
        SizedBox(height: kSizedBoxHeight),
        TextField(
          decoration: kInputDecoration.copyWith(hintText: 'Write a Topic'),
        ),
      ],
    );
  }
}

class PollDescriptionInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
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
              kInputDecoration.copyWith(hintText: 'Write a Description'),
        ),
      ],
    );
  }
}

class PollResultsSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Poll Results',
          style: kHeadlineStyle,
        ),
        SizedBox(height: 8),
        Wrap(
          spacing: 4,
          runSpacing: 4,
          children: [
            Chip(label: Text('Option 1')),
            Chip(label: Text('Option 2')),
          ],
        ),
      ],
    );
  }
}

class CreatePollButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: () {
          // Add poll creation logic here
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: kPrimaryColor,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(kButtonRadius),
          ),
        ),
        child: Text(
          'Create Poll',
          style: kButtonTextStyle,
        ),
      ),
    );
  }
}
