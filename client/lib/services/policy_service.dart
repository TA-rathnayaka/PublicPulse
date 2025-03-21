import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/models/policy.dart';

class PolicyService {
  final FirebaseFirestore _fireStore = FirebaseFirestore.instance;

  Future<List<Policy>> getPolicies() async {
    try {
      QuerySnapshot snapshot = await _fireStore.collection('policies').get();

      List<Policy> policies = snapshot.docs.map((doc) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>? ?? {};

        // Date conversion helper
        DateTime? parseDate(dynamic value) {
          try {
            if (value == null) return null;
            if (value is String) return DateTime.parse(value);
            if (value is Timestamp) return value.toDate();
            return null;
          } catch (e) {
            print("Date parsing error: $e");
            return null;
          }
        }

        return Policy(
          id: doc.id,
          title: data['title'] as String? ?? '',
          description: data['description'] as String? ?? '',
          imageUrl: data['imageUrl'] as String?,
          creationDate: parseDate(data['createdDate']) ?? DateTime.now(),
          category: data['category'] as String,
          createdBy: data['createdBy'] as String,
          effectiveDate: parseDate(data['effectiveDate']),
          expiryDate: parseDate(data['expiryDate']),
          approvalDate: parseDate(data['approvalDate']),
          isActive: data['isActive'] as bool? ?? true,
          pdfUrl: data['pdfUrl'] as String?,
          tags: data['tags'] != null && data['tags'] is List
              ? List<String>.from(data['tags'].map((item) => item.toString()))
              : [],
        );
      }).toList();

      return policies;
    } catch (e, stackTrace) {
      print("Error fetching policies: $e");
      print("Stack trace: $stackTrace");
      return [];
    }
  }

  // Helper function to convert both String and Timestamp to DateTime
  DateTime _convertToDate(dynamic field) {
    if (field is Timestamp) {
      return field.toDate();
    } else if (field is String) {
      return DateTime.parse(field); // If it's a String, parse it as DateTime
    } else {
      return DateTime.now(); // Default to current date if it's neither
    }
  }
}
