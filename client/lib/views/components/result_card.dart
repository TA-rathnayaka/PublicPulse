import 'package:flutter/material.dart';
import 'package:client/views/constants/result_card_constants.dart';

class CustomInkWell extends StatelessWidget {
  final bool isActive; // Indicates if the widget is active
  final String text; // Text to display
  final VoidCallback? onTap; // Callback for tap action

  const CustomInkWell({
    Key? key,
    required this.isActive,
    this.text = "M",
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap, // Call the onTap callback when tapped
      child: Container(
        height: 40,
        width: 110,
        decoration: BoxDecoration(
          color: isActive ? Colors.black : Colors.white.withOpacity(.1),
          borderRadius: BorderRadius.circular(10),
          border: Border(
            right: BorderSide(color: isActive ? Colors.orange : Colors.black),
            left: BorderSide(color: isActive ? Colors.orange : Colors.black),
            top: BorderSide(color: isActive ? Colors.orange : Colors.black),
            bottom: BorderSide(color: isActive ? Colors.orange : Colors.black),
          ),
        ),
        child: Center(
          child: Text(
            text,
            style: TextStyle(
              color: isActive ? Colors.orange : Colors.white.withOpacity(.8),
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}
