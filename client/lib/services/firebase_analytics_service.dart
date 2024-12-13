import 'package:firebase_analytics/firebase_analytics.dart';

class FirebaseAnalyticsService {
  // Singleton pattern
  FirebaseAnalyticsService._privateConstructor();
  static final FirebaseAnalyticsService instance =
  FirebaseAnalyticsService._privateConstructor();

  // Firebase Analytics instance
  final FirebaseAnalytics analytics = FirebaseAnalytics.instance;

  // Method to log events


  // Example: Predefined method for button clicks
  Future<void> logButtonClick(String buttonName) async {
    await analytics.logEvent(
      name: 'button_click',
      parameters: {'button_name': buttonName, 'action': 'clicked'},
    );
  }
}
