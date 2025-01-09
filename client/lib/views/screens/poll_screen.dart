import 'package:client/Providers/polls_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/providers/screens_providers/poll_screen_provider.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/models/poll.dart';

const test =70;

class PollScreen extends StatelessWidget {
  static String id = '/poll-screen';

  final Poll poll;

  const PollScreen({super.key, required this.poll});

  @override
  Widget build(BuildContext context) {
    print('User has voted: ${poll.hasVoted}');
    return SafeArea(
      child: Scaffold(
        body: Consumer<PollScreenProvider>(
          builder: (context, pollScreenProvider, child) {
            return SingleChildScrollView(
              child: Container(
                color: Theme.of(context).scaffoldBackgroundColor,
                child: Column(
                  children: <Widget>[
                    PollCarousel(
                      images: poll.imageUrl != null ? [poll.imageUrl!] : [],
                      currentIndex: pollScreenProvider.currentIndex,
                      onNext: pollScreenProvider.next,
                      onPrevious: pollScreenProvider.previous,
                    ),
                    Transform.translate(
                      offset: const Offset(0, -40),
                      child: PollDetails(
                        question: poll.title,
                        description: poll.description,
                        options: poll.options,
                        poll: poll,
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
}
class PollDetails extends StatefulWidget {
  final String question;
  final String description;
  final List<Option> options;
  final Poll poll;

  const PollDetails({
    super.key,
    required this.question,
    required this.description,
    required this.options,
    required this.poll,
  });

  @override
  _PollDetailsState createState() => _PollDetailsState();
}

class _PollDetailsState extends State<PollDetails> {
  String? selectedOption;
  bool showColors = false;

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
              _buildVoteButton(widget.poll),
            ],
          ),
        ),
      ),
    );
  }

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



  Widget _buildOptions() {
    int totalVotes = _calculateTotalVotes(widget.options);

    return FadeInUp(
      duration: const Duration(milliseconds: 1700),
      child: Column(
        children: widget.options.map((option) {
          double votePercentage = totalVotes > 0
              ? (option.voteCount / totalVotes) * 100
              : 0.0;

          Color backgroundColor = Colors.grey.shade300;
          Color borderColor = Colors.grey.shade600;
          Color percentageColor = Colors.black;

          if (widget.poll.hasVoted) {
            // Adjust colors based on vote percentage
            if (votePercentage < 50) {
              backgroundColor = Colors.blue.shade100;
              borderColor = Colors.blue.shade800;
              percentageColor = Colors.red;
            } else {
              backgroundColor = Colors.green.shade100;
              borderColor = Colors.green.shade800;
              percentageColor = Colors.green;
            }
          } else if (selectedOption == option.text) {
            backgroundColor = Colors.blue.shade100;
            borderColor = Colors.blue.shade800;
          }

          return GestureDetector(
            onTap: () {
              setState(() {
                selectedOption = option.text;
              });
            },
            child: Align(
              alignment: Alignment.centerLeft,
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
                margin: const EdgeInsets.symmetric(vertical: 5),
                decoration: BoxDecoration(
                  color: backgroundColor,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: borderColor, width: 2),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        option.text,
                        style: const TextStyle(
                          fontSize: 18,
                          color: Colors.black,
                        ),
                      ),
                    ),
                    // Show percentage only if user has already voted
                    if (widget.poll.hasVoted)
                      Container(
                        padding: const EdgeInsets.only(left: 10),
                        child: Text(
                          '${votePercentage.toStringAsFixed(1)}%',
                          style: TextStyle(
                            fontSize: 18,
                            color: percentageColor,
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildVoteButton(Poll poll) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1700),
      child: Consumer<PollsProvider>(
        builder: (context, pollsProvider, child) {
          return PrimaryButton(
            onPressed: () async {
              if (selectedOption != null) {
                final selectedOptionId = widget.options
                    .firstWhere((option) => option.text == selectedOption)
                    .optionId;
                if (!poll.hasVoted) {
                  await pollsProvider.addVote(selectedOptionId!);
                  _voteForOption(selectedOptionId);
                  setState(() {
                    showColors = true;
                  });
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Voted for $selectedOption')),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                        content:
                        Text('You have already voted for ${poll.title}')),
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

  void _voteForOption(String optionId) {
    setState(() {
      for (var option in widget.options) {
        if (option.optionId == optionId) {
          option.voteCount = option.voteCount + 1;
        }
      }
    });
  }

  int _calculateTotalVotes(List<Option> options) {
    return options.fold(0, (sum, option) => sum + option.voteCount);
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
      child: FadeIn(
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
