import 'package:flutter/material.dart';
import 'package:client/models/policy.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/constants/constants.dart';
import 'package:toggle_switch/toggle_switch.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:animate_do/animate_do.dart';

class PolicyScreen extends StatelessWidget {
  static String id = '/policy-screen';
  final Policy policy;

  const PolicyScreen({super.key, required this.policy});

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
                PolicyCarousel(
                  images: policy.imageUrl != null ? [policy.imageUrl!] : [],
                ),
                Transform.translate(
                  offset: const Offset(0, -40),
                  child: Container(
                    decoration: BoxDecoration(
                        color: theme.scaffoldBackgroundColor,
                        borderRadius: const BorderRadius.only(
                            topRight: Radius.circular(20),
                            topLeft: Radius.circular(20))),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 20, vertical: 30),
                      child: FadeInUp(
                        duration: const Duration(milliseconds: 800),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              policy.title,
                              style: TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                                color: theme.primaryColor,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              policy.category,
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                                color: theme.textTheme.bodyLarge!.color!.withOpacity(0.7),
                              ),
                            ),

                            const SizedBox(height: 16),
                            Text(
                              policy.description,
                              style: TextStyle(
                                fontSize: 16,
                                color: theme.textTheme.bodyLarge!.color,
                                height: 1.5,
                              ),
                            ),
                            const SizedBox(height: 16),
                            Wrap(
                              spacing: 8,
                              runSpacing: 4,
                              children: [
                                ...policy.tags.take(5).map((tag) {
                                  return Chip(
                                    label: Text(
                                      tag,
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: theme.textTheme.bodyLarge!.color,
                                      ),
                                    ),
                                    backgroundColor: theme.primaryColor.withOpacity(0.1),
                                  );
                                }),
                                if (policy.tags.length > 5)
                                  Chip(
                                    label: Text(
                                      'More',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: Colors.white,
                                      ),
                                    ),
                                    backgroundColor: theme.primaryColor.withOpacity(0.7),
                                  ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            ExpansionTile(
                              title: Align(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  'More Details',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    color: theme.primaryColor,
                                  ),
                                ),
                              ),
                              children: [
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                                    child: Text(
                                      'Created on: ${policy.createdDate.toLocal().toString().split(' ')[0]}',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: theme.textTheme.bodyLarge!.color,
                                      ),
                                    ),
                                  ),
                                ),
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                                    child: Text(
                                      'Effective from: ${policy.effectiveDate?.toLocal().toString().split(' ')[0] ?? 'Not Set'}',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: theme.textTheme.bodyLarge!.color,
                                      ),
                                    ),
                                  ),
                                ),
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                                    child: Text(
                                      'Expiry Date: ${policy.expiryDate?.toLocal().toString().split(' ')[0] ?? 'No Expiry'}',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: theme.textTheme.bodyLarge!.color,
                                      ),
                                    ),
                                  ),
                                ),
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                                    child: Text(
                                      'Approval Date: ${policy.approvalDate?.toLocal().toString().split(' ')[0] ?? 'Not Approved'}',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: theme.textTheme.bodyLarge!.color,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 20),
                            Downloads(documentUrl: policy.pdfUrl),
                            Padding(
                              padding: const EdgeInsets.symmetric(vertical: 20),
                              child: FadeInUp(
                                duration: const Duration(milliseconds: 1000),
                                child: PrimaryButton(
                                  label: 'Close',
                                  onPressed: () {
                                    Navigator.pop(context);
                                  },
                                ),
                              ),
                            ),
                          ],
                        ),
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


class Downloads extends StatelessWidget {
  final String? documentUrl;

  const Downloads({super.key, this.documentUrl});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    if (documentUrl != null && documentUrl!.isNotEmpty) {
      return FadeInUp(
        duration: const Duration(milliseconds: 1000),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
              child: Container(
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: theme.primaryColorLight,
                    foregroundColor: theme.primaryColorDark,  // Icon and text color
                    padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 20),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  icon: Icon(
                    Icons.download,
                    color: theme.primaryColorDark,  // White icon for contrast
                  ),
                  label: const Text("Download"),
                  onPressed: () async {
                    if (documentUrl == null || documentUrl!.isEmpty) {
                      print('Document URL is null or empty');
                      return;
                    }
                    print('Attempting to launch: $documentUrl');
                    if (await canLaunchUrl(Uri.parse(documentUrl!))) {
                      await launchUrl(Uri.parse(documentUrl!),
                          mode: LaunchMode.externalApplication);
                      print('Launch successful: $documentUrl');
                    } else {
                      print('Failed to launch: $documentUrl');
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text("Could not launch download link."),
                        ),
                      );
                    }
                  },
                ),
              ),
            ),
            const SizedBox(width: 10), // Spacing between buttons
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(20),
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: theme.primaryColorLight,  // Lighter background color
                    foregroundColor: theme.primaryColorDark,  // Darker text color to contrast the light background
                    padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 20),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  icon: Icon(
                    Icons.preview,
                    color: theme.primaryColorDark,  // Darker icon for contrast
                  ),
                  label: const Text("Preview"),
                  onPressed: () async {
                    if (documentUrl != null && documentUrl!.isNotEmpty) {
                      if (await canLaunchUrl(Uri.parse(documentUrl!))) {
                        await launchUrl(Uri.parse(documentUrl!));
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text("Could not open the PDF preview."),
                          ),
                        );
                      }
                    }
                  },
                ),
              ),
            ),
          ],
        ),
      );
    } else {
      return FadeInUp(
        duration: const Duration(milliseconds: 900),
        child: Container(
          padding: const EdgeInsets.all(20),
          child: const Text("No documents available for download."),
        ),
      );
    }
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