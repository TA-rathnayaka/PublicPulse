import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:client/Providers/notification_provider.dart';

class NotificationScreen extends StatelessWidget {
  const NotificationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<NotificationProvider>(
        builder: (context, notificationProvider, child) {
          return SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(8, 12, 8, 12),
                  child: Column(
                    children: [
                      ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        shrinkWrap: true,
                        itemCount: notificationProvider.notifications.length,
                        itemBuilder: (context, index) {
                          final notification = notificationProvider.notifications[index];
                          return Padding(
                            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 14),
                            child: Row(
                              children: [
                                Icon(notification.isRead ? Icons.check : Icons.notifications), // Change icon based on read status
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text(
                                            notification.message, // Use message instead of title
                                            style: const TextStyle(fontSize: 16),
                                          ),
                                          Text(
                                            // Format the timestamp to a readable string
                                            '${notification.timestamp.hour}:${notification.timestamp.minute} ${notification.timestamp.day}/${notification.timestamp.month}/${notification.timestamp.year}',
                                            style: const TextStyle(fontSize: 12, color: Colors.grey),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        notification.isRead ? 'Read' : 'Unread', // Display read status
                                        style: const TextStyle(fontSize: 14, color: Colors.grey),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
