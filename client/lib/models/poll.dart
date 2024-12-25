class Poll {
  String? id;               // Document ID
  String title;
  String description;
  String? imageUrl;
  List<Option> options;     // List of Option objects
  DateTime createDate;
  DateTime endDate;

  Poll({
    this.id,
    required this.title,
    required this.description,
    this.imageUrl,
    required this.options,
    required this.createDate,
    Duration? duration,
  }) : endDate = createDate.add(duration ?? const Duration(days: 0));

  // Duration getter
  Duration get duration => endDate.difference(createDate);

  bool vote(String optionText) {
    for (var option in options) {
      if (option.text == optionText) {
        option.voteCount += 1;
        print("Vote recorded: Option '${option.text}' with ID '${option.optionId}'");
        return true;
      }
    }
    return false; // Option not found
  }

  Map<String, dynamic> getPollDetails() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'imageUrl': imageUrl,
      'createdOn': createDate.toLocal().toString(),
      'endsOn': endDate.toLocal().toString(),
      'options': options.map((option) => option.toMap()).toList(),
    };
  }

  bool isActive() {
    return DateTime.now().isBefore(endDate);
  }
}

class Option {
  String? optionId;  // Option ID (nullable)
  String text;
  int voteCount;

  Option({
    this.optionId,
    required this.text,
    this.voteCount = 0,
  });

  // Convert Option to a Map
  Map<String, dynamic> toMap() {
    return {
      'optionId': optionId,
      'text': text,
      'voteCount': voteCount,
    };
  }
}