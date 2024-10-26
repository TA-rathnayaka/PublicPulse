import 'package:flutter/material.dart';
import 'package:client/constants/primary_color_constants.dart';


class PrimaryButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;

  const PrimaryButton({
    Key? key,
    required this.label,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: kPrimaryButtonColor, // Button background color
        textStyle: kPrimaryButtonTextStyle, // Text color
        padding: kPrimaryButtonPadding, // Size of the button
        shape: RoundedRectangleBorder(
          borderRadius: kPrimaryButtonBorderRadius, // Rounded corners
        ),
      ),
      onPressed: onPressed,
      child: Text(
        label,
        style: kPrimaryButtonTextStyle, // Text style
      ),
    );
  }
}