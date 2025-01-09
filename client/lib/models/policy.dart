class Policy {
  final String id;
  String title;
  String description;
  String category;
  List<String> tags;
  String status;
  String createdBy;
  String? assignedTo;
  DateTime createdDate;
  DateTime? effectiveDate;
  DateTime? expiryDate;
  bool isActive;
  String? approvedBy;
  DateTime? approvalDate;
  String? imageUrl;
  String? pdfUrl;
  Map<String, dynamic> metadata;
  String? notes;

  Policy({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    this.tags = const [],
    this.status = 'Draft',
    required this.createdBy,
    this.assignedTo,
    DateTime? creationDate,
    this.effectiveDate,
    this.expiryDate,
    this.isActive = true,
    this.approvedBy,
    this.approvalDate,
    this.imageUrl,
    this.pdfUrl,
    this.metadata = const {},
    this.notes,
  }) : createdDate = creationDate ?? DateTime.now() {
    _validateDates();
  }

  /// Validate that expiry date is after the effective date and creation date.
  void _validateDates() {
    if (effectiveDate != null && effectiveDate!.isBefore(createdDate)) {
      throw ArgumentError('Effective date cannot be before the creation date.');
    }

    if (expiryDate != null && expiryDate!.isBefore(createdDate)) {
      throw ArgumentError('Expiry date cannot be before the creation date.');
    }

    if (expiryDate != null && effectiveDate != null && expiryDate!.isBefore(effectiveDate!)) {
      throw ArgumentError('Expiry date cannot be before the effective date.');
    }
  }

  /// Activate the policy.
  void activate() => isActive = true;

  /// Deactivate the policy.
  void deactivate() => isActive = false;

  /// Approve the policy.
  void approve(String approver) {
    approvedBy = approver;
    approvalDate = DateTime.now();
    status = 'Approved';
  }

  /// Check if the policy is currently effective.
  bool isCurrentlyEffective() {
    if (effectiveDate == null) return true;
    return DateTime.now().isAfter(effectiveDate!);
  }

  /// Check if the policy is expired.
  bool isExpired() {
    if (expiryDate == null) return false;
    return DateTime.now().isAfter(expiryDate!);
  }

  /// Convert the policy to a JSON-compatible map.
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'category': category,
      'tags': tags,
      'status': status,
      'createdBy': createdBy,
      'assignedTo': assignedTo,
      'creationDate': createdDate.toIso8601String(),
      'effectiveDate': effectiveDate?.toIso8601String(),
      'expiryDate': expiryDate?.toIso8601String(),
      'isActive': isActive,
      'approvedBy': approvedBy,
      'approvalDate': approvalDate?.toIso8601String(),
      'imageUrl': imageUrl,
      'documentUrl': pdfUrl,
      'metadata': metadata,

    };
  }

  /// Create a policy from a JSON map.
  factory Policy.fromJson(Map<String, dynamic> json) {
    return Policy(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      category: json['category'],
      tags: List<String>.from(json['tags'] ?? []),
      status: json['status'] ?? 'Draft',
      createdBy: json['createdBy'],
      assignedTo: json['assignedTo'],
      creationDate: DateTime.parse(json['creationDate']),
      effectiveDate: json['effectiveDate'] != null ? DateTime.parse(json['effectiveDate']) : null,
      expiryDate: json['expiryDate'] != null ? DateTime.parse(json['expiryDate']) : null,
      isActive: json['isActive'] ?? true,
      approvedBy: json['approvedBy'],
      approvalDate: json['approvalDate'] != null ? DateTime.parse(json['approvalDate']) : null,
      imageUrl: json['imageUrl'],
      pdfUrl: json['documentUrl'],
      metadata: Map<String, dynamic>.from(json['metadata'] ?? {}),
      notes: json['notes'],
    );
  }

  /// Display policy details.
  @override
  String toString() {
    return '''
Policy ID: $id
Title: $title
Description: $description
Category: $category
Tags: ${tags.join(', ')}
Status: $status
Created By: $createdBy
Assigned To: ${assignedTo ?? 'Not Assigned'}
Creation Date: ${createdDate.toIso8601String()}
Effective Date: ${effectiveDate != null ? effectiveDate!.toIso8601String() : 'Not Set'}
Expiry Date: ${expiryDate != null ? expiryDate!.toIso8601String() : 'No Expiry'}
Approved By: ${approvedBy ?? 'Not Approved'}
Approval Date: ${approvalDate != null ? approvalDate!.toIso8601String() : 'Not Approved'}
Image URL: ${imageUrl ?? 'No Image'}
Document URL: ${pdfUrl ?? 'No Document'}
Notes: ${notes ?? 'None'}
Status: ${isActive ? 'Active' : 'Inactive'}
Currently Effective: ${isCurrentlyEffective() ? 'Yes' : 'No'}
Expired: ${isExpired() ? 'Yes' : 'No'}
''';
  }
}