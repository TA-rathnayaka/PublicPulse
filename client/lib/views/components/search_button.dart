import 'package:flutter/material.dart';

class SearchButton extends StatelessWidget {
  final String hintText;
  final ValueChanged<String> onChanged;

  const SearchButton({
    super.key,
    required this.hintText,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);

    return Container(
      decoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1), // Subtle shadow to create depth
            blurRadius: 6, // Reduced blur for a softer look
            offset: const Offset(0, 4), // Slight offset for more natural depth
          ),
        ],
      ),
      child: TextField(
        onChanged: onChanged,
        decoration: InputDecoration(
          hintText: hintText,
          hintStyle: TextStyle(
            color: theme.colorScheme.secondary.withOpacity(0.6), // Clear hint text
            fontSize: 16,
          ),
          prefixIcon: Icon(
            Icons.search,
            color: theme.colorScheme.secondary.withOpacity(0.7), // Search icon color
          ),
          filled: true,
          fillColor: theme.colorScheme.surface, // Consistent fill color
          contentPadding: const EdgeInsets.symmetric(vertical: 14.0, horizontal: 16.0),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12), // Rounded corners for a modern look
            borderSide: BorderSide(
              color: theme.colorScheme.primary.withOpacity(0.2),
            ),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(
              color: theme.colorScheme.primary.withOpacity(0.2), // Subtle border in the enabled state
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(
              color: theme.colorScheme.primary, // Clear visual indication on focus
              width: 1.5,
            ),
          ),
        ),
        style: TextStyle(
          color: theme.textTheme.bodyMedium?.color ?? theme.textTheme.bodyMedium?.color, // Fallback to bodyText2 if bodyMedium is unavailable
          fontSize: 16,
        ),
      ),
    );
  }
}