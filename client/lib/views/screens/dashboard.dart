import 'package:flutter/material.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/views/components/search_button.dart';
import 'package:client/views/components/dashboard_list_tile.dart';
import 'package:client/models/polls_provider.dart';
import 'package:provider/provider.dart';

class Dashboard extends StatelessWidget {
  static String id = '/dashboard';

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: kPaddingHorizontal),
      child: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 10),
              const Text(
                "Polls",
                style: kHeadlineStyle,
              ),
              SizedBox(height: 12),
              SearchButton(
                hintText: "Search",
                onChanged: (id) {},
              ),
              const SizedBox(height: 16),
              // Use Consumer to listen for changes in PollsProvider
              Consumer<PollsProvider>(
                builder: (context, pollsProvider, child) {
                  return ListView.builder(
                    physics: NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: pollsProvider.polls.length,
                    itemBuilder: (context, index) {
                      final poll = pollsProvider.polls[index];
                      return DashboardListTile(
                        title: poll.title,
                        description: poll.description,
                        imageUrl: poll.imageUrl ?? 'default_image_url',
                        onTap: () {},
                      );
                    },
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
