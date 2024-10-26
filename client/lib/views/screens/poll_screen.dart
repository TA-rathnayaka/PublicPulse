import 'package:flutter/material.dart';
import 'package:client/views/components/comment_card.dart';
import 'package:client/views/components/result_card.dart';
import 'package:client/views/components/preview_card.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/components/top_navigation_bar.dart';

class PollScreen extends StatefulWidget {
  static String id = '/poll-screen';

  final String username;
  final String avatarPath;
  final String imageUrl;
  final String title;
  final String subtitle;
  final String description;
  final Map<String, int> results;
  final List<Map<String, String>> comments;

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
  _PollScreenState createState() => _PollScreenState();
}

class _PollScreenState extends State<PollScreen> {
  bool _hasVoted = false; // Track if the user has voted
  int _totalVotes = 0; // Track the total votes

  @override
  void initState() {
    super.initState();
    // Initialize total votes from the results
    _totalVotes = widget.results.values.fold(0, (sum, value) => sum + value);
  }

  void _vote() {
    setState(() {
      _totalVotes++;
      _hasVoted = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TopNavigationBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              PreviewCard(
                title: widget.title,
                subTitle: widget.subtitle,
                username: widget.username,
                avatarPath: widget.avatarPath,
                imageUrl: widget.imageUrl,
                description: widget.description,
              ),
              const SizedBox(height: 12),
              Center(
                child: SizedBox(
                  width: double.infinity,
                  child: PrimaryButton(
                    label: 'Vote',
                    onPressed: () =>_hasVoted ? null : _vote,
                  ),
                ),
              ),
              const SizedBox(height: 28),
              Text(
                'Total votes counted: $_totalVotes',
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              ...widget.results.entries.map((entry) {
                return Column(
                  children: [
                    ResultCard(
                      title: entry.key,
                      percentage: entry.value, // Assuming this is a count
                    ),
                    const SizedBox(height: 10),
                  ],
                );
              }).toList(),
              const SizedBox(height: 20),
              const Text(
                'User Interaction:',
                style: TextStyle(fontSize: 18),
              ),
              const SizedBox(height: 10),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: widget.comments.map((commentData) {
                    return Row(
                      children: [
                        CommentCard(
                          name: commentData['name'] ?? 'Anonymous',
                          comment: commentData['comment'] ?? '',
                          rating: double.tryParse(commentData['rating'] ?? '0') ?? 0.0,
                          avatarPath: commentData['avatarPath'] ?? '',
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
