import 'package:client/views/screens/_all.dart';
import 'package:flutter/material.dart';
import 'package:client/providers/user_provider.dart';
import 'package:client/providers/auth_provider.dart';
import 'package:provider/provider.dart';

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
    final userProvider=Provider.of<UserProvider>(context,listen: false);
    try{
      // Extract and split the full name into firstName and lastName
      final nameParts = nameController.text.trim().split(' ');
      final firstName = nameParts.isNotEmpty ? nameParts[0] : '';
      final lastName = nameParts.length > 1 ? nameParts.sublist(1).join(' ') : '';

      // Create a map with the updated user data
      final updatedData = {
        'firstName': firstName,
        'lastName': lastName,
        'username': usernameController.text.trim(),
        'email': emailController.text.trim(),
        'dob': dobController.text.trim(),
        'presentAddress': presentAddressController.text.trim(),
        'permanentAddress': permanentAddressController.text.trim(),
        'city': cityController.text.trim(),
        'postalCode': postalCodeController.text.trim(),
        'country': countryController.text.trim(),
      };

      // Call UserProvider to update the data in the database
      await userProvider.updateUserDetails(updatedData);

      // Show success feedback to the user
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Profile updated successfully!")),
      );

      notifyListeners();
    }
    catch(e){
      print("Error saving profile: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Failed to update profile.")),
      );
    }
  }



  bool validateProfile() {
    // Add validation logic (e.g., check if fields are empty)
    return true;
  }
}