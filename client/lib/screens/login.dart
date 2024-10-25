import 'package:flutter/material.dart';
import 'package:client/components/primary_button.dart';
import 'package:client/constants/constants.dart';

class Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(height: 20),
            Center(
              child: Column(
                children: [
                  Icon(Icons.how_to_vote, size: 100, color: kPrimaryColor),
                  SizedBox(height: 20),
                  Text(
                    "Well come to Public Pulse",
                    style: kHeadlineStyle,
                  ),
                  SizedBox(height: 30),
                  TextField(
                      decoration: kTextFieldDecoration.copyWith(
                          hintText: 'User name or email',
                          suffixIcon: Icon(
                            Icons.person,
                            color: kTextFieldHintColor,
                          ))),
                  SizedBox(height: 20),
                  TextField(
                    obscureText: true,
                    decoration: kTextFieldDecoration.copyWith(
                        suffixIcon: Icon(
                          Icons.visibility_off,
                          color: kTextFieldHintColor,
                        ),
                        hintText: "Password"),
                  ),
                  SizedBox(height: 10),
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
                  SizedBox(height: 30),
                  SizedBox(
                    width: double.infinity,
                    child: PrimaryButton(
                      label: "Enter",
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(height: 15),
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
