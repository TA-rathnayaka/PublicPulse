import 'package:flutter/material.dart';
import 'package:client/components/preview_card.dart'; // Import the PreviewCard

class PollCreationScreen extends StatelessWidget {
  static String id = '/poll-creation';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            IconButton(
              icon: Icon(Icons.arrow_back),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            SizedBox(width: 8),
            Text("Poll Create"),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 28),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Preview',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  // Use PreviewCard instead of the stack with avatar and image placeholders
                  PreviewCard(
                    username: '@username',
                    avatarPath: 'images/avatar.png',
                    imageUrl: 'https://picsum.photos/250?image=9',
                    description:
                        'This is a sample description for the poll preview.',
                  ),
                  SizedBox(height: 16),
                  Text(
                    'Poll Topic',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  SizedBox(height: 16),
                  TextField(
                    decoration: InputDecoration(
                      hintText: 'Write Here',
                      border: InputBorder.none, // Remove border
                    ),
                  ),
                  SizedBox(height: 16),
                  Text(
                    'Poll Description',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  SizedBox(height: 16),
                  TextField(
                    decoration: InputDecoration(
                      hintText: 'Write Here',
                      border: InputBorder.none, // Remove border
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16),
              Text('Poll Results',
                  style: Theme.of(context).textTheme.headlineSmall),
              SizedBox(height: 8),
              Wrap(
                spacing: 4,
                runSpacing: 4,
                children: [
                  Chip(label: Text('Option 1')),
                  Chip(label: Text('Option 2')),
                ],
              ),
              SizedBox(height: 16),
              SizedBox(height: 20),
              Center(
                child: SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      // Voting logic here
                    },
                    child: Text('Submit'),
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 100),
            ],
          ),
        ),
      ),
    );
  }
}
