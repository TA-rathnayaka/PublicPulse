import 'package:client/models/policy.dart';

List<Policy> dummy_policies = [
  Policy(
    id: 'P123',
    title: 'Privacy Policy',
    description: 'This policy ensures user data privacy.',
    category: 'Compliance',
    tags: ['privacy', 'data', 'security'],
    createdBy: 'admin',
    imageUrl: 'https://example.com/privacy-image.png',
    pdfUrl: 'https://example.com/privacy-policy.pdf',
    creationDate: DateTime.parse('2024-01-01'),
    effectiveDate: DateTime.parse('2024-01-01'), // Adjusted effective date
    expiryDate: DateTime.parse('2025-12-31'),
  ),
  Policy(
    id: 'P124',
    title: 'Terms of Service',
    description: 'This policy outlines the terms and conditions of using our service.',
    category: 'Legal',
    tags: ['terms', 'service', 'agreement'],
    createdBy: 'admin',
    imageUrl: 'https://example.com/terms-image.png',
    pdfUrl: 'https://example.com/terms-of-service.pdf',
    creationDate: DateTime.parse('2024-01-01'),
    effectiveDate: DateTime.parse('2024-01-01'), // Adjusted effective date
    expiryDate: DateTime.parse('2026-01-01'),
  ),
  Policy(
    id: 'P125',
    title: 'Cookie Policy',
    description: 'This policy explains how we use cookies on our website.',
    category: 'Compliance',
    tags: ['cookies', 'tracking', 'website'],
    createdBy: 'admin',
    imageUrl: 'https://example.com/cookie-image.png',
    pdfUrl: 'https://example.com/cookie-policy.pdf',
    creationDate: DateTime.parse('2024-01-01'),
    effectiveDate: DateTime.parse('2024-01-01'),
    expiryDate: DateTime.parse('2025-01-01'),
  ),
  Policy(
    id: 'P126',
    title: 'Refund Policy',
    description: 'This policy defines the terms and conditions for refunds.',
    category: 'Customer Service',
    tags: ['refund', 'payment', 'service'],
    createdBy: 'admin',
    imageUrl: 'https://example.com/refund-image.png',
    pdfUrl: 'https://example.com/refund-policy.pdf',
    creationDate: DateTime.parse('2024-02-01'),
    effectiveDate: DateTime.parse('2024-02-01'), // Adjusted effective date
    expiryDate: DateTime.parse('2025-02-01'),
  ),
  Policy(
    id: 'P127',
    title: 'Data Retention Policy',
    description: 'This policy outlines the duration for retaining user data.',
    category: 'Data Management',
    tags: ['data', 'storage', 'retention'],
    createdBy: 'admin',
    imageUrl: 'https://example.com/data-retention-image.png',
    pdfUrl: 'https://example.com/data-retention-policy.pdf',
    creationDate: DateTime.parse('2024-03-01'),
    effectiveDate: DateTime.parse('2024-03-01'), // Adjusted effective date
    expiryDate: DateTime.parse('2026-03-01'),
  ),
];