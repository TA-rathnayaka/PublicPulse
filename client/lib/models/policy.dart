class Policy {
  String id;
  String title;
  String description;
  String? imageUrl;
  DateTime createDate;
  DateTime endDate;

  Policy({
    required this.id,
    required this.title,
    required this.description,
    this.imageUrl,
    required this.createDate,
    Duration? duration,
  }) : endDate = createDate.add(duration ?? const Duration(days: 0));

  // Duration getter to calculate the policy's validity period
  Duration get duration => endDate.difference(createDate);

  // Extend the end date by a given duration
  void extendPolicy(Duration extension) {
    endDate = endDate.add(extension);
  }

  // Get policy details as a map
  Map<String, dynamic> getPolicyDetails() {
    return {
      'title': title,
      'description': description,
      'imageUrl': imageUrl,
      'createdOn': createDate.toLocal().toString(),
      'endsOn': endDate.toLocal().toString(),
      'duration': '${duration.inDays} days',
    };
  }

  // Check if the policy is still active
  bool isActive() {
    return DateTime.now().isBefore(endDate);
  }
}