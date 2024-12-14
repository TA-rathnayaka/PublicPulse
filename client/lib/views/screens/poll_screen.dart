import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/providers/screens_providers/poll_screen_provider.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/models/poll.dart';

class PollScreen extends StatelessWidget {
  static String id = '/poll-screen';

  final Poll poll;

  const PollScreen({super.key, required this.poll}); // Constructor updated to accept Poll object

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
                        votes: _calculateVotes(poll.options),
                        description: poll.description,
                        options: poll.options,  // Pass options to PollDetails
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
  String _calculateVotes(List<Map<String, int>> options) {
    int totalVotes = 0;
    for (var option in options) {
      totalVotes += option.values.first;
    }
    return totalVotes.toString();
  }
}

class PollDetails extends StatefulWidget {
  final String question;
  final String votes;
  final String description;
  final List<Map<String, int>> options;  // Add options as parameter

  const PollDetails({super.key,
    required this.question,
    required this.votes,
    required this.description,
    required this.options,
  });

  @override
  _PollDetailsState createState() => _PollDetailsState();
}

class _PollDetailsState extends State<PollDetails> {
  String? selectedOption;

  @override
  Widget build(BuildContext context) {
    final safeVotes = int.tryParse(widget.votes) ?? 0;

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
              _buildText(widget.question, 26, FontWeight.bold, Theme.of(context).textTheme.bodyMedium?.color, 1300),
              const SizedBox(height: 15),
              _buildText("$safeVotes Votes", 22, FontWeight.bold, Theme.of(context).primaryColor, 1500),
              const SizedBox(height: 15),
              _buildText(widget.description, 18, FontWeight.normal, Theme.of(context).textTheme.bodyMedium?.color, 1700),
              const SizedBox(height: 20),
              _buildOptions(),
              const SizedBox(height: 20),
              _buildVoteButton(),
            ],
          ),
        ),
      ),
    );
  }

  // Helper function to build text with animations
  Widget _buildText(String text, double fontSize, FontWeight fontWeight, Color? color, int duration) {
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
          String optionName = option.keys.first;
          return GestureDetector(
            onTap: () {
              setState(() {
                selectedOption = optionName;
              });
            },
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
              margin: const EdgeInsets.symmetric(vertical: 5),
              decoration: BoxDecoration(
                color: selectedOption == optionName
                    ? Theme.of(context).primaryColor
                    : Theme.of(context).unselectedWidgetColor,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                "$optionName - ${option[optionName]} votes",
                style: TextStyle(
                  fontSize: 18,
                  color: selectedOption == optionName
                      ? Colors.white
                      : Colors.black,
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  // Helper function to handle vote button click
  Widget _buildVoteButton() {
    return FadeInUp(
      duration: const Duration(milliseconds: 1700),
      child: PrimaryButton(
        onPressed: () {
          if (selectedOption != null) {
            // Handle vote submission
            _voteForOption(selectedOption!);
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Voted for $selectedOption')),
            );
          }
        },
        label: "Vote Now",
      ),
    );
  }

  // Helper function to vote for the selected option
  void _voteForOption(String optionName) {
    setState(() {
      for (var option in widget.options) {
        if (option.containsKey(optionName)) {
          option[optionName] = (option[optionName] ?? 0) + 1;  // Increment vote count
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

  const PollCarousel({super.key,
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

  const IndicatorRow({super.key, required this.currentIndex, required this.itemCount});

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