import 'package:flutter/material.dart';

void main() {
  runApp(SettingsScreen());
}

class SettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Settings'),
          leading: IconButton(
            icon: Icon(Icons.arrow_back),
            onPressed: () {
              // Back navigation action
              Navigator.pop(context);
            },
          ),
        ),
        body: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 12),
              Center(
                child: Text(
                  'Settings Title',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ),
              SizedBox(height: 12),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // List view of settings options
                    _buildSettingsOption('Setting 1', Icons.settings),
                    _buildSettingsOption('Setting 2', Icons.lock),
                    _buildSettingsOption('Notifications', Icons.notifications),
                    _buildSettingsOption('Language', Icons.language),

                    SizedBox(height: 20),

                    // Preferences Section
                    Text(
                      'Preferences',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 10),
                    Wrap(
                      spacing: 8,
                      children: [
                        _buildChip('Option 1'),
                        _buildChip('Option 2'),
                        _buildChip('Option 3'),
                      ],
                    ),

                    SizedBox(height: 20),

                    // Horizontal Scroll with Radio Buttons
                    Text(
                      'App Preferences',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 10),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          _buildCustomRadio('Option A'),
                          _buildCustomRadio('Option B'),
                          _buildCustomRadio('Option C'),
                        ],
                      ),
                    ),

                    SizedBox(height: 20),

                    // Action Buttons
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildButton('Reset', Colors.grey),
                        _buildButton('Cancel', Colors.red),
                        _buildButton('Save Changes', Colors.blue),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSettingsOption(String title, IconData icon) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      onTap: () {},
    );
  }

  Widget _buildChip(String label) {
    return Chip(
      label: Text(label),
    );
  }

  Widget _buildCustomRadio(String label) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        children: [
          Radio(
            value: label,
            groupValue: 'selectedOption', // This can be tied to state for selection
            onChanged: (value) {},
          ),
          Text(label),
        ],
      ),
    );
  }

  Widget _buildButton(String label, Color color) {
    return ElevatedButton(
      onPressed: () {
        // Handle button press
      },
      child: Text(label),
      style: ElevatedButton.styleFrom(
        backgroundColor: color,
      ),
    );
  }
}
