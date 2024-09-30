import 'package:flutter/material.dart';

class PreviewCard extends StatelessWidget {
  final String username;
  final String avatarPath;
  final String imageUrl;
  final String description;

  const PreviewCard({
    Key? key,
    required this.username,
    required this.avatarPath,
    required this.imageUrl,
    required this.description,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: [
          ListTile(
            leading: CircleAvatar(
              backgroundImage: AssetImage(avatarPath),
              radius: 15,
            ),
            title: Text(username, style: TextStyle(fontSize: 10)),
            trailing: Icon(Icons.arrow_drop_down_circle),
          ),
          Container(
            height: 336,
            width: double.infinity,
            child: Image.network(
              imageUrl,
              fit: BoxFit.cover,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              description,
              style: TextStyle(fontSize: 14),
            ),
          ),
        ],
      ),
    );
  }
}
