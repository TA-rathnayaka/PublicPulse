import 'package:flutter/material.dart';
import 'package:client/views/constants/search_button_constants.dart';


class SearchButton extends StatelessWidget {
  final String hintText;
  final ValueChanged<String> onChanged;

  const SearchButton({
    Key? key,
    required this.hintText,
    required this.onChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextField(
      onChanged: onChanged,
      decoration: kDefaultSearchButtonDecoration.copyWith(hintText: 'Search', hintStyle:  TextStyle(color: kHintTextColorSearchButton))
    );
  }
}
