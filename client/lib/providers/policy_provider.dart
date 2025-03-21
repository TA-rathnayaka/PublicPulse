import 'dart:collection';
import 'package:flutter/foundation.dart';
import 'package:client/models/policy.dart';
import 'package:client/services/policy_service.dart';

class PoliciesProvider extends ChangeNotifier {
  final PolicyService storageService = PolicyService();
  List<Policy> _policies = [];
  List<Policy> _filteredPolicies = [];

  PoliciesProvider() {
    fetchPolicies();
  }

  UnmodifiableListView<Policy> get policies => UnmodifiableListView(_policies);
  List<Policy> get filteredPolicies => _filteredPolicies;

  // Fetch policies from service
  Future<void> fetchPolicies() async {
    try {
      _policies = await storageService.getPolicies();
      _filteredPolicies = _policies;
      notifyListeners();
    } catch (e) {
      print("Error fetching policies: $e");
    }
  }



  // Set filtered policies based on the search query
  void setFilteredPolicies(String query) {
    _filteredPolicies = filterPolicies(query);
    notifyListeners();
  }

  List<Policy> filterPolicies(String query) {
    if (query.isEmpty) {
      return List.from(_policies);
    }

    final searchLower = query.toLowerCase();

    return _policies.where((policy) {
      // Core content matches
      final titleMatch = policy.title.toLowerCase().contains(searchLower);
      final descMatch = policy.description.toLowerCase().contains(searchLower);

      // People-related matches
      final createdByMatch = policy.createdBy.toLowerCase().contains(searchLower);
      final assignedToMatch = policy.assignedTo?.toLowerCase().contains(searchLower) ?? false;
      final approvedByMatch = policy.approvedBy?.toLowerCase().contains(searchLower) ?? false;

      // Category and tags
      final categoryMatch = policy.category.toLowerCase().contains(searchLower);
      final tagsMatch = policy.tags.any((tag) =>
          tag.toLowerCase().contains(searchLower));

      // Status and flags
      final statusMatch = policy.status.toLowerCase().contains(searchLower);
      final activeMatch = policy.isActive.toString().toLowerCase().contains(searchLower);
      final effectiveMatch = policy.isCurrentlyEffective().toString().toLowerCase().contains(searchLower);
      final expiredMatch = policy.isExpired().toString().toLowerCase().contains(searchLower);

      // Date matches
      final createdDateMatch = policy.createdDate.toString().toLowerCase().contains(searchLower);
      final effectiveDateMatch = policy.effectiveDate?.toString().toLowerCase().contains(searchLower) ?? false;
      final expiryDateMatch = policy.expiryDate?.toString().toLowerCase().contains(searchLower) ?? false;
      final approvalDateMatch = policy.approvalDate?.toString().toLowerCase().contains(searchLower) ?? false;

      // Additional content
      final notesMatch = policy.notes?.toLowerCase().contains(searchLower) ?? false;

      // Combine all possible matches
      return titleMatch ||
          descMatch ||
          createdByMatch ||
          assignedToMatch ||
          approvedByMatch ||
          categoryMatch ||
          tagsMatch ||
          statusMatch ||
          activeMatch ||
          effectiveMatch ||
          expiredMatch ||
          createdDateMatch ||
          effectiveDateMatch ||
          expiryDateMatch ||
          approvalDateMatch ||
          notesMatch;
    }).toList();
  }
}