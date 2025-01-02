import 'package:flutter/material.dart';

class CommentCard extends StatelessWidget {
  late final String name;
  late final String avatarPath;
  late final double rating;
  late final String comment;

  CommentCard(
      {super.key, required this.name, required this.comment, required this.rating, required this.avatarPath});

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: Container(
        height: 200,
        width: 250, // Fixed width for square shape
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(15), // Rounded corners
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.3),
              spreadRadius: 2,
              blurRadius: 5,
              offset: const Offset(0, 3), // changes position of shadow
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            Padding(
              padding: const EdgeInsets.all(12),
              child: Row(
                children: [
                  CircleAvatar(
                    backgroundImage: AssetImage(avatarPath),
                    radius: 24,
                  ),
                  const SizedBox(width: 8),
                  Text(name, style: const TextStyle(fontSize: 16)),
                  const Spacer(),
                  const Icon(Icons.star, color: Colors.yellow),
                  Text(rating.toString()),
                ],
              ),
            ),
            const SizedBox(height: 12),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Text(
                comment,
                style: const TextStyle(fontSize: 14),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
