import 'package:flutter/material.dart';

class PolicyCarousel extends StatelessWidget {
  final List<String> policyImages;  // List of image URLs or asset paths for policies

  const PolicyCarousel({super.key, required this.policyImages});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 250,  // Height of the carousel
      child: ListView.builder(
        scrollDirection: Axis.horizontal,  // Scroll horizontally
        itemCount: policyImages.length,  // Number of items in the carousel
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.network(  // Use Image.asset for local images
                policyImages[index],
                fit: BoxFit.cover,  // Ensure images cover the available space
                width: 300,  // Width of each carousel item
              ),
            ),
          );
        },
      ),
    );
  }
}