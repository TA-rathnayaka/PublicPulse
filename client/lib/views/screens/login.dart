import 'package:flutter/material.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/views/components/top_navigation_bar.dart';

class Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(kPaddingHorizontal),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TopNavigationBar(),
            SizedBox(height: kSizedBoxHeight),
            Center(
              child: Column(
                children: [
                  Icon(Icons.how_to_vote, size: 100, color: kPrimaryColor),
                  SizedBox(height: kSizedBoxHeight),
                  Text(
                    "Well come to Public Pulse",
                    style: kHeadlineStyle,
                  ),
                  SizedBox(height: kSizedBoxHeight),
                  TextField(
                      decoration: kTextFieldDecoration.copyWith(
                          hintText: 'User name or email',
                          suffixIcon: Icon(
                            Icons.person,
                            color: kTextFieldHintColor,
                          ))),
                  SizedBox(height: kSizedBoxHeight),
                  TextField(
                    obscureText: true,
                    decoration: kTextFieldDecoration.copyWith(
                        suffixIcon: Icon(
                          Icons.visibility_off,
                          color: kTextFieldHintColor,
                        ),
                        hintText: "Password"),
                  ),
                  SizedBox(height: kSizedBoxHeight),
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () {
                        // Add forgot password logic here
                      },
                      child: Text(
                        "Forgot a password?",
                        style: TextStyle(color: kPrimaryColor),
                      ),
                    ),
                  ),
                  SizedBox(height: kSizedBoxHeight),
                  SizedBox(
                    width: double.infinity,
                    child: PrimaryButton(
                      label: "Enter",
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(height: kSizedBoxHeight),
                  SizedBox(
                    width: double.infinity,
                    child: PrimaryButton(
                      label: "Create Account",
                      onPressed: () {},
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
