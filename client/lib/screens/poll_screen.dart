import 'package:flutter/material.dart';
import 'package:client/components/comment_card.dart';
import 'package:client/components/result_card.dart';

class PollScreen extends StatelessWidget {
  static String id = '/poll-screen';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 48,
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text('Poll'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Card for the avatar, username, and image
              Card(
                clipBehavior: Clip.antiAlias,
                child: Column(
                  children: [
                    ListTile(
                      leading: CircleAvatar(
                        backgroundImage: AssetImage('images/avatar.png'),
                        radius: 15,
                      ),
                      title: Text('@username', style: TextStyle(fontSize: 10)),
                      trailing: Icon(Icons.arrow_drop_down_circle),
                    ),
                    // Image that takes the full width of the card
                    Container(
                      height: 336,
                      width: double.infinity,
                      child: Image.network(
                        "https://picsum.photos/250?image=9",
                        fit: BoxFit.cover,
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Text(
                        'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
                        style: TextStyle(
                            fontSize: 14), // Adjust text style as needed
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 12),
              // Vote Button
              Center(
                child: SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      // Voting logic here
                    },
                    child: Text('Vote'),
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 28),
              // Poll results in a grid
              Text('Poll Results:', style: TextStyle(fontSize: 18)),
              SizedBox(height: 10),
              Row(
                children: [
                  Expanded(
                    child: Column(children: [
                      ResultCard(title: 'Option 1', percentage: 30),
                      SizedBox(height: 10),
                      ResultCard(title: 'Option 2', percentage: 50),
                    ]),
                  ),
                  SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      children: [
                        ResultCard(title: 'Option 3', percentage: 20),
                        SizedBox(height: 10),
                        ResultCard(title: 'Option 4', percentage: 10),
                      ],
                    ),
                  ),
                ],
              ),
              SizedBox(height: 20),
              // User Feedback Section
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('User Interaction:', style: TextStyle(fontSize: 18)),
                  SizedBox(height: 10),
                  // Scrollable feedback section
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        CommentCard(
                          name: 'John Doe',
                          comment: 'Great poll! I really enjoyed participating.',
                          rating: 4.5,
                          avatarPath: '',
                        ),
                        SizedBox(width: 10), // Space between cards
                        CommentCard(
                          name: 'Jane Smith',
                          comment: 'This was fun, thanks for sharing!',
                          rating: 4.8,
                          avatarPath: '',

                        ),
                        SizedBox(width: 10), // Space between cards
                        CommentCard(
                          name: 'Mark Johnson',
                          comment: 'I found this very informative!',
                          rating: 4.7,
                          avatarPath: '',

                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
