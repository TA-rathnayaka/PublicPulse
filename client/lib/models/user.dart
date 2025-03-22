import 'package:client/services/auth_service.dart';
import 'package:client/services/user_service.dart';

class User {
  final UserService _storageService = UserService();
  final AuthService _authService = AuthService();
  final String uid;
  late String _displayName;
  late String _email;
  String? _imageUrl;
  String? _phoneNumber;

  User({required this.uid});

  static Future<User> create(String uid) async {
    User user = User(uid: uid);
    await user._initializeUserDetails();
    return user;
  }

  Future<void> _initializeUserDetails() async {
    try {
      Map<String, dynamic>? userDetails =
      await _storageService.getUserDetails();
      _displayName = userDetails['displayName'] ?? 'Unknown User';
      _email = userDetails['email'] ?? 'No Email';
      _imageUrl = userDetails['imageUrl'];
      _phoneNumber = userDetails['phoneNumber'];
        } catch (e) {
      // Handle errors while fetching user details
      _displayName = 'Unknown User';
      _email = 'No Email';
      _imageUrl = null;
      _phoneNumber = null;
    }
  }

  // Getters
  String get phoneNumber => _phoneNumber ?? '';
  String get imageUrl => _imageUrl ?? '';
  String get email => _email;
  String get displayName => _displayName;

  // Setters
  set phoneNumber(String value) {
    _phoneNumber = value;
  }

  set imageUrl(String value) {
    _imageUrl = value;
  }

  Future<void> setEmail(String value) async {
    try {
      await _authService.changeUserEmail(value);
      _email = value;
    } catch (e) {
      // Handle error while updating email
      throw Exception("Failed to update email: $e");
    }
  }

  // // Update user information and sync with storage
  // Future<void> updateUserInfo({
  //   String? email,
  //   String? imageUrl,
  //   String? phoneNumber,
  // }) async {
  //   if (email != null) {
  //     await setEmail(email);
  //   }
  //   if (imageUrl != null) _imageUrl = imageUrl;
  //   if (phoneNumber != null) _phoneNumber = phoneNumber;
  //
  //   try {
  //     await _storageService.updateUserDetails({
  //       'email': _email,
  //       'imageUrl': _imageUrl,
  //       'phoneNumber': _phoneNumber,
  //     });
  //   } catch (e) {
  //     // Handle error while updating user details in storage
  //     throw Exception("Failed to update user details: $e");
  //   }
  // }
}