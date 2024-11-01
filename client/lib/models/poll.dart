class Poll {
  String title;
  String description;
  List<Map<String, int>> options;
  DateTime createDate;
  DateTime endDate;

  Poll({
    required this.title,
    required this.description,
    required this.options,
    required this.createDate,
    Duration? duration,
  }) : endDate = createDate.add(duration ?? Duration(days: 0));

  bool vote(String optionName) {
    for (var option in options) {
      if (option.containsKey(optionName)) {
        option[optionName] = (option[optionName] ?? 0) + 1;
        return true;
      }
    }
    return false;
  }

  Map<String, dynamic> getPollDetails() {
    List<Map<String, int>> formattedOptions = [];
    for (var option in options) {
      formattedOptions.add(option);
    }

    return {
      'title': title,
      'description': description,
      'createdOn': createDate.toLocal().toString(),
      'endsOn': endDate.toLocal().toString(),
      'options': formattedOptions,
    };
  }

  bool isActive() {
    return DateTime.now().isBefore(endDate);
  }
}
