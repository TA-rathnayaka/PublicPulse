class User {
  late final String uid;
  String? _first_name;
  String? _last_name;
  String? _email;
  String? _image_url;
  String? _national_id;
  String? _district;
  String? _division;
  String? _phoneNumber;

  User({required this.uid});

  // Getters
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
    _email = value;
  }

  set last_name(String value) {
    _last_name = value;
  }

  set first_name(String value) {
    _first_name = value;
  }

  // New method to update user information
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
