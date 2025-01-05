import 'package:client/providers/policy_provider.dart';
import 'package:provider/provider.dart';
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
  final TextEditingController _searchController = TextEditingController();
  List<dynamic> _filteredPolicies = dummy_policies;
  String? _selectedSort;
  List<String> _selectedTags = [];

  // GlobalKey for Scaffold
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final policiesProvider =
      Provider.of<PoliciesProvider>(context, listen: false);
      setState(() {
        _filteredPolicies = policiesProvider.policies;
      });
    });
  }

  void _filterAndSortPolicies() {
    final query = _searchController.text.trim().toLowerCase();

    setState(() {
      // Filter based on search query
      _filteredPolicies = dummy_policies.where((policy) {
        final matchesQuery = policy.title.toLowerCase().contains(query) ||
            policy.description.toLowerCase().contains(query);

        final matchesTags = _selectedTags.isEmpty ||
            _selectedTags.any((tag) => policy.tags.contains(tag));

        return matchesQuery && matchesTags;
      }).toList();

      // Sort based on selected sort criteria
      if (_selectedSort == "Title") {
        _filteredPolicies.sort((a, b) => a.title.compareTo(b.title));
      } else if (_selectedSort == "Date") {
        _filteredPolicies.sort((a, b) => a.date.compareTo(b.date));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      key: _scaffoldKey, // Assigning the GlobalKey
      appBar: AppBar(
        title: Text(
          "Policy",
          style: theme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.bold,
            color: theme.primaryColor,

          ),
        ),
        backgroundColor: theme.canvasColor,
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {
              _scaffoldKey.currentState?.openEndDrawer(); // Opening the drawer
            },
          ),
        ],
      ),
      endDrawer: Drawer(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: SafeArea(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Filter & Sort",
                  style: theme.textTheme.headlineSmall
                      ?.copyWith(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 16),
                Text("Sort by:", style: theme.textTheme.bodyLarge),
                DropdownButton<String>(
                  value: _selectedSort,
                  items: ["Title", "Date"]
                      .map((sort) => DropdownMenuItem<String>(
                    value: sort,
                    child: Text(sort),
                  ))
                      .toList(),
                  onChanged: (value) {
                    setState(() {
                      _selectedSort = value;
                    });
                  },
                ),
                const SizedBox(height: 16),
                Text("Filter by tags:", style: theme.textTheme.bodyLarge),
                Wrap(
                  spacing: 8.0,
                  children: ["Finance", "Health", "Technology"]
                      .map((tag) => FilterChip(
                    label: Text(tag),
                    selected: _selectedTags.contains(tag),
                    onSelected: (isSelected) {
                      setState(() {
                        if (isSelected) {
                          _selectedTags.add(tag);
                        } else {
                          _selectedTags.remove(tag);
                        }
                      });
                    },
                  ))
                      .toList(),
                ),
                const Spacer(),
                ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context); // Close the drawer
                    _filterAndSortPolicies();
                  },
                  child: const Text("Apply"),
                ),
              ],
            ),
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: kPaddingHorizontal),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 16),
              SearchButton(
                hintText: "Search policies...",
                onChanged: (value) {
                  setState(() {
                    _filterAndSortPolicies();
                  });
                },
              ),
              const SizedBox(height: 20),
              ListView.builder(
                physics: const NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                itemCount: _filteredPolicies.length,
                itemBuilder: (context, index) {
                  final policy = _filteredPolicies[index];
                  return FadeInUp(
                    duration: Duration(milliseconds: 1200 + index * 400),
                    child: DashboardListTile(
                      title: policy.title,
                      description: policy.description,
                      imageUrl: policy.imageUrl ?? 'images/placeholder.png',
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => PolicyScreen(policy: policy),
                          ),
                        );
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