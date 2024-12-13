import 'package:flutter/material.dart';

class PollCreationValidationProvider with ChangeNotifier {
  final TextEditingController titleController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();

  // Ensure that optionControllers is initialized with two TextEditingControllers
  List<TextEditingController> optionControllers = [
    TextEditingController(),
    TextEditingController(),
  ];

  List<String?> optionErrors = [];
  String? titleError;
  String? descriptionError;

  // Ensure the form is valid by checking title, description, and options
  bool isFormValid() {
    titleError = titleController.text.trim().isEmpty ? 'Title is required' : null;
    descriptionError = descriptionController.text.trim().isEmpty ? 'Description is required' : null;

    // Ensure optionErrors has the same number of items as optionControllers
    optionErrors = List.generate(optionControllers.length, (index) {
      return optionControllers[index].text.trim().isEmpty ? 'Option ${index + 1} is required' : null;
    });

    // Notify listeners after validation
    notifyListeners();

    return titleError == null && descriptionError == null && !optionErrors.contains('Option is required');
  }

  // Add a new option field
  void addOptionField() {
    optionControllers.add(TextEditingController());
    optionErrors.add(null);
    notifyListeners();
  }

  // Remove an option field
  void removeOptionField(int index) {
    if (optionControllers.length > 2) {
      optionControllers[index].dispose();
      optionControllers.removeAt(index);
      optionErrors.removeAt(index);
      notifyListeners();
    }
  }

  // Clear all inputs
  void clearInputs() {
    titleController.clear();
    descriptionController.clear();
    for (var controller in optionControllers) {
      controller.clear();
    }
    optionErrors = [];
    titleError = null;
    descriptionError = null;
    notifyListeners();
  }
}