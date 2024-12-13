import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/views/constants/constants.dart';

class PolicyScreen extends StatelessWidget {
  static String id = '/policy-screen';

  final List<String> images;
  final String title;
  final String description;

  PolicyScreen({
    required this.images,
    required this.title,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          color: Colors.white,
          child: Column(
            children: <Widget>[
              PolicyCarousel(images: images),
              Transform.translate(
                offset: Offset(0, -40),
                child: PolicyDetails(
                  title: title,
                  description: description,
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
  final String title;
  final String description;

  PolicyDetails({required this.title, required this.description});

  @override
  Widget build(BuildContext context) {
    return FadeInUp(
      duration: Duration(milliseconds: 1000),
      child: ClipRRect(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(30),
          topRight: Radius.circular(30),
        ),
        child: Container(
          width: double.infinity,
          padding: EdgeInsets.all(30),
          decoration: BoxDecoration(color: Colors.white),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              _buildText(title, 26, FontWeight.bold, Colors.grey[800]),
              SizedBox(height: 15),
              _buildText(description, 18, FontWeight.normal, Colors.grey[600]),
              SizedBox(height: 30),
              _buildAcknowledgeButton(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildText(String text, double fontSize, FontWeight fontWeight, Color? color) {
    return FadeInUp(
      duration: Duration(milliseconds: 1200),
      child: Text(
        text,
        style: TextStyle(fontSize: fontSize, fontWeight: fontWeight, color: color),
      ),
    );
  }

  Widget _buildAcknowledgeButton(BuildContext context) {
    return FadeInUp(
      duration: Duration(milliseconds: 1500),
      child: PrimaryButton(
        onPressed: () {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Policy Acknowledged')),
          );
        },
        label: "Acknowledge",
      ),
    );
  }
}

class PolicyCarousel extends StatelessWidget {
  final List<String> images;

  PolicyCarousel({required this.images});

  @override
  Widget build(BuildContext context) {
    if (images.isEmpty) {
      return Center(
        child: Text(
          "No images available",
          style: TextStyle(fontSize: 18, color: Colors.grey),
        ),
      );
    }

    return Container(
      height: 300,
      child: PageView.builder(
        itemCount: images.length,
        itemBuilder: (context, index) {
          return FadeInUp(
            duration: Duration(milliseconds: 800),
            child: Container(
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: NetworkImage(images[index]),
                  fit: BoxFit.cover,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}