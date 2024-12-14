import 'package:client/views/screens/_all.dart';
import 'package:flutter/material.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/views/components/search_button.dart';
import 'package:client/views/components/dashboard_list_tile.dart';
import 'package:client/Providers/polls_provider.dart';
import 'package:provider/provider.dart';
import 'package:client/providers/screens_providers/poll_screen_provider.dart';
import 'package:animate_do/animate_do.dart';

class Dashboard extends StatelessWidget {
  static String id = '/dashboard';

  const Dashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: kPaddingHorizontal),
      child: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 20),
              Text(
                "Polls",
                style: kHeadlineStyle.copyWith(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
              ),
              const SizedBox(height: 16),
              SearchButton(
                hintText: "Search polls...",
                onChanged: (value) {},
              ),
              const SizedBox(height: 20),
              Consumer<PollsProvider>(
                builder: (context, pollsProvider, child) {
                  return ListView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: pollsProvider.polls.length,
                    itemBuilder: (context, index) {
                      final poll = pollsProvider.polls[index];
                      return FadeInUp(
                        duration: Duration(milliseconds: 1200 + index * 100),
                        child: DashboardListTile(
                          title: poll.title,
                          description: poll.description,
                          imageUrl: poll.imageUrl ?? 'images/placeholder.png',
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => ChangeNotifierProvider(
                                  create: (_) => PollScreenProvider(),
                                  child: PollScreen(poll: poll),
                                ),
                              ),
                            );
                          },
                        ),
                      );
                    },
                  );
                },
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}