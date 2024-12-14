import 'package:flutter/material.dart';
import 'package:client/services/user_service.dart';

class UserProvider with ChangeNotifier {
  final UserService _userService = UserService();
  Map<String, dynamic>? _userDetails;

  Map<String, dynamic>? get userDetails => _userDetails;

  Future<void> storeUserDetails(
      String? uid, String firstName, String lastName, String email) async {
    try {
      await _userService.storeUserDetails(uid, firstName, lastName, email);
      await getUserDetails(uid!); // Fetch the user details after storing
    } catch (e) {
      print("Error storing user details: $e");
    }
  }

  Future<void> getUserDetails(String uid) async {
    try {
      final userData = await _userService.getUserDetails(uid);
      if (userData != null) {
        _userDetails = userData;
        notifyListeners();
      }
    } catch (e) {
      print("Error fetching user details: $e");
    }
  }
}