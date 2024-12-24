import 'package:flutter/material.dart';
import 'package:client/views/constants/primary_color_constants.dart';

class PrimaryButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;

  const PrimaryButton({
    super.key,
    required this.label,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Material(
        color: Colors.transparent,  // Transparent to allow child decoration to be visible
        child: Container(
          height: 56,  // Standard minimum height for touch targets
          width: double.infinity,  // Button width expands to fit its parent
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),  // Slightly larger radius for modern design
            gradient: LinearGradient(
              colors: [
                kPrimaryButtonColor,
                kPrimaryButtonColor.withOpacity(0.6),
              ],
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.2),
                blurRadius: 6,
                offset: Offset(0, 4),  // Creates a shadow effect
              ),
            ],
          ),
          child: InkWell(
            onTap: onPressed,
            borderRadius: BorderRadius.circular(12),  // Ensures the ripple effect is within the button's shape
            child: Center(
              child: Text(
                label,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,  // Adjusted font size for better readability
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}