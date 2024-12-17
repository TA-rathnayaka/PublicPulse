import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/providers/screens_providers/poll_screen_provider.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/providers/votes_provider.dart';
import 'package:client/models/poll.dart';

class PollScreen extends StatelessWidget {
  static String id = '/poll-screen';

  final Poll poll;

  const PollScreen(
      {super.key,
      required this.poll}); // Constructor updated to accept Poll object

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Consumer<PollScreenProvider>(
          builder: (context, pollProvider, child) {
            return SingleChildScrollView(
              child: Container(
                color: Theme.of(context).scaffoldBackgroundColor,
                child: Column(
                  children: <Widget>[
                    PollCarousel(
                      images: poll.imageUrl != null ? [poll.imageUrl!] : [],
                      currentIndex: pollProvider.currentIndex,
                      onNext: pollProvider.next,
                      onPrevious: pollProvider.previous,
                    ),
                    Transform.translate(
                      offset: const Offset(0, -40),
                      child: PollDetails(
                        question: poll.title,
                        description: poll.description,
                        options: poll.options,
                        poll: poll, // Add this line
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  // Helper function to calculate the total votes from poll options
  String _calculateVotes(List<Option> options) {
    int totalVotes = 0;
    for (var option in options) {
      totalVotes += option.voteCount;
    }
    return totalVotes.toString();
  }
}

class PollDetails extends StatefulWidget {
  final String question;
  final String description;
  final List<Option> options; // Add options as parameter
  final Poll poll;

  const PollDetails({
    super.key,
    required this.question,
    required this.description,
    required this.options,
    required this.poll, // Add this line
  });

  @override
  _PollDetailsState createState() => _PollDetailsState();
}

class _PollDetailsState extends State<PollDetails> {
  String? selectedOption;

  @override
  Widget build(BuildContext context) {

    return FadeInUp(
      duration: const Duration(milliseconds: 1000),
      child: ClipRRect(
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(30),
          topRight: Radius.circular(30),
        ),
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(30),
          decoration: BoxDecoration(
            color: Theme.of(context).scaffoldBackgroundColor,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              _buildText(widget.question, 26, FontWeight.bold,
                  Theme.of(context).textTheme.bodyMedium?.color, 1300),


              const SizedBox(height: 15),
              _buildText(widget.description, 18, FontWeight.normal,
                  Theme.of(context).textTheme.bodyMedium?.color, 1700),
              const SizedBox(height: 20),
              _buildOptions(),
              const SizedBox(height: 20),
              _buildVoteButton(widget.poll)
            ],
          ),
        ),
      ),
    );
  }

  // Helper function to build text with animations
  Widget _buildText(String text, double fontSize, FontWeight fontWeight,
      Color? color, int duration) {
    return FadeInUp(
      duration: Duration(milliseconds: duration),
      child: Text(
        text,
        style: TextStyle(
          color: color,
          fontSize: fontSize,
          fontWeight: fontWeight,
        ),
      ),
    );
  }

  // Helper function to render poll options
  Widget _buildOptions() {
    return FadeInUp(
      duration: const Duration(milliseconds: 1700),
      child: Column(
        children: widget.options.map((option) {
          return GestureDetector(
            onTap: () {
              setState(() {
                selectedOption = option.text;
              });
            },
            child: Align(
              alignment: Alignment.centerLeft,
              child: Container(
                padding:
                    const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
                margin: const EdgeInsets.symmetric(vertical: 5),
                decoration: BoxDecoration(
                  color: selectedOption == option.text
                      ? Theme.of(context).primaryColor
                      : Theme.of(context).unselectedWidgetColor,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  "${option.text} - ${option.voteCount} votes",
                  style: TextStyle(
                    fontSize: 18,
                    color: selectedOption == option.text
                        ? Colors.white
                        : Colors.black,
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  // Helper function to handle vote button click
  Widget _buildVoteButton(Poll poll) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1700),
      child: Consumer<VotesProvider>(
        builder: (context, votesProvider, child) {
          return PrimaryButton(
            onPressed: () async {
              if (selectedOption != null) {
                final selectedOptionId = widget.options
                    .firstWhere((option) => option.text == selectedOption)
                    .optionId;
                // Check if the vote was successfully added (via _hasVoted)
                if (!votesProvider.hasVoted) {
                  await votesProvider.addVote(poll.id!, selectedOptionId!);
                  _voteForOption(selectedOptionId);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Voted for $selectedOption')),
                  );

                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('You have already voted for ${poll.title}')),
                  );
                }
              }
            },
            label: "Vote Now",
          );
        },
      ),
    );
  }

  // Helper function to vote for the selected option
  void _voteForOption(String optionId) {
    setState(() {
      for (var option in widget.options) {
        if (option.optionId == (optionId)) {
          option.voteCount = (option.voteCount) + 1; // Increment vote count
        }
      }
    });
  }
}

class PollCarousel extends StatelessWidget {
  final List<String> images;
  final int currentIndex;
  final VoidCallback onNext;
  final VoidCallback onPrevious;

  const PollCarousel({
    super.key,
    required this.images,
    required this.currentIndex,
    required this.onNext,
    required this.onPrevious,
  });

  @override
  Widget build(BuildContext context) {
    if (images.isEmpty) {
      return const Center(
        child: Text(
          "No images available",
          style: TextStyle(fontSize: 18, color: Colors.grey),
        ),
      );
    }

    final safeIndex = currentIndex.clamp(0, images.length - 1);

    return GestureDetector(
      onHorizontalDragEnd: (DragEndDetails details) {
        if (details.velocity.pixelsPerSecond.dx > 0) {
          onPrevious();
        } else if (details.velocity.pixelsPerSecond.dx < 0) {
          onNext();
        }
      },
      child: FadeInUp(
        duration: const Duration(milliseconds: 800),
        child: Container(
          width: double.infinity,
          height: 300,
          decoration: BoxDecoration(
            image: DecorationImage(
              image: NetworkImage(images[safeIndex]),
              fit: BoxFit.cover,
              onError: (error, stackTrace) {
                print('Image load error: $error');
              },
            ),
          ),
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.bottomRight,
                colors: [
                  Colors.grey.shade700.withOpacity(.9),
                  Colors.grey.withOpacity(.0),
                ],
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                FadeInUp(
                  duration: const Duration(milliseconds: 1000),
                  child: Container(
                    width: 90,
                    margin: const EdgeInsets.only(bottom: 60),
                    child: IndicatorRow(
                      currentIndex: safeIndex,
                      itemCount: images.length,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class IndicatorRow extends StatelessWidget {
  final int currentIndex;
  final int itemCount;

  const IndicatorRow(
      {super.key, required this.currentIndex, required this.itemCount});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(
        itemCount,
        (index) => _indicator(index == currentIndex),
      ),
    );
  }

  Widget _indicator(bool isActive) {
    return Container(
      width: 10,
      height: 10,
      margin: const EdgeInsets.symmetric(horizontal: 5),
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: isActive ? Colors.white : Colors.grey,
      ),
    );
  }
}
