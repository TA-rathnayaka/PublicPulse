import 'package:client/services/auth_service.dart';
import 'package:flutter/material.dart';
import 'package:client/services/user_service.dart';

class UserProvider with ChangeNotifier {
  final UserService _userService = UserService();

  Map<String, dynamic>? _userDetails;

  Map<String, dynamic>? get userDetails => _userDetails;

  Future<void> storeUserDetails({
    String? displayName,
    String? photoUrl,
    String? phoneNumber,
    Map<String, dynamic>? customData,
  }) async {
    try {
      // Ensure the user is authenticated
      final user = UserService().getCurrentUser();
      if (user == null) {
        throw Exception("User is not authenticated.");
      }

      String uid = user.uid; // Get the current user's UID

      // Store user details through _userService
      await _userService.storeUserDetails(
        displayName: displayName,
        photoUrl: photoUrl,
        customData: {
          'uid': uid,
          'email': user.email,
          'displayName': displayName ?? user.displayName,
          'photoURL': photoUrl ?? user.photoURL,
          'phoneNumber': phoneNumber ?? user.phoneNumber,
          if (customData != null) ...customData,
        },
      );

      // Fetch the user details after storing them
      await getUserDetails(); // Fetch user details after storing them
    } catch (e) {
      print("Error storing user details: $e");
    }
  }

  Future<void> getUserDetails() async {
    try {
      final userData = await _userService.getUserDetails();
      if (userData != null) {
        _userDetails = userData;
        notifyListeners();
      }
    } catch (e) {
      print("Error fetching user details: $e");
    }
  }

  Future<void> getCurrentUserDetails() async {
    try {
      final userData = await _userService.getUserDetails();
      if (userData != null) {
        _userDetails = userData;

        notifyListeners();
      }
    } catch (e) {
      print("Error fetching user details: $e");
    }
  }

  Future<void> updateUserDetails(
      String? displayName,
      String? photoUrl,
      Map<String, dynamic>? userDetails,
      ) async {
    try {
      // Get the current user details from the user service
      final user = await _userService.getCurrentUser();

      if (user != null) {
        // Prepare the updated data
        Map<String, dynamic> updatedData = {
          if (userDetails != null) ...userDetails, // Spread userDetails to merge any custom data
        };

        // Call the user service to update user details
        await _userService.updateUserDetails(
          displayName,
          photoUrl,
          updatedData,
        );

        // Optionally fetch updated user details (if required)
        await getUserDetails();

        // Notify listeners to update UI (if using ChangeNotifier or similar)
        notifyListeners();
      }
    } catch (e) {
      print("Error updating user details: $e");
    }
  }
}
