import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/models/poll.dart';
import 'package:client/Providers/polls_provider.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/providers/screens_providers/poll_creation_validation_provider.dart';

class PollCreationScreen extends StatelessWidget {
  static String id = '/poll-creation';

  const PollCreationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: kBackgroundColor,
        body: Padding(
          padding: const EdgeInsets.all(kPaddingHorizontal),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Poll Title
                const Text('Poll Title', style: kHeadlineStyle),
                const SizedBox(height: kSizedBoxHeight),
                Consumer<PollCreationValidationProvider>(
                  builder: (context, provider, child) {
                    return TextField(
                      controller: provider.titleController,
                      decoration: kTextFieldDecoration.copyWith(
                        hintText: 'Enter poll title',
                        errorText: provider.titleError,
                      ),
                    );
                  },
                ),
                const SizedBox(height: kSizedBoxHeight),
      
                // Poll Description
                const Text('Poll Description', style: kHeadlineStyle),
                const SizedBox(height: kSizedBoxHeight),
                Consumer<PollCreationValidationProvider>(
                  builder: (context, provider, child) {
                    return TextField(
                      controller: provider.descriptionController,
                      maxLines: 3,
                      decoration: kTextFieldDecoration.copyWith(
                        hintText: 'Enter poll description',
                        errorText: provider.descriptionError,
                      ),
                    );
                  },
                ),
                const SizedBox(height: kSizedBoxHeight),
      
                // Poll Options
                const Text('Poll Options', style: kHeadlineStyle),
                const SizedBox(height: kSizedBoxHeight),
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
                                  icon: const Icon(Icons.delete, color: Colors.red),
                                  onPressed: () => provider.removeOptionField(index),
                                ),
                            ],
                          ),
                        );
                      }),
                    );
                  },
                ),
                const SizedBox(height: kSizedBoxHeight),
      
                // Add Option Button
                Align(
                  alignment: Alignment.centerLeft,
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: kSizedBoxHeight),
                    child: Consumer<PollCreationValidationProvider>(
                      builder: (context, provider, child) {
                        return OutlinedButton.icon(
                          onPressed: provider.addOptionField,
                          icon: const Icon(Icons.add, color: Colors.black),
                          label: const Text('Add Option', style: TextStyle(color: Colors.black)),
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: Colors.black),
                          ),
                        );
                      },
                    ),
                  ),
                ),
                const SizedBox(height: kSizedBoxHeight),
      
                // Poll Image URL
                const Text('Poll Image URL', style: kHeadlineStyle),
                const SizedBox(height: kSizedBoxHeight),
                Consumer<PollCreationValidationProvider>(
                  builder: (context, provider, child) {
                    return TextField(
                      controller: provider.imageUrlController,
                      decoration: kTextFieldDecoration.copyWith(
                        hintText: 'Enter image URL',
                        errorText: provider.imageUrlError,
                      ),
                    );
                  },
                ),
                const SizedBox(height: kSizedBoxHeight),
      
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
                            const SnackBar(content: Text('Please fix the errors before submitting.')),
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
    final imageUrl = provider.imageUrlController.text.trim().isEmpty
        ? 'https://via.placeholder.com/150'
        : provider.imageUrlController.text.trim();

    final newPoll = Poll(
      title: title,
      description: description,
      options: options,
      createDate: DateTime.now(),
      duration: const Duration(days: 7),
      imageUrl: imageUrl,
    );

    // Add poll to the provider and sync with Firestore
    Provider.of<PollsProvider>(context, listen: false).addPoll(newPoll);

    // Show success message
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Poll created successfully!')),
    );

    // Clear inputs after poll creation
    provider.clearInputs();
  }
}