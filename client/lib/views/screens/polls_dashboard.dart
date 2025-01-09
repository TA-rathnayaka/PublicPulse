import 'package:client/views/screens/_all.dart';
import 'package:flutter/material.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/views/components/search_button.dart';
import 'package:client/views/components/dashboard_list_tile.dart';
import 'package:client/Providers/polls_provider.dart';
import 'package:provider/provider.dart';
import 'package:client/providers/screens_providers/poll_screen_provider.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/models/poll.dart';
import 'dart:io';
import 'package:flutter/cupertino.dart';

class PollDashboard extends StatelessWidget {
  static String id = '/poll-dashboard';

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

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
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: theme.primaryColor,
                ),
              ),
              const SizedBox(height: 16),
              SearchButton(
                hintText: "Search polls...",
                onChanged: (value) {
                  Provider.of<PollsProvider>(context, listen: false).setSearchTerm(value);                },
              ),
              const SizedBox(height: 20),
              Consumer<PollsProvider>(
                builder: (context, pollsProvider, child) {
                  if (pollsProvider.polls == null ||
                      pollsProvider.polls.isEmpty) {
                    return
                      Center(child: CircularProgressIndicator());
                  }

                  return ListView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: pollsProvider.polls.length,
                    itemBuilder: (context, index) {
                      Poll? poll = pollsProvider.polls[index];
                      return FadeInUp(
                        duration: Duration(milliseconds: 1200 + index * 400),
                        child: DashboardListTile(
                          title: poll.title ?? "No title",
                          description: poll.description ?? "No description",
                          imageUrl: poll.imageUrl ?? 'images/placeholder.png',
                          onTap: () async {
                            pollsProvider.setSelectedIndex(index);
                            poll = await pollsProvider.getPollByIndex();
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) =>
                                    MultiProvider(
                                      providers: [
                                        ChangeNotifierProvider(
                                            create: (_) =>
                                                PollScreenProvider()),
                                        ChangeNotifierProvider.value(
                                            value: pollsProvider),
                                      ],
                                      child: PollScreen(poll: poll!),
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
