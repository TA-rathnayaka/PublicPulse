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
    final userId = "userId"; // Replace with actual user ID logic
    userProvider.getUserDetails(userId); // Fetch user details on init
  }

  void _handleSave() {
    // Handle save action
  }

  void _signOut(BuildContext context) {
    Provider.of<MyAuthProvider>(context, listen: false).signOut();
    Navigator.pushReplacementNamed(context, SplashScreen.id);
  }

  void _showBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: RoundedRectangleBorder(
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
                  _buildTextField(label: "Password", controller: _passwordController, obscureText: true),
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
            Identity(
              imagePath: "assets/toji.jpg",
              name: "Toji Fushiguro",
              email: "tojifushiguro@gmail.com",
              phoneNumber: "+123 456-789",
              onTap: _showBottomSheet,
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
                    MenuRow(icon: Icons.dark_mode, text: "Dark Mode"),
                    Divider(),
                    MenuRow(icon: Icons.card_giftcard_outlined, text: "Orders"),
                    Divider(),
                    MenuRow(icon: Icons.history, text: "Purchase History"),
                    Divider(),
                    MenuRow(icon: Icons.payment, text: "Payment Methods"),
                    Divider(),
                    MenuRow(icon: Icons.privacy_tip, text: "Privacy"),
                    Divider(),
                    MenuRow(icon: Icons.person, text: "Personal Info"),
                    Divider(),
                    MenuRow(icon: Icons.reviews_sharp, text: "Rewards"),
                    Divider(),
                    MenuRow(icon: Icons.settings, text: "Settings"),
                    Divider(),
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