import 'package:flutter/material.dart';
import 'package:client/models/poll.dart';
import 'package:client/views/components/comment_card.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/components/top_navigation_bar.dart';

class PollScreen extends StatefulWidget {
  static String id = '/poll-screen';

  final Poll poll;
  final List<Map<String, int>> results; // Adjusted based on your Poll class
  final List<Map<String, String>> comments;

  const PollScreen({
    Key? key,
    required this.poll,
    required this.results,
    required this.comments,
  }) : super(key: key);

  @override
  _PollScreenState createState() => _PollScreenState();
}

class _PollScreenState extends State<PollScreen> {
  bool _hasVoted = false;
  int _totalVotes = 0;

  @override
  void initState() {
    super.initState();
    // Calculate the total votes from the results
    _totalVotes = widget.results.fold(0, (sum, option) => sum + option.values.first);
  }

  void _vote(String optionName) {
    if (widget.poll.vote(optionName)) {
      setState(() {
        _totalVotes++;
        _hasVoted = true;
      });
    }
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
              // Display Poll Title
              Text(
                widget.poll.title,
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),

              // Display Poll Description
              Text(
                widget.poll.description,
                style: TextStyle(fontSize: 16),
              ),
              const SizedBox(height: 8),

              // Display Poll Image if available
              if (widget.poll.imageUrl != null)
                Image.network(widget.poll.imageUrl!),
              const SizedBox(height: 16),

              // Display Total Votes
              Text(
                'Total Votes: $_totalVotes',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 16),

              // Display Voting Options
              Text(
                'Voting Options:',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
              ),
              ...widget.poll.options.map((option) {
                // Extract option name and vote count
                final optionName = option.keys.first;
                final voteCount = option[optionName] ?? 0;
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '$optionName: $voteCount votes',
                      style: TextStyle(fontSize: 16),
                    ),
                    if (!_hasVoted)
                      PrimaryButton(
                        onPressed: () => _vote(optionName),
                        label: 'Vote for $optionName',
                      ),
                    const SizedBox(height: 8),
                  ],
                );
              }).toList(),
              const SizedBox(height: 16),

              // Display Comments
              Text(
                'Comments:',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
              ),

              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
