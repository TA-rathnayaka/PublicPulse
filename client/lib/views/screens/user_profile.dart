import 'package:client/views/screens/splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:client/views/components/identity.dart';
import 'package:client/views/components/profile_menu_row.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/constants/profile_constants.dart';
import 'package:client/providers/auth_provider.dart';
import 'package:provider/provider.dart';
import 'package:client/providers/user_provider.dart';

class UserProfileScreen extends StatefulWidget {
  static const id = '/combinedProfile';

  const UserProfileScreen({super.key});

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

  @override
  void initState() {
    super.initState();
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    userProvider.getCurrentUserDetails();
  }

  void _handleSave() {
    // Handle save action
  }

  void _signOut(BuildContext context) {
    Provider.of<MyAuthProvider>(context, listen: false).signOut();
    Navigator.pushReplacementNamed(context, SplashScreen.id);
  }

  void _showBottomSheet(Map<String, dynamic> user) {
    // Initialize controllers with user data
    _nameController.text = "${user['firstName'] ?? ''} ${user['lastName'] ?? ''}".trim();
    _usernameController.text = user['username'] ?? '';
    _emailController.text = user['email'] ?? '';
    _dobController.text = user['dob'] ?? '';
    _presentAddressController.text = user['presentAddress'] ?? '';
    _permanentAddressController.text = user['permanentAddress'] ?? '';
    _cityController.text = user['city'] ?? '';
    _postalCodeController.text = user['postalCode'] ?? '';
    _countryController.text = user['country'] ?? '';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return FractionallySizedBox(
          heightFactor: 0.7,
          child: Padding(
            padding: EdgeInsets.only(
              bottom: MediaQuery.of(context).viewInsets.bottom,
              left: 20,
              right: 20,
              top: 20,
            ),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildTextField(label: "Your Name", controller: _nameController),
                  _buildTextField(label: "User Name", controller: _usernameController),
                  _buildTextField(label: "Email", controller: _emailController),
                  _buildTextField(label: "Date of Birth", controller: _dobController, isDate: true),
                  _buildTextField(label: "Present Address", controller: _presentAddressController),
                  _buildTextField(label: "Permanent Address", controller: _permanentAddressController),
                  _buildTextField(label: "City", controller: _cityController),
                  _buildTextField(label: "Postal Code", controller: _postalCodeController),
                  _buildTextField(label: "Country", controller: _countryController),
                  const SizedBox(height: 20),
                  Center(
                    child: PrimaryButton(
                      label: 'Save',
                      onPressed: _handleSave,
                    ),
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ),
        );
      },
    );
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
          const SizedBox(height: 5),
          TextFormField(
            controller: controller,
            readOnly: isDate,
            obscureText: obscureText,
            decoration: kInputDecoration.copyWith(
              hintText: "Enter your $label",
              suffixIcon: isDate ? const Icon(Icons.calendar_today, size: 20) : null,
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
        title: const Text('Profile'),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),
            Row(
              children: [
                Text(
                  "Account",
                  style: GoogleFonts.poppins(
                    fontWeight: FontWeight.bold,
                    fontSize: 28,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            Consumer<UserProvider>(
              builder: (context, userProvider, child) {
                final user = userProvider.userDetails;

                return Identity(
                  imagePath: user?['profileImage'] ?? "assets/default_profile.jpg", // Dynamic image path
                  name: "${user?['firstName'] ?? ''} ${user?['lastName'] ?? ''}".trim(), // Handle null names
                  email: user?['email'] ?? "No email available", // Default email message
                  phoneNumber: user?['phoneNumber'] ?? "No phone number available", // Default phone number
                  onTap: () {
                    _showBottomSheet(user!);
                  }, // Your defined function
                );
              },
            ),
            const SizedBox(height: 20),
            Container(
              decoration: BoxDecoration(
                color: Colors.grey[100],
                borderRadius: BorderRadius.circular(12),
              ),
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    const MenuRow(icon: Icons.dark_mode, text: "Dark Mode"),
                    const Divider(),
                    const MenuRow(icon: Icons.card_giftcard_outlined, text: "Orders"),
                    const Divider(),
                    const MenuRow(icon: Icons.history, text: "Purchase History"),
                    const Divider(),
                    const MenuRow(icon: Icons.payment, text: "Payment Methods"),
                    const Divider(),
                    const MenuRow(icon: Icons.privacy_tip, text: "Privacy"),
                    const Divider(),
                    const MenuRow(icon: Icons.person, text: "Personal Info"),
                    const Divider(),
                    const MenuRow(icon: Icons.reviews_sharp, text: "Rewards"),
                    const Divider(),
                    const MenuRow(icon: Icons.settings, text: "Settings"),
                    const Divider(),
                    // Sign-out option using Consumer
                    Consumer<MyAuthProvider>(
                      builder: (context, authProvider, child) {
                        return MenuRow(
                          icon: Icons.exit_to_app,
                          text: "Sign Out",
                          onTap: () => _signOut(context),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}