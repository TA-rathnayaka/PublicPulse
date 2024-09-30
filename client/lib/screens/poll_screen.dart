import 'package:flutter/material.dart';
import 'package:client/components/comment_card.dart';
import 'package:client/components/result_card.dart';
import 'package:client/components/preview_card.dart';

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
              // Use PreviewCard instead of the inline card widget
              PreviewCard(
                username: '@username',
                avatarPath: 'images/avatar.png',
                imageUrl: "https://picsum.photos/250?image=9",
                description:
                'Greyhound divisively hello coldly wonderfully marginally far upon excluding.',
              ),
              SizedBox(height: 12),
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
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('User Interaction:', style: TextStyle(fontSize: 18)),
                  SizedBox(height: 10),
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
                        SizedBox(width: 10),
                        CommentCard(
                          name: 'Jane Smith',
                          comment: 'This was fun, thanks for sharing!',
                          rating: 4.8,
                          avatarPath: '',
                        ),
                        SizedBox(width: 10),
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
