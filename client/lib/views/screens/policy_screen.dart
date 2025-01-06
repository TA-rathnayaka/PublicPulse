import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/models/policy.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/constants/constants.dart';
import 'package:toggle_switch/toggle_switch.dart';
class PolicyScreen extends StatefulWidget {
  static String id = '/policy-screen';
  final Policy policy;

  const PolicyScreen({super.key, required this.policy});

  @override
  _PolicyScreenState createState() => _PolicyScreenState();
}

class _PolicyScreenState extends State<PolicyScreen> {
  int _selectedIndex = 0; // Track the selected index for the ToggleSwitch

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Container(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                // Apply Translate effect to PolicyCarousel
                PolicyCarousel(
                  images: widget.policy.imageUrl != null
                      ? [widget.policy.imageUrl!]
                      : [],
                ),

                // Wrap ToggleSwitch and PrimaryButton with Column
                Transform.translate(
                  offset: Offset(0, -40),
                  child: Container(
                    decoration: BoxDecoration(
                        color: theme.scaffoldBackgroundColor, // Use theme primary color with opacity

                        borderRadius: BorderRadius.only(topRight: Radius.circular(20), topLeft: Radius.circular(20))
                    ),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                      child: Column(
                        children: [
                          FadeInUp(
                            duration: const Duration(milliseconds: 1000),
                            child: ToggleSwitch(
                              minWidth: 90.0,
                              minHeight: 70.0,
                              initialLabelIndex: _selectedIndex,
                              cornerRadius: 20.0,
                              activeFgColor: Colors.white,
                              inactiveBgColor: Colors.grey,
                              inactiveFgColor: Colors.white,
                              totalSwitches: 4,
                              // Increase totalSwitches to match the sections
                              icons: const [
                                Icons.summarize_outlined,
                                Icons.info,
                                Icons.date_range,
                                Icons.download
                              ],
                              iconSize: 30.0,
                              activeBgColors: const [
                                [Colors.black45, Colors.black26],
                                // for Policy Details
                                [Colors.yellow, Colors.orange],
                                // for Policy Dates
                                [Colors.green, Colors.blue],
                                // for Section 3 (you can define another section)
                                [Colors.red, Colors.pink]
                                // for Section 4 (you can define another section)
                              ],
                              animate: true,
                              curve: Curves.bounceInOut,
                              onToggle: (index) {
                                setState(() {
                                  _selectedIndex = index ?? 0;
                                });
                                print('switched to: $index');
                              },
                            ),
                          ),
                          // Add additional Transform.translate effects for the content sections
                          if (_selectedIndex == 0)
                            Summary(),
                          if (_selectedIndex == 1)
                            PolicyDetails(policy: widget.policy),
                          if (_selectedIndex == 2)
                            PolicyDates(policy: widget.policy),
                          if (_selectedIndex == 3)
                            Downloads(),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 20),
                            child: PrimaryButton(
                              label: 'Close',
                              onPressed: () {
                                Navigator.pop(context);
                              },
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
class PolicyDetails extends StatelessWidget {
  final Policy policy;

  const PolicyDetails({super.key, required this.policy});

  @override
  Widget build(BuildContext context) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1000),
      child: ClipRRect(
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Theme.of(context).scaffoldBackgroundColor,
            // Use context to get theme color
            // Rounded corners for a softer design
            boxShadow: const [],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              _buildSectionTitle(context, "General Information"),
              // Pass context to the method
              SizedBox(height: 16),
              // Added spacing for readability
              _buildExpandableSection(
                context: context, // Pass context to the method
                title: "Policy ID: ${policy.id}",
                content: [
                  _buildPolicyDetail(context, "Title", policy.title),
                  _buildPolicyDetail(
                      context, "Description", policy.description),
                  _buildPolicyDetail(context, "Category", policy.category),
                  _buildPolicyDetail(context, "Tags", policy.tags.join(', ')),
                  _buildPolicyDetail(context, "Status", policy.status),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(BuildContext context, String title) {
    return Padding(
      padding: const EdgeInsets.only(top: 10, bottom: 10),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: Theme.of(context)
              .textTheme
              .bodyMedium
              ?.color, // Use context to get the text color
        ),
      ),
    );
  }

  Widget _buildPolicyDetail(BuildContext context, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: <Widget>[
          const Icon(Icons.info_outline, color: Colors.blue, size: 18),
          const SizedBox(width: 10),
          Text(
            "$label: ",
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
              color: Theme.of(context)
                  .textTheme
                  .bodyMedium
                  ?.color
                  ?.withOpacity(0.7), // Use context for color
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: TextStyle(
                fontSize: 16,
                color: Theme.of(context)
                    .textTheme
                    .bodyMedium
                    ?.color, // Use context for color
                fontWeight: FontWeight.w400,
              ),
              overflow: TextOverflow.ellipsis, // Ensure text doesn't overflow
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExpandableSection({
    required BuildContext context,
    required String title,
    required List<Widget> content,
  }) {
    return ExpansionTile(
      title: Text(
        title,
        style: const TextStyle(
            fontSize: 16, fontWeight: FontWeight.w500, color: Colors.black),
      ),
      initiallyExpanded: false,
      tilePadding: const EdgeInsets.symmetric(vertical: 10),
      // Improved padding for better touch targets
      expandedAlignment: Alignment.topLeft,
      iconColor:
      Theme.of(context).iconTheme.color,
      children: content, // Use context for icon color
    );
  }
}

class PolicyDates extends StatelessWidget {
  final Policy policy;

  const PolicyDates({super.key, required this.policy});

  @override
  Widget build(BuildContext context) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1000),
      child: ClipRRect(
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: const BoxDecoration(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              _buildSectionTitle("Important Dates"),
              _buildExpandableSection(
                title:
                "Creation Date: ${policy.createdDate.toLocal().toString().split(' ')[0]}",
                content: [
                  _buildPolicyDetail(
                      "Effective Date",
                      policy.effectiveDate
                          ?.toLocal()
                          .toString()
                          .split(' ')[0] ??
                          'Not Set'),
                  _buildPolicyDetail(
                      "Expiry Date",
                      policy.expiryDate?.toLocal().toString().split(' ')[0] ??
                          'No Expiry'),
                  _buildPolicyDetail(
                      "Approval Date",
                      policy.approvalDate?.toLocal().toString().split(' ')[0] ??
                          'Not Approved'),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(top: 10, bottom: 10),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: Colors.grey[700],
        ),
      ),
    );
  }

  Widget _buildPolicyDetail(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: <Widget>[
          const Icon(Icons.info_outline, color: kPrimaryColor, size: 18),
          const SizedBox(width: 10),
          Text(
            "$label: ",
            style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
                color: Colors.grey[600]),
          ),
          Expanded(
            child: Text(
              value,
              style: TextStyle(
                  fontSize: 16,
                  color: Colors.grey[800],
                  fontWeight: FontWeight.w400),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExpandableSection(
      {required String title, required List<Widget> content}) {
    return ExpansionTile(
      title: Text(
        title,
        style: const TextStyle(
            fontSize: 16, fontWeight: FontWeight.w500, color: Colors.black),
      ),
      initiallyExpanded: false,
      children: content,
    );
  }
}

class Summary extends StatelessWidget {
  const Summary({super.key});

  @override
  Widget build(BuildContext context) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1000),
      child: Container(
        padding: const EdgeInsets.all(20),
        child: const Text("Summary goes here."),
      ),
    );
  }
}

class Downloads extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1000),
      child: Container(
        padding: const EdgeInsets.all(20),
        child: const Text("Downloads goes here."),
      ),
    );
  }
}

class PolicyCarousel extends StatelessWidget {
  final List<String> images;

  const PolicyCarousel({super.key, required this.images});

  @override
  Widget build(BuildContext context) {
    if (images.isEmpty) {
      return const Center(
        child: Text(
          "No images available",
          style: TextStyle(fontSize: 18, color: Colors.grey),
        ),
      );
    }

    return FadeIn(
      duration: const Duration(milliseconds: 800),
      child: Container(
        width: double.infinity,
        height: 250,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: NetworkImage(images.first),
            fit: BoxFit.cover,
          ),
        ),
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.bottomRight,
              colors: [
                Colors.black.withOpacity(0.6),
                Colors.transparent,
              ],
            ),
          ),
        ),
      ),
    );
  }
}
