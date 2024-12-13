import 'package:flutter/material.dart';
import 'package:client/views/constants/primary_color_constants.dart';

class PrimaryButton extends StatelessWidget {
  final String label;  // Changed to 'label' to match PrimaryButton
  final VoidCallback onPressed;

  const PrimaryButton({
    Key? key,
    required this.label,  // Changed to 'label' to match PrimaryButton
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        height: 50,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          gradient: LinearGradient(
            colors: [
              kPrimaryButtonColor,
              kPrimaryButtonColor.withOpacity(0.6),
            ],
          ),
        ),
        child: Center(
          child: Text(
            label,  // Changed to 'label' to match PrimaryButton
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}