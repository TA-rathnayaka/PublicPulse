import 'package:flutter/material.dart';
import 'package:client/components/comment_card.dart';
import 'package:client/components/result_card.dart';
import 'package:client/components/preview_card.dart';

class PollScreen extends StatelessWidget {
  static String id = '/poll-screen';

  final String username;
  final String avatarPath;
  final String imageUrl;
  final String title;
  final String subtitle;
  final String description;
  final Map<String, double> results; // Poll results (option => percentage)
  final List<Map<String, String>> comments; // User comments

  const PollScreen({
    Key? key,
    required this.username,
    required this.avatarPath,
    required this.imageUrl,
    required this.title,
    required this.subtitle,
    required this.description,
    required this.results,
    required this.comments,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 48,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: const Text('Poll'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Poll Preview Section
              PreviewCard(
                username: username,
                avatarPath: avatarPath,
                imageUrl: imageUrl,
                description: description,
              ),
              const SizedBox(height: 12),

              // Vote Button
              Center(
                child: SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      // Voting logic here
                    },
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    child: const Text('Vote'),
                  ),
                ),
              ),
              const SizedBox(height: 28),

              // Poll Results
              const Text('Total votes counted: 13,483,958',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              const SizedBox(height: 10),
              ...results.entries.map((entry) {
                return Column(
                  children: [
                    ResultCard(
                      title: entry.key,
                      percentage: entry.value.toInt(),
                    ),
                    const SizedBox(height: 10),
                  ],
                );
              }).toList(),

              // User Interaction Section
              const SizedBox(height: 20),
              const Text('User Interaction:', style: TextStyle(fontSize: 18)),
              const SizedBox(height: 10),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: comments.map((commentData) {
                    return Row(
                      children: [
                        CommentCard(
                          name: commentData['name']!,
                          comment: commentData['comment']!,
                          rating: double.parse(commentData['rating']!),
                          avatarPath: commentData['avatarPath']!,
                        ),
                        const SizedBox(width: 10),
                      ],
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
