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

  // Filter the list of policies based on the search query
  List<Policy> filterPolicies(String query) {
    if (query.isEmpty) {
      return _policies;
    }
    return _policies
        .where((policy) =>
    policy.title.toLowerCase().contains(query.toLowerCase()) ||
        policy.description.toLowerCase().contains(query.toLowerCase()))
        .toList();
  }
}
