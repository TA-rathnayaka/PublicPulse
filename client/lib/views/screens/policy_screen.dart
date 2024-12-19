import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/models/policy.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/constants/constants.dart';

class PolicyScreen extends StatelessWidget {
  static String id = '/policy-screen';

  final Policy policy;

  const PolicyScreen({super.key, required this.policy});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Policy Details'),
        backgroundColor: kPrimaryColor,
      ),
      body: SingleChildScrollView(
        child: Container(
          color: Colors.grey[100], // Soft background for better contrast
          child: Column(
            children: <Widget>[
              PolicyCarousel(
                images: policy.imageUrl != null ? [policy.imageUrl!] : [],
              ),
              SizedBox(height: 20),
              PolicyDetails(policy: policy),
              SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: PrimaryButton(
                  label: 'Close',
                  onPressed: () {
                    Navigator.pop(context); // Navigate back to the previous screen
                  },
                ),
              ),
            ],
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
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(30),
          topRight: Radius.circular(30),
        ),
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: const BoxDecoration(
            color: Colors.white,
            boxShadow: [
              BoxShadow(color: Colors.black26, blurRadius: 5, offset: Offset(0, 2))
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              _buildSectionTitle("General Information"),
              _buildPolicyDetail("Policy ID", policy.id),
              _buildPolicyDetail("Title", policy.title),
              _buildPolicyDetail("Description", policy.description),
              _buildPolicyDetail("Category", policy.category),
              _buildPolicyDetail("Tags", policy.tags.join(', ')),
              _buildPolicyDetail("Status", policy.status),

              SizedBox(height: 20),
              _buildSectionTitle("Important Dates"),
              _buildPolicyDetail("Creation Date", policy.creationDate.toLocal().toString().split(' ')[0]),
              _buildPolicyDetail("Effective Date", policy.effectiveDate?.toLocal().toString().split(' ')[0] ?? 'Not Set'),
              _buildPolicyDetail("Expiry Date", policy.expiryDate?.toLocal().toString().split(' ')[0] ?? 'No Expiry'),
              _buildPolicyDetail("Approval Date", policy.approvalDate?.toLocal().toString().split(' ')[0] ?? 'Not Approved'),

              SizedBox(height: 20),
              _buildSectionTitle("Additional Information"),
              _buildPolicyDetail("Assigned To", policy.assignedTo ?? 'Not Assigned'),
              _buildPolicyDetail("Approved By", policy.approvedBy ?? 'Not Approved'),
              _buildPolicyDetail("Notes", policy.notes ?? 'None'),
              _buildPolicyDetail("Is Active", policy.isActive ? 'Yes' : 'No'),
              _buildPolicyDetail("Currently Effective", policy.isCurrentlyEffective() ? 'Yes' : 'No'),
              _buildPolicyDetail("Expired", policy.isExpired() ? 'Yes' : 'No'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(top: 10, bottom: 5),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: Colors.grey[800],
        ),
      ),
    );
  }

  Widget _buildPolicyDetail(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: Row(
        children: <Widget>[
          Text(
            "$label: ",
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.grey[600],
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[800],
              ),
            ),
          ),
        ],
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

    return FadeInUp(
      duration: const Duration(milliseconds: 800),
      child: Container(
        width: double.infinity,
        height: 250, // Adjust the height for better visual balance
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
                Colors.grey.shade700.withOpacity(.7),
                Colors.grey.withOpacity(.0),
              ],
            ),
          ),
        ),
      ),
    );
  }
}