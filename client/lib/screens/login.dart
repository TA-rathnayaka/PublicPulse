import 'package:flutter/material.dart';

class Login extends StatelessWidget {
  static String id = '/login';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Title Six"),
        toolbarHeight: 48,
      ),
      body: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Title One",
                  style: TextStyle(fontSize: 18),
                ),
                SizedBox(height: 8),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: "Email",
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your email';
                    }
                    return null;
                  },
                  keyboardType: TextInputType.emailAddress,
                ),
              ],
            ),
            SizedBox(height: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Title Two",
                  style: TextStyle(fontSize: 18),
                ),
                SizedBox(height: 8),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: "Password",
                    border: OutlineInputBorder(),
                  ),
                  obscureText: true,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your password';
                    }
                    return null;
                  },
                ),
              ],
            ),
            SizedBox(height: 12),
            ElevatedButton(
              onPressed: () {
                // Add your onPressed logic here
              },
              child: Text('Login'),
            ),
            SizedBox(height: 20),
            Text(
              "Title Three",
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 12),
            Column(
              children: [
                RadioListTile(
                  title: Text("Title Four"),
                  value: 1,
                  groupValue: 1, // You should manage the group value
                  onChanged: (value) {},
                ),
                RadioListTile(
                  title: Text("Title Five"),
                  value: 2,
                  groupValue: 1, // You should manage the group value
                  onChanged: (value) {},
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
