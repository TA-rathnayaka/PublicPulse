import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/models/policy.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/constants/constants.dart';

class PolicyScreen extends StatelessWidget {
  static String id = '/policy-screen';

  final Policy policy;

  const PolicyScreen({super.key, required this.policy}); // Constructor accepts a Policy object

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          color: Colors.white,
          child: Column(
            children: <Widget>[
              PolicyCarousel(
                images: policy.imageUrl != null ? [policy.imageUrl!] : [],
              ),
              Transform.translate(
                offset: const Offset(0, -40),
                child: PolicyDetails(
                  title: policy.title,
                  description: policy.description,
                  createDate: policy.createDate,
                  endDate: policy.endDate,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class PolicyDetails extends StatefulWidget {
  final String title;
  final String description;
  final DateTime createDate;
  final DateTime endDate;

  const PolicyDetails({super.key, 
    required this.title,
    required this.description,
    required this.createDate,
    required this.endDate,
  });

  @override
  _PolicyDetailsState createState() => _PolicyDetailsState();
}

class _PolicyDetailsState extends State<PolicyDetails> {
  late DateTime endDate;

  @override
  void initState() {
    super.initState();
    endDate = widget.endDate;
  }

  void _extendPolicy() {
    setState(() {
      endDate = endDate.add(const Duration(days: 30)); // Extends the policy by 30 days
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Policy extended by 30 days')),
    );
  }

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
          padding: const EdgeInsets.all(30),
          decoration: const BoxDecoration(
            color: Colors.white,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              _buildText(widget.title, 26, FontWeight.bold, Colors.grey[800], 1300),
              const SizedBox(height: 15),
              _buildText("Created on: ${widget.createDate.toLocal().toString().split(' ')[0]}", 18, FontWeight.normal, Colors.grey[600], 1500),
              const SizedBox(height: 15),
              _buildText("Ends on: ${endDate.toLocal().toString().split(' ')[0]}", 18, FontWeight.bold, kPrimaryColor, 1700),
              const SizedBox(height: 15),
              _buildText(widget.description, 18, FontWeight.normal, Colors.grey[600], 1900),
              const SizedBox(height: 20),
              _buildExtendButton(),
            ],
          ),
        ),
      ),
    );
  }

  // Helper function to build text with animations
  Widget _buildText(String text, double fontSize, FontWeight fontWeight, Color? color, int duration) {
    return FadeInUp(
      duration: Duration(milliseconds: duration),
      child: Text(
        text,
        style: TextStyle(
          color: color,
          fontSize: fontSize,
          fontWeight: fontWeight,
        ),
      ),
    );
  }

  // Button to extend the policy duration
  Widget _buildExtendButton() {
    return FadeInUp(
      duration: const Duration(milliseconds: 2000),
      child: PrimaryButton(
        onPressed: _extendPolicy,
        label: "Extend Policy by 30 Days",
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
        height: 300,
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
                Colors.grey.shade700.withOpacity(.9),
                Colors.grey.withOpacity(.0),
              ],
            ),
          ),
        ),
      ),
    );
  }
}