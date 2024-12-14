// poll_widgets.dart
import 'package:flutter/material.dart';
import '../constants/constants.dart';

class PollTopicInput extends StatelessWidget {
  final String label;

  const PollTopicInput({super.key, required this.label});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: kHeadlineStyle,
        ),
        const SizedBox(height: kSizedBoxHeight),
        TextField(
          decoration: kTextFieldDecoration.copyWith(hintText: 'Write a Topic'),
        ),
      ],
    );
  }
}

class PollDescriptionInput extends StatelessWidget {
  const PollDescriptionInput({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Poll Description',
          style: kHeadlineStyle,
        ),
        const SizedBox(height: kSizedBoxHeight),
        TextField(
          maxLines: 5,
          decoration:
              kTextFieldDecoration.copyWith(hintText: 'Write a Description'),
        ),
      ],
    );
  }
}

class PollResultsSection extends StatelessWidget {
  const PollResultsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
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
  const CreatePollButton({super.key});

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
        child: const Text(
          'Create Poll',
          style: kButtonTextStyle,
        ),
      ),
    );
  }
}
