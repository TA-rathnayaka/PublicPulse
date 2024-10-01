import 'package:flutter/material.dart';
import 'package:client/constants/constants.dart';

class ResultCard extends StatelessWidget {
  final String title;
  final int percentage;

  ResultCard({required this.title, required this.percentage});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(kResultCardPadding), // Use constant padding directly
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(kResultCardBorderRadius), // Use constant border radius directly
        border: Border.all(color: kResultCardGreyColor), // Original border color directly
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(title, style: kResultCardTitleStyle), // Use title style directly
          Text(
            '${percentage}%', // Percentage with the original style
            style: kResultCardPercentageStyle, // Use percentage style directly
          ),
        ],
      ),
    );
  }
}
