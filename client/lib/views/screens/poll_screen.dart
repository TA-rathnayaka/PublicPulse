import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/providers/poll_screen_provider.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/models/poll.dart'; // Assuming Poll class is imported from here
import 'package:firebase_core/firebase_core.dart';
class PollScreen extends StatelessWidget {

  static String id = '/poll-screen';

  final Poll poll;  // Now accepting Poll object directly

  PollScreen({required this.poll}); // Constructor updated to accept Poll object

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<PollScreenProvider>(
        builder: (context, pollProvider, child) {
          return SingleChildScrollView(
            child: Container(
              color: Colors.white,
              child: Column(
                children: <Widget>[
                  PollCarousel(
                    images: poll.imageUrl != null ? [poll.imageUrl!] : [],  // Use poll.imageUrl for images
                    currentIndex: pollProvider.currentIndex,
                    onNext: pollProvider.next,
                    onPrevious: pollProvider.previous,
                  ),
                  Transform.translate(
                    offset: Offset(0, -40),
                    child: PollDetails(
                      question: poll.title,  // Using poll.title as the question
                      votes: _calculateVotes(poll.options),  // Calculate votes from options
                      description: poll.description,  // Using poll.description
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  // Helper function to calculate the total votes from poll options
  String _calculateVotes(List<Map<String, int>> options) {
    int totalVotes = 0;
    for (var option in options) {
      totalVotes += option.values.first;  // Assuming only one value per option map
    }
    return totalVotes.toString();
  }
}

class PollCarousel extends StatelessWidget {
  final List<String> images;
  final int currentIndex;
  final VoidCallback onNext;
  final VoidCallback onPrevious;

  PollCarousel({
    required this.images,
    required this.currentIndex,
    required this.onNext,
    required this.onPrevious,
  });

  @override
  Widget build(BuildContext context) {
    if (images.isEmpty) {
      return Center(
        child: Text(
          "No images available",
          style: TextStyle(fontSize: 18, color: Colors.grey),
        ),
      );
    }

    // Ensure currentIndex is within bounds
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
        duration: Duration(milliseconds: 800),
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
                  duration: Duration(milliseconds: 1000),
                  child: Container(
                    width: 90,
                    margin: EdgeInsets.only(bottom: 60),
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

class PollDetails extends StatelessWidget {
  final String question;
  final String votes;
  final String description; // Added description parameter

  PollDetails({
    required this.question,
    required this.votes,
    required this.description, // Required description in constructor
  });

  @override
  Widget build(BuildContext context) {
    final safeVotes = int.tryParse(votes) ?? 0;

    return FadeInUp(
      duration: Duration(milliseconds: 1000),
      child: ClipRRect(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(30),
          topRight: Radius.circular(30),
        ),
        child: Container(
          width: double.infinity,
          padding: EdgeInsets.all(30),
          decoration: BoxDecoration(
            color: Colors.white,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              FadeInUp(
                duration: Duration(milliseconds: 1300),
                child: Text(
                  question,
                  style: TextStyle(
                    color: Colors.grey[800],
                    fontSize: 26,  // Increased font size for better readability
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(height: 15),
              FadeInUp(
                duration: Duration(milliseconds: 1500),
                child: Text(
                  "$safeVotes Votes",
                  style: TextStyle(
                    color: kPrimaryColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 22,  // Slightly larger font for votes
                  ),
                ),
              ),
              SizedBox(height: 15),
              // Adding a vote description here
              FadeInUp(
                duration: Duration(milliseconds: 1700),
                child: Text(
                  description, // Using the passed description here
                  style: TextStyle(
                    color: Colors.grey[600],
                    fontSize: 18,  // Improved readability for description
                    fontStyle: FontStyle.italic,
                  ),
                ),
              ),
              SizedBox(height: 20),
              FadeInUp(
                duration: Duration(milliseconds: 1700),
                child: PrimaryButton(
                  onPressed: () {
                    final FirebaseAnalytics analytics = FirebaseAnalytics.instance;
                    analytics.logEvent(name: "test click");
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Vote button pressed')),
                    );
                  },
                  label: "Vote Now",
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class IndicatorRow extends StatelessWidget {
  final int currentIndex;
  final int itemCount;

  IndicatorRow({required this.currentIndex, required this.itemCount});

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
      width: 20,
      height: 4,
      margin: EdgeInsets.symmetric(horizontal: 2),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(50),
        color: isActive ? Colors.blue[700] : Colors.grey[300],
      ),
    );
  }
}