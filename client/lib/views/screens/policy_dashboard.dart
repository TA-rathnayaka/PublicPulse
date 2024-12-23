import 'dummy_policies.dart';
import 'package:flutter/material.dart';
import 'package:client/views/constants/constants.dart';
import 'package:client/views/components/search_button.dart';
import 'package:client/views/components/dashboard_list_tile.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/views/screens/policy_screen.dart';

class PolicyDashboard extends StatefulWidget {
  static String id = '/policy-dashboard';

  const PolicyDashboard({super.key});

  @override
  _PolicyDashboardState createState() => _PolicyDashboardState();
}

class _PolicyDashboardState extends State<PolicyDashboard> {
  @override
  void initState() {
    super.initState();
    // Fetch policies when the screen loads
    // Provider.of<PoliciesProvider>(context, listen: false).fetchPolicies();
  }

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
                hintText: "Search policies...",
                onChanged: (value) {
                  // Set filtered policies based on the search query
                  // Provider.of<PoliciesProvider>(context, listen: false)
                  //     .setFilteredPolicies(value);
                },
              ),
              const SizedBox(height: 20),
              ListView.builder(
                physics: const NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                itemCount: dummy_policies.length,
                itemBuilder: (context, index) {
                  final policy = dummy_policies[index];
                  return FadeInUp(
                    duration: Duration(milliseconds: 1200 + index * 100),
                    child: DashboardListTile(
                      title: policy.title,
                      description: policy.description,
                      imageUrl:
                          policy.imageUrl ?? 'images/placeholder.png',
                      onTap: () {
                          Navigator.push(context, MaterialPageRoute(builder: (context) => PolicyScreen(policy: policy)));
                      },
                    ),
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
