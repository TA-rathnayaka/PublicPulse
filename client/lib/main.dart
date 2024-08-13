import 'package:flutter/material.dart';
import 'poll.dart';

void main() {
  runApp(PublicPulseApp());
}

class PublicPulseApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Public Pulse',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSwatch(
          primarySwatch: Colors.deepPurple,
        ).copyWith(
          secondary: Colors.deepPurpleAccent,
        ),
        textTheme: TextTheme(
          titleLarge: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
          bodyMedium: TextStyle(fontSize: 16.0),
        ),
        fontFamily: 'Poppins',
      ),
      home: PollManagementScreen(),
    );
  }
}

class PollManagementScreen extends StatefulWidget {
  @override
  _PollManagementScreenState createState() => _PollManagementScreenState();
}

class _PollManagementScreenState extends State<PollManagementScreen> {
  final List<Poll> polls = [];

  void _createPoll(String question, List<String> options) {
    setState(() {
      polls.add(Poll(question: question, options: options));
    });
  }

  void _voteInPoll(int pollIndex, int optionIndex) {
    setState(() {
      polls[pollIndex].vote(optionIndex);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Public Pulse'),
      ),
      body: polls.isEmpty
          ? Center(
        child: Text(
          'No polls yet. Create one!',
          style: TextStyle(color: Colors.grey, fontSize: 18),
        ),
      )
          : ListView.builder(
        itemCount: polls.length,
        itemBuilder: (context, index) {
          return PollCard(
            poll: polls[index],
            onVote: (optionIndex) => _voteInPoll(index, optionIndex),
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showCreatePollDialog(context),
        label: Text('Create Poll'),
        icon: Icon(Icons.add),
      ),
    );
  }

  void _showCreatePollDialog(BuildContext context) {
    String question = '';
    List<String> options = ['', ''];

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              title: Text('Create Poll'),
              content: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    TextField(
                      onChanged: (value) {
                        question = value;
                      },
                      decoration: InputDecoration(
                        labelText: 'Poll Question',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    SizedBox(height: 10),
                    for (int i = 0; i < options.length; i++)
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 5.0),
                        child: TextField(
                          onChanged: (value) {
                            options[i] = value;
                          },
                          decoration: InputDecoration(
                            labelText: 'Option ${i + 1}',
                            border: OutlineInputBorder(),
                          ),
                        ),
                      ),
                    TextButton.icon(
                      onPressed: () {
                        setState(() {
                          options.add('');
                        });
                      },
                      icon: Icon(Icons.add_circle_outline),
                      label: Text('Add Option'),
                    ),
                  ],
                ),
              ),
              actions: <Widget>[
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: Text('Cancel'),
                ),
                ElevatedButton(
                  onPressed: () {
                    _createPoll(question, options);
                    Navigator.of(context).pop();
                  },
                  child: Text('Create'),
                ),
              ],
            );
          },
        );
      },
    );
  }
}

class PollCard extends StatelessWidget {
  final Poll poll;
  final Function(int) onVote;

  PollCard({required this.poll, required this.onVote});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15.0),
      ),
      elevation: 4.0,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              poll.question,
              style: Theme.of(context).textTheme.titleLarge,
            ),
            SizedBox(height: 10.0),
            for (int i = 0; i < poll.options.length; i++)
              GestureDetector(
                onTap: () => onVote(i),
                child: Container(
                  padding: EdgeInsets.symmetric(vertical: 10.0),
                  margin: EdgeInsets.symmetric(vertical: 5.0),
                  decoration: BoxDecoration(
                    color: Colors.deepPurple.shade50,
                    borderRadius: BorderRadius.circular(10.0),
                    border: Border.all(color: Colors.deepPurpleAccent),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(poll.options[i]),
                      Text('${poll.votes[i]} votes'),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
