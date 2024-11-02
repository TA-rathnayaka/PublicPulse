import 'package:client/services/auth.dart';
import 'package:client/services/user_service.dart';

class User {
  final UserService _storageService = UserService();
  final AuthService _authService = AuthService();
  final String uid;
  String? _first_name;
  String? _last_name;
  String? _email;
  String? _image_url;
  String? _national_id;
  String? _district;
  String? _division;
  String? _phoneNumber;

  User({required this.uid});

  static Future<User> create(String uid) async {
    User user = User(uid: uid);
    await user._initializeUserDetails();
    return user;
  }

  Future<void> _initializeUserDetails() async {
    Map<String, dynamic>? userDetails =
        await _storageService.getUserDetails(uid);
    if (userDetails != null) {
      _first_name = userDetails['firstName'];
      _last_name = userDetails['lastName'];
      _email = userDetails['email'];
      _image_url = userDetails['imageUrl'];
      _national_id = userDetails['nationalId'];
      _district = userDetails['district'];
      _division = userDetails['division'];
      _phoneNumber = userDetails['phoneNumber'];
    }
  }


  String get phoneNumber => _phoneNumber ?? '';

  String get division => _division ?? '';

  String get district => _district ?? '';

  String get national_id => _national_id ?? '';

  String get image_url => _image_url ?? '';

  String get email => _email ?? '';

  String get last_name => _last_name ?? '';

  String get first_name => _first_name ?? '';

  // Setters
  set phoneNumber(String value) {
    _phoneNumber = value;
  }

  set division(String value) {
    _division = value;
  }

  set district(String value) {
    _district = value;
  }

  set national_id(String value) {
    _national_id = value;
  }

  set image_url(String value) {
    _image_url = value;
  }

  set email(String value) {
    _authService.changeUserEmail(value);
    _email = value;
  }

  set last_name(String value) {
    _last_name = value;
  }

  set first_name(String value) {
    _first_name = value;
  }

  void updateUserInfo({
    String? firstName,
    String? lastName,
    String? email,
    String? imageUrl,
    String? nationalId,
    String? district,
    String? division,
    String? phoneNumber,
  }) {
    if (firstName != null) _first_name = firstName;
    if (lastName != null) _last_name = lastName;
    if (email != null) _email = email;
    if (imageUrl != null) _image_url = imageUrl;
    if (nationalId != null) _national_id = nationalId;
    if (district != null) _district = district;
    if (division != null) _division = division;
    if (phoneNumber != null) _phoneNumber = phoneNumber;
  }
}
