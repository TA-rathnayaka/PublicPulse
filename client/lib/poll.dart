class Poll {
  final String question;
  final List<String> options;
  final List<int> votes;

  Poll({required this.question, required this.options})
      : votes = List<int>.filled(options.length, 0);

  void vote(int index) {
    votes[index]++;
  }
}
