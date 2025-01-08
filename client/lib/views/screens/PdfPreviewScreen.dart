import 'package:flutter/material.dart';
import 'package:flutter_pdfview/flutter_pdfview.dart';

class PdfPreviewScreen extends StatelessWidget {
  final String documentUrl;

  const PdfPreviewScreen({super.key, required this.documentUrl});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Document Preview"),
      ),
      body: PDFView(
        filePath: documentUrl,
        enableSwipe: true,
        swipeHorizontal: false,
        autoSpacing: true,
        pageFling: true,
        onError: (error) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text("Error loading document: $error")),
          );
        },
        onRender: (_pages) {},
        onViewCreated: (PDFViewController pdfViewController) {},
        onPageChanged: (int? page, int? total) {},
      ),
    );
  }
}
