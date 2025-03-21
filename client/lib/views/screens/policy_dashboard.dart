import 'package:client/providers/policy_provider.dart';
import 'package:client/providers/screens_providers/policy_screen_provider.dart';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/views/components/search_button.dart';
import 'package:client/views/components/dashboard_list_tile.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/views/screens/policy_screen.dart';
import 'package:client/providers/comment_provider.dart';

class PolicyDashboard extends StatelessWidget {
  static String id = '/policy-dashboard'; // Fixed ID name

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
                "Policies", // Changed to "Policies" for consistency
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: theme.primaryColor,
                ),
              ),
              const SizedBox(height: 16),
              SearchButton(
                hintText: "Search policies...", // Updated hint text
                onChanged: (value) {
                  // Call setFilteredPolicies when the search query changes
                  Provider.of<PoliciesProvider>(context, listen: false).setFilteredPolicies(value);
                },
              ),
              const SizedBox(height: 20),
              Consumer2<PoliciesProvider, CommentProvider>(
                builder: (context, policiesProvider,commentProvider, child) {
                  return ListView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: policiesProvider.filteredPolicies.length, // Use filteredPolicies here
                    itemBuilder: (context, index) {
                      final policy = policiesProvider.filteredPolicies[index]; // Use filteredPolicies here
                      return FadeInUp(
                        duration: Duration(milliseconds: 1200 + index * 400),
                        child: DashboardListTile(
                          title: policy.title ?? "No title",
                          description: policy.description ?? "No description",
                          imageUrl:
                          policy.imageUrl ?? 'images/placeholder.png',
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => MultiProvider(
                                  providers: [
                                    ChangeNotifierProvider(
                                      create: (_) => PolicyScreenProvider(),
                                    ),
                                    ChangeNotifierProvider.value(
                                      value: policiesProvider,
                                    ),
                                    ChangeNotifierProvider.value(
                                      value: commentProvider,
                                    )
                                  ],
                                  child: PolicyScreen(policy: policy),
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