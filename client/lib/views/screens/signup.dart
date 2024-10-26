import 'package:client/views/components/primary_button.dart';
import 'package:flutter/material.dart';
import 'package:client/views/components/top_navigation_bar.dart';
import 'package:client/views/constants/constants.dart';

class Signup extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TopNavigationBar(),
      body: Padding(
        padding: const EdgeInsets.all(kPaddingHorizontal),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Create account",
              style: kHeadlineStyle,
            ),
            SizedBox(height: kSizedBoxHeight),
            TextField(
              decoration: kTextFieldDecoration.copyWith(
                  hintText: "First name", hintStyle: kInputHintTextStyle),
            ),
            SizedBox(height: kSizedBoxHeight),
            TextField(
              decoration: kTextFieldDecoration.copyWith(
                  hintText: "Last name", hintStyle: kInputHintTextStyle),
            ),
            SizedBox(height: kSizedBoxHeight),
            TextField(
              decoration: kTextFieldDecoration.copyWith(
                  hintText: "Email", hintStyle: kInputHintTextStyle),
            ),
            SizedBox(height: kSizedBoxHeight),
            TextField(
              keyboardType: TextInputType.phone,
              decoration: kTextFieldDecoration.copyWith(
                  hintText: "Phone Number", hintStyle: kInputHintTextStyle),
            ),
            SizedBox(height: kSizedBoxHeight),
            TextField(
              obscureText: true,
              decoration: kTextFieldDecoration.copyWith(
                  hintText: "Password", hintStyle: kInputHintTextStyle),
            ),
            SizedBox(height: kSizedBoxHeight),
            TextField(
              obscureText: true,
              decoration: kTextFieldDecoration.copyWith(
                  hintText: "Repeat password", hintStyle: kInputHintTextStyle),
            ),
            SizedBox(height: kSizedBoxHeight),
            SizedBox(
                width: double.infinity,
                child: PrimaryButton(
                  label: 'Enter',
                  onPressed: () {},
                )),
          ],
        ),
      ),
    );
  }
}
