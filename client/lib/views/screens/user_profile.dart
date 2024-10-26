import 'package:client/views/components/top_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:avatars/avatars.dart';
import 'package:client/views/constants/constants.dart';

void main() {
  runApp(UserProfileScreen());
}

class UserProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: TopNavigationBar(),
        body: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(height: 28),
              Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Avatar(
                      name: 'Pasindu Jayasena',// Replace with a valid image asset
                    ),
                    SizedBox(width: 12),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Pasindu jayasena',
                          style: TextStyle(
                              fontSize: 20, fontWeight: FontWeight.bold),
                        ),
                        Text(
                          'pasindujaysena.edu@gmail.com',
                          style: TextStyle(
                              fontSize: 16, color: Colors.grey[600]),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              SizedBox(height: 28),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // User Information Section
                    Text(
                      'Account Information',
                      style: TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Icon(Icons.phone, size: 32),
                        SizedBox(width: 12),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Phone Number',
                              style: TextStyle(fontSize: 16),
                            ),
                            Text(
                              '+94 76 985 834',
                              style: TextStyle(
                                  fontSize: 16, color: Colors.grey[600]),
                            ),
                          ],
                        ),
                      ],
                    ),
                    SizedBox(height: 24),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Icon(Icons.location_on, size: 32),
                        SizedBox(width: 12),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Address',
                              style: TextStyle(fontSize: 16),
                            ),
                            Text(
                              '123 Street Name, City, Country',
                              style: TextStyle(
                                  fontSize: 16, color: Colors.grey[600]),
                            ),
                          ],
                        ),
                      ],
                    ),
                    SizedBox(height: 12),
                    Divider(thickness: 1, color: Colors.grey[300]),
                    SizedBox(height: 12),

                    // Chips Section
                    Text(
                      'Preferences',
                      style: TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 12),
                    Wrap(
                      spacing: 8,
                      children: [
                        _buildChip('Notifications'),
                        _buildChip('Dark Mode'),
                        _buildChip('Location Access'),
                      ],
                    ),
                    SizedBox(height: 24),

                    // Phone Number Input
                    Text(
                      'Phone Number',
                      style: TextStyle(fontSize: 16),
                    ),
                    SizedBox(height: 8),
                    TextFormField(
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Enter Phone Number',
                      ),
                    ),
                    SizedBox(height: 24),

                    // Action Buttons
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildButton('Cancel', Colors.grey),
                        _buildButton('Save Changes', Colors.blue),
                      ],
                    ),
                    SizedBox(height: 28),
                    Divider(thickness: 1, color: Colors.grey[300]),
                    SizedBox(height: 28),

                    // Log Out Button
                    Center(
                      child: _buildButton('Log Out', Colors.red),
                    ),
                    SizedBox(height: 12),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildChip(String label) {
    return Chip(
      label: Text(label),
    );
  }

  Widget _buildButton(String label, Color color) {
    return ElevatedButton(
      onPressed: () {
        // Handle button action
      },
      child: Text(label),
      style: ElevatedButton.styleFrom(
        backgroundColor: color, // This sets the background color
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      ),
    );
  }
}
