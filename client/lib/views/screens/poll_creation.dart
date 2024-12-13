import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/models/poll.dart';
import 'package:client/Providers/polls_provider.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/providers/screens_providers/poll_creation_validation_provider.dart';

class PollCreationScreen extends StatelessWidget {
  static String id = '/poll-creation';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Create Poll'),
        backgroundColor: kPrimaryColor,
      ),
      backgroundColor: kBackgroundColor,
      body: Padding(
        padding: const EdgeInsets.all(kPaddingHorizontal),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Poll Title
              Text('Poll Title', style: kHeadlineStyle),
              SizedBox(height: kSizedBoxHeight),
              Consumer<PollCreationValidationProvider>(
                builder: (context, provider, child) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      TextField(
                        controller: provider.titleController,
                        decoration: kTextFieldDecoration.copyWith(
                          hintText: 'Enter poll title',
                          errorText: provider.titleError,
                        ),
                      ),
                    ],
                  );
                },
              ),
              SizedBox(height: kSizedBoxHeight),

              // Poll Description
              Text('Poll Description', style: kHeadlineStyle),
              SizedBox(height: kSizedBoxHeight),
              Consumer<PollCreationValidationProvider>(
                builder: (context, provider, child) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      TextField(
                        controller: provider.descriptionController,
                        maxLines: 3,
                        decoration: kTextFieldDecoration.copyWith(
                          hintText: 'Enter poll description',
                          errorText: provider.descriptionError,
                        ),
                      ),
                    ],
                  );
                },
              ),
              SizedBox(height: kSizedBoxHeight),

              // Poll Options
              Text('Poll Options', style: kHeadlineStyle),
              SizedBox(height: kSizedBoxHeight),
              Consumer<PollCreationValidationProvider>(
                builder: (context, provider, child) {
                  return Column(
                    children: List.generate(provider.optionControllers.length, (index) {
                      return Padding(
                        padding: const EdgeInsets.only(bottom: kSizedBoxHeight),
                        child: Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: provider.optionControllers[index],
                                decoration: kTextFieldDecoration.copyWith(
                                  hintText: 'Enter an option',
                                  errorText: provider.optionErrors[index],
                                ),
                              ),
                            ),
                            if (provider.optionControllers.length > 2)
                              IconButton(
                                icon: Icon(Icons.delete, color: Colors.red),
                                onPressed: () => provider.removeOptionField(index),
                              ),
                          ],
                        ),
                      );
                    }),
                  );
                },
              ),
              SizedBox(height: kSizedBoxHeight),

              // Add Option Button
              Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: const EdgeInsets.only(bottom: kSizedBoxHeight),
                  child: Consumer<PollCreationValidationProvider>(
                    builder: (context, provider, child) {
                      return OutlinedButton.icon(
                        onPressed: provider.addOptionField,
                        icon: Icon(Icons.add, color: Colors.black),
                        label: Text('Add Option', style: TextStyle(color: Colors.black)),
                        style: OutlinedButton.styleFrom(
                          side: BorderSide(color: Colors.black),
                        ),
                      );
                    },
                  ),
                ),
              ),
              SizedBox(height: kSizedBoxHeight),

              // Create Poll Button
              Consumer<PollCreationValidationProvider>(
                builder: (context, provider, child) {
                  return PrimaryButton(
                    label: 'Create Poll',
                    onPressed: () {
                      if (provider.isFormValid()) {
                        _createPoll(context, provider);
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Please fix the errors before submitting.')),
                        );
                      }
                    },
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _createPoll(BuildContext context, PollCreationValidationProvider provider) {
    final title = provider.titleController.text.trim();
    final description = provider.descriptionController.text.trim();
    final options = provider.optionControllers
        .where((controller) => controller.text.trim().isNotEmpty)
        .map((controller) => {controller.text.trim(): 0})
        .toList();

    final newPoll = Poll(
      title: title,
      description: description,
      options: options,
      createDate: DateTime.now(),
      duration: Duration(days: 7),
      imageUrl: 'https://via.placeholder.com/150',
    );

    // Add poll to the provider and sync with Firestore
    Provider.of<PollsProvider>(context, listen: false).addPoll(newPoll);

    // Show success message
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Poll created successfully!')),
    );

    // Clear inputs after poll creation
    provider.clearInputs();
  }
}