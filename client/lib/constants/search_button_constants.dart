import 'package:flutter/material.dart';
import 'package:client/constants/constants.dart';


// Colors and BorderRadius extracted as constants
const kFillColorSearchButton = kTextFieldBackgroundColor;
const kHintTextColorSearchButton = kTextFieldHintColor;
const kBorderRadiusSearchButton = kBorderRadius;

final InputDecoration kDefaultSearchButtonDecoration = kTextFieldDecoration.copyWith(prefixIcon: const Icon(Icons.search));