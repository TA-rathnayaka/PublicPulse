import 'dart:collection';
import 'package:flutter/foundation.dart';
import 'package:client/models/notifications.dart';
import 'package:client/services/notification_service.dart';

class NotificationProvider extends ChangeNotifier {
  final NotificationService notificationService = NotificationService();
  List<Notification> _notifications = [];

  NotificationProvider() {
    fetchNotifications();
  }

  UnmodifiableListView<Notification> get notifications => UnmodifiableListView(_notifications);

  Future<void> fetchNotifications() async {
    _notifications = await notificationService.getNotifications();
    notifyListeners();
  }

  void addNotification(Notification notification) {
    _notifications.add(notification);
    notifyListeners();
  }

  void removeNotification(int index) {
    if (index >= 0 && index < _notifications.length) {
      _notifications.removeAt(index);
      notifyListeners();
    }
  }

  void updateNotification(int index, Notification updatedNotification) {
    if (index >= 0 && index < _notifications.length) {
      _notifications[index] = updatedNotification;
      notifyListeners();
    }
  }
}
