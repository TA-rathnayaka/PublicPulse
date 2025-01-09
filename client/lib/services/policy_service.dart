import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/models/policy.dart';

class PolicyService {
  final FirebaseFirestore _fireStore = FirebaseFirestore.instance;

  Future<List<Policy>> getPolicies() async {
    try {
      QuerySnapshot snapshot = await _fireStore.collection('policies').get();
      print(snapshot.docs);

      List<Policy> policies = snapshot.docs.map((doc) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>;

        // Convert date fields
        dynamic createDateField = data['createdDate'];
        DateTime createDate = _convertToDate(createDateField);

        dynamic effectiveDateField = data['effectiveDate'];
        DateTime? effectiveDate = effectiveDateField != null ? _convertToDate(effectiveDateField) : null;

        dynamic expiryDateField = data['expiryDate'];
        DateTime? expiryDate = expiryDateField != null ? _convertToDate(expiryDateField) : null;

        dynamic approvalDateField = data['approvalDate'];
        DateTime? approvalDate = approvalDateField != null ? _convertToDate(approvalDateField) : null;

        // Ensure 'tags' is a List<String>
        List<String> tags = List<String>.from(data['tags'] ?? []);

        return Policy(
          id: doc.id,
          title: data['title'] ?? '',
          description: data['description'] ?? '',
          imageUrl: data['imageUrl'],
          creationDate: createDate,
          category: data['category'],
          createdBy: data['createdBy'],
          effectiveDate: effectiveDate,
          expiryDate: expiryDate,
          approvalDate: approvalDate,
          isActive: data['isActive'] ?? true,
          pdfUrl: data['pdfUrl'],
          tags: tags,
        );
      }).toList();

      return policies;
    } catch (e) {
      print("Error fetching policies: $e");
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
