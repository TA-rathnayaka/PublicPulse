import 'package:flutter/material.dart';
import '../constants/constants.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/models/poll.dart';
import 'package:provider/provider.dart';
import 'package:client/providers/polls_provider.dart';

class PollCreationScreen extends StatefulWidget {
  static String id = '/poll-creation';

  @override
  _PollCreationScreenState createState() => _PollCreationScreenState();
}

class _PollCreationScreenState extends State<PollCreationScreen> {
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final List<TextEditingController> _optionControllers = [
    TextEditingController(),
    TextEditingController(),
  ];

  void _addOptionField() {
    setState(() {
      _optionControllers.add(TextEditingController());
    });
  }

  void _removeOptionField(int index) {
    if (_optionControllers.length > 2) {
      setState(() {
        _optionControllers[index].dispose();
        _optionControllers.removeAt(index);
      });
    }
  }

  void _createPoll() {
    final title = _titleController.text.trim();
    final description = _descriptionController.text.trim();
    final options = _optionControllers
        .where((controller) => controller.text.trim().isNotEmpty)
        .map((controller) => {controller.text.trim(): 0})
        .toList();

    if (title.isEmpty || options.length < 2) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Please provide a title and at least two options.'),
        ),
      );
      return;
    }

    final newPoll = Poll(
      title: title,
      description: description,
      options: options,
      createDate: DateTime.now(),
      duration: Duration(days: 7),
      imageUrl: 'https://via.placeholder.com/150',
    );

    Provider.of<PollsProvider>(context, listen: false).addPoll(newPoll);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Poll created successfully!')),
    );

    // Clear inputs
    _titleController.clear();
    _descriptionController.clear();
    for (var controller in _optionControllers) {
      controller.clear();
    }
  }

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
              TextField(
                controller: _titleController,
                decoration: kTextFieldDecoration.copyWith(
                  hintText: 'Enter poll title',
                ),
              ),
              SizedBox(height: kSizedBoxHeight),

              // Poll Description
              Text('Poll Description', style: kHeadlineStyle),
              SizedBox(height: kSizedBoxHeight),
              TextField(
                controller: _descriptionController,
                maxLines: 3,
                decoration: kTextFieldDecoration.copyWith(
                  hintText: 'Enter poll description',
                ),
              ),
              SizedBox(height: kSizedBoxHeight),

              // Poll Options
              Text('Poll Options', style: kHeadlineStyle),
              SizedBox(height: kSizedBoxHeight),
              Column(
                children: List.generate(_optionControllers.length, (index) {
                  return Padding(
                    padding: const EdgeInsets.only(bottom: kSizedBoxHeight),
                    child: Row(
                      children: [
                        Expanded(
                          child: TextField(
                            controller: _optionControllers[index],
                            decoration: kTextFieldDecoration.copyWith(
                              hintText: 'Enter an option',
                            ),
                          ),
                        ),
                        if (_optionControllers.length > 2)
                          IconButton(
                            icon: Icon(Icons.delete, color: Colors.red),
                            onPressed: () => _removeOptionField(index),
                          ),
                      ],
                    ),
                  );
                }),
              ),
              SizedBox(height: kSizedBoxHeight),

              // Add Option Button
              Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: const EdgeInsets.only(bottom: kSizedBoxHeight),
                  child: OutlinedButton.icon(
                    onPressed: _addOptionField,
                    icon: Icon(Icons.add, color: Colors.black),
                    label: Text('Add Option', style: TextStyle(color: Colors.black)),
                    style: OutlinedButton.styleFrom(
                      side: BorderSide(color: Colors.black), // Black outline
                    ),
                  ),
                ),
              ),
              SizedBox(height: kSizedBoxHeight),

              // Create Poll Button
              PrimaryButton(
                label: 'Create Poll',
                onPressed: _createPoll,
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    for (var controller in _optionControllers) {
      controller.dispose();
    }
    super.dispose();
  }
}