import 'package:flutter/material.dart';

class Signup extends StatefulWidget {
  @override
  _SignupState createState() => _SignupState();
}

class _SignupState extends State<Signup> {
  final _formKey = GlobalKey<FormState>();

  // Controllers for text fields
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Signup Form'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CustomTextFormField(
                controller: _usernameController,
                hintText: 'Username',
                validationMessage: 'Username is required',
                isRequired: true,
              ),
              SizedBox(height: 16),
              CustomTextFormField(
                controller: _emailController,
                hintText: 'Email',
                validationMessage: 'Email is required',
                isRequired: true,
              ),
              SizedBox(height: 16),
              CustomTextFormField(
                controller: _passwordController,
                hintText: 'Password',
                validationMessage: 'Password is required',
                isRequired: true,
              ),
              SizedBox(height: 16),
              RadioGroup(
                titleFour: 'Male',
                titleFive: 'Female',
              ),
              SizedBox(height: 16),
              CustomButton(
                name: 'Submit',
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class CustomTextFormField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final String validationMessage;
  final bool isRequired;

  const CustomTextFormField({
    required this.controller,
    required this.hintText,
    required this.validationMessage,
    required this.isRequired,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: hintText,
        border: OutlineInputBorder(),
      ),
      validator: (value) {
        if (isRequired && (value == null || value.isEmpty)) {
          return validationMessage;
        }
        return null;
      },
    );
  }
}

class CustomButton extends StatelessWidget {
  final String name;

  const CustomButton({
    required this.name,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        // Handle form submission
        // Add logic to validate and submit the form
      },
      child: Text(name),
      style: ButtonStyle(
        padding: MaterialStateProperty.all(EdgeInsets.symmetric(vertical: 12)),
      ),
    );
  }
}

class RadioGroup extends StatefulWidget {
  final String titleFour;
  final String titleFive;

  const RadioGroup({
    required this.titleFour,
    required this.titleFive,
  });

  @override
  _RadioGroupState createState() => _RadioGroupState();
}

class _RadioGroupState extends State<RadioGroup> {
  int _selectedValue = 1;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        RadioListTile(
          value: 1,
          groupValue: _selectedValue,
          onChanged: (value) {
            setState(() {
              _selectedValue = value as int;
            });
          },
          title: Text(widget.titleFour),
        ),
        RadioListTile(
          value: 2,
          groupValue: _selectedValue,
          onChanged: (value) {
            setState(() {
              _selectedValue = value as int;
            });
          },
          title: Text(widget.titleFive),
        ),
      ],
    );
  }
}
