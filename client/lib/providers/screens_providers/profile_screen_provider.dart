
import 'package:flutter/material.dart';


class ProfileScreenProvider with ChangeNotifier {
  // Controllers
  final TextEditingController nameController = TextEditingController();
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController dobController = TextEditingController();
  final TextEditingController presentAddressController = TextEditingController();
  final TextEditingController permanentAddressController = TextEditingController();
  final TextEditingController cityController = TextEditingController();
  final TextEditingController postalCodeController = TextEditingController();
  final TextEditingController countryController = TextEditingController();

  void initializeProfile(Map<String, dynamic> user) {
    nameController.text = "${user['firstName'] ?? ''} ${user['lastName'] ?? ''}".trim();
    usernameController.text = user['username'] ?? '';
    emailController.text = user['email'] ?? '';
    dobController.text = user['dob'] ?? '';
    presentAddressController.text = user['presentAddress'] ?? '';
    permanentAddressController.text = user['permanentAddress'] ?? '';
    cityController.text = user['city'] ?? '';
    postalCodeController.text = user['postalCode'] ?? '';
    countryController.text = user['country'] ?? '';
  }

  void disposeControllers() {
    nameController.dispose();
    usernameController.dispose();
    emailController.dispose();
    dobController.dispose();
    presentAddressController.dispose();
    permanentAddressController.dispose();
    cityController.dispose();
    postalCodeController.dispose();
    countryController.dispose();
  }

  Future<void> saveProfile(BuildContext context) async {
    // Add logic to save the profile (e.g., make API calls)
    // After saving, notify listeners or update UI accordingly
  }



  bool validateProfile() {
    // Add validation logic (e.g., check if fields are empty)
    return true;
  }
}