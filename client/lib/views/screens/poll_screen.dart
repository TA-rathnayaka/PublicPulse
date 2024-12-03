import 'package:flutter/material.dart';
import 'package:client/models/poll.dart';
import 'package:client/views/components/comment_card.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/components/top_navigation_bar.dart';

class PollScreen extends StatefulWidget {
  static String id = '/poll-screen';

  final Poll poll;

  const PollScreen({Key? key, required this.poll}) : super(key: key);

  @override
  _PollScreenState createState() => _PollScreenState();
}

class _PollScreenState extends State<PollScreen> {
  List<String> comments = []; // Store comments
  String selectedOption = ''; // Track the selected poll option

  void submitVote() {
    // Handle vote submission logic here
    // For now, just show a confirmation dialog
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Vote Submitted'),
        content: Text('You voted for: $selectedOption'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: Text('OK'),
          ),
        ],
      ),
    );
  }

  void addComment(String comment) {
    if (comment.isNotEmpty) {
      setState(() {
        comments.add(comment); // Add comment to the list
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Poll: ${widget.poll.title}'),
        actions: [
          TopNavigationBar(), // Include your top navigation bar here
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            Text(
              widget.poll.title,
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            SizedBox(height: 10),
            Text(
              widget.poll.description,
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            SizedBox(height: 20),
            ...widget.poll.options.map((option) => RadioListTile<String>(
                  title: Text(""),
                  value: "option",
                  groupValue: selectedOption,
                  onChanged: (value) {
                    setState(() {
                      selectedOption = value!;
                    });
                  },
                )),
            SizedBox(height: 20),
            PrimaryButton(
              onPressed: submitVote,
              label: 'Submit Vote',
            ),
            SizedBox(height: 20),
            Text('Comments:', style: Theme.of(context).textTheme.headlineSmall),
            Padding(
              padding: const EdgeInsets.only(bottom: 16.0),
              child: TextField(
                decoration: InputDecoration(
                  labelText: 'Add a comment',
                  border: OutlineInputBorder(),
                ),
                onSubmitted: addComment,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
