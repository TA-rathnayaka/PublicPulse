import 'package:flutter/material.dart';

class PollCreationValidationProvider extends ChangeNotifier {
  TextEditingController titleController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  List<TextEditingController> optionControllers = [TextEditingController(), TextEditingController()];
  TextEditingController imageUrlController = TextEditingController();

  String? titleError;
  String? descriptionError;
  List<String?> optionErrors = [null, null]; // Initialize with one null for the first option
  String? imageUrlError;

  void addOptionField() {
    optionControllers.add(TextEditingController());
    optionErrors.add(null);
    notifyListeners();
  }

  void removeOptionField(int index) {
    optionControllers.removeAt(index);
    optionErrors.removeAt(index);
    notifyListeners();
  }

  bool isFormValid() {
    bool isValid = true;

    titleError = titleController.text.trim().isEmpty ? 'Title is required' : null;
    descriptionError = descriptionController.text.trim().isEmpty ? 'Description is required' : null;

    // Validate options
    if (optionControllers.isEmpty) {
      optionErrors = [];
    } else {
      optionErrors = optionControllers
          .map((controller) => controller.text.trim().isEmpty ? 'Option is required' : null)
          .toList();
    }

    imageUrlError = imageUrlController.text.trim().isEmpty ? 'Image URL is required' : null;

    isValid = titleError == null &&
        descriptionError == null &&
        !optionErrors.contains('Option is required') &&
        imageUrlError == null;

    notifyListeners();
    return isValid;
  }

  void clearInputs() {
    titleController.clear();
    descriptionController.clear();
    optionControllers = [TextEditingController(), TextEditingController()]; // Reset to a single option field
    imageUrlController.clear();

    titleError = null;
    descriptionError = null;
    optionErrors = [null, null]; // Match the initial state with one option error
    imageUrlError = null;

    notifyListeners();
  }
}