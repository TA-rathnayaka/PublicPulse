import 'package:flutter/material.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/constants/profile_constants.dart';

class UserProfileScreen extends StatefulWidget {
  static const id = '/userProfile';

  @override
  _UserProfileScreenState createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends State<UserProfileScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _dobController = TextEditingController();
  final TextEditingController _presentAddressController = TextEditingController();
  final TextEditingController _permanentAddressController = TextEditingController();
  final TextEditingController _cityController = TextEditingController();
  final TextEditingController _postalCodeController = TextEditingController();
  final TextEditingController _countryController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _usernameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _dobController.dispose();
    _presentAddressController.dispose();
    _permanentAddressController.dispose();
    _cityController.dispose();
    _postalCodeController.dispose();
    _countryController.dispose();
    super.dispose();
  }

  void _handleSave() {
    // Handle save action
  }

  Widget _buildTextField({
    required String label,
    required TextEditingController controller,
    bool obscureText = false,
    bool isDate = false,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: kLabelTextStyle,
          ),
          SizedBox(height: 5),
          TextFormField(
            controller: controller,
            readOnly: isDate,
            obscureText: obscureText,
            decoration: kInputDecoration.copyWith(
              hintText: "Enter your $label",
              suffixIcon: isDate ? Icon(Icons.calendar_today, size: 20) : null,
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.symmetric(horizontal: kPaddingHorizontalUserProfileScreen),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 20),
            Center(
              child: Stack(
                children: [
                  CircleAvatar(
                    radius: kCircleAvatarRadiusUserProfileScreen,
                    backgroundImage: NetworkImage(
                      'https://example.com/profile_image.jpg', // Replace with actual image URL
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 4,
                    child: CircleAvatar(
                      radius: kEditIconRadiusUserProfileScreen,
                      backgroundColor: Colors.blue,
                      child: Icon(
                        Icons.edit,
                        color: Colors.white,
                        size: 16,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            _buildTextField(label: "Your Name", controller: _nameController),
            _buildTextField(label: "User Name", controller: _usernameController),
            _buildTextField(label: "Email", controller: _emailController),
            _buildTextField(label: "Password", controller: _passwordController, obscureText: true),
            _buildTextField(label: "Date of Birth", controller: _dobController, isDate: true),
            _buildTextField(label: "Present Address", controller: _presentAddressController),
            _buildTextField(label: "Permanent Address", controller: _permanentAddressController),
            _buildTextField(label: "City", controller: _cityController),
            _buildTextField(label: "Postal Code", controller: _postalCodeController),
            _buildTextField(label: "Country", controller: _countryController),
            SizedBox(height: 30),
            Center(
              child: PrimaryButton(
                label: 'Save',
                onPressed: _handleSave,
              ),
            ),
            SizedBox(height: 30),
          ],
        ),
      ),
    );
  }
}
