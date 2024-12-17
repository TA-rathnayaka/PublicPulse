import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:client/models/policy.dart';

class PolicyService {
  final FirebaseFirestore _fireStore = FirebaseFirestore.instance;

  Future<List<Policy>> getPolicies() async {
    try {
      QuerySnapshot snapshot = await _fireStore.collection('policies').get();
      List<Policy> policies = snapshot.docs.map((doc) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>;

        // Handle null createDate
        Timestamp? createDateTimestamp = data['createDate'] as Timestamp?;
        DateTime createDate = createDateTimestamp?.toDate() ?? DateTime.now();

        return Policy(
          id: doc.id,
          title: data['title'] ?? '',
          description: data['description'] ?? '',
          imageUrl: data['imageUrl'],
          createDate: createDate,
        );
      }).toList();
      return policies;
    } catch (e) {
      print("Error fetching policies: $e");
      return [];
    }
  }


  // Create a new policy
  Future<void> createPolicy(Policy policy) async {
    try {
      await _fireStore.collection('policies').add({
        'title': policy.title,
        'description': policy.description,
        'imageUrl': policy.imageUrl,
        'createDate': policy.createDate,
      });
    } catch (e) {
      print("Error creating policy: $e");
    }
  }

  // Update an existing policy by ID
  Future<void> updatePolicy(String policyId, Policy updatedPolicy) async {
    try {
      await _fireStore.collection('policies').doc(policyId).update({
        'title': updatedPolicy.title,
        'description': updatedPolicy.description,
        'imageUrl': updatedPolicy.imageUrl,
        'createDate': updatedPolicy.createDate,
      });
    } catch (e) {
      print("Error updating policy: $e");
    }
  }

  // Delete a policy by ID
  Future<void> deletePolicy(String policyId) async {
    try {
      await _fireStore.collection('policies').doc(policyId).delete();
    } catch (e) {
      print("Error deleting policy: $e");
    }
  }
}