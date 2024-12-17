import 'package:client/providers/screens_providers/theme_provider.dart';
import 'package:client/views/screens/_all.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:client/views/components/identity.dart';
import 'package:client/views/components/profile_menu_row.dart';
import 'package:client/views/components/primary_button.dart';
import 'package:client/providers/auth_provider.dart';
import 'package:provider/provider.dart';
import 'package:client/providers/screens_providers/profile_screen_provider.dart';
import 'package:client/providers/user_provider.dart';
import 'package:animate_do/animate_do.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';

class UserProfileScreen extends StatelessWidget {
  static const id = '/combinedProfile';

  const UserProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    bool showSpinner=false;
    return ChangeNotifierProvider(
      create: (_) => ProfileScreenProvider(),
      child: Consumer<ProfileScreenProvider>(
        builder: (context, profileProvider, child) {
          return SafeArea(
            child: Scaffold(
              body: ModalProgressHUD(
                inAsyncCall: showSpinner,
                child: SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 15),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 20),
                      FadeIn(
                        duration: const Duration(milliseconds: 500),
                        child: Row(
                          children: [
                            Text(
                              "Account",
                              style: GoogleFonts.poppins(
                                fontWeight: FontWeight.bold,
                                fontSize: 28,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),
                      FadeIn(
                        duration: const Duration(milliseconds: 500),
                        child: Consumer<UserProvider>(
                          builder: (context, userProvider, child) {
                            final user = userProvider.userDetails;

                            if (user == null) {
                              return const Center(
                                  child: CircularProgressIndicator());
                            }

                            profileProvider.initializeProfile(user);

                            return Identity(
                              imagePath: user['profileImage'] ??
                                  "assets/default_profile.jpg",
                              name:
                                  "${user['firstName'] ?? ''} ${user['lastName'] ?? ''}"
                                      .trim(),
                              email: user['email'] ?? "No email available",
                              phoneNumber: user['phoneNumber'] ??
                                  "No phone number available",
                              // onTap: () {
                              //   _showBottomDialog(context, profileProvider);
                              // },
                            );
                          },
                        ),
                      ),
                      const SizedBox(height: 20),
                      FadeIn(
                        duration: const Duration(milliseconds: 500),
                        child: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(20),
                            child: Column(
                              children: [
                                FadeInUp(
                                  duration: const Duration(milliseconds: 500),
                                  child: Consumer<ThemeProvider>(
                                    builder: (context, themeProvider, child) {
                                      return MenuRow(
                                        icon: Icons.dark_mode,
                                        text: themeProvider.isDarkMode
                                            ? "Dark Mode"
                                            : "Light Mode",
                                        onTap: () {
                                          themeProvider.toggleTheme();
                                        },
                                      );
                                    },
                                  ),
                                ),
                                const Divider(),
                                FadeInUp(
                                  duration: const Duration(milliseconds: 500),
                                  child: MenuRow(
                                    icon: Icons.privacy_tip,
                                    text: "Privacy",
                                  ),
                                ),
                                const Divider(),
                                FadeInUp(
                                  duration: const Duration(milliseconds: 500),
                                  child: MenuRow(
                                    icon: Icons.person,
                                    text: "Personal Info",
                                    onTap: () {
                                      _showBottomDialog(context, profileProvider);
                                    },
                                  ),
                                ),
                                const Divider(),
                                FadeInUp(
                                  duration: const Duration(milliseconds: 500),
                                  child: Consumer<MyAuthProvider>(
                                    builder: (context, authProvider, child) {
                                      return MenuRow(
                                        icon: Icons.exit_to_app,
                                        text: "Sign Out",
                                        onTap: () {
                                          Provider.of<MyAuthProvider>(context,
                                                  listen: false)
                                              .signOut();
                                          Navigator.pushReplacementNamed(
                                              context, SplashScreen.id);
                                        },
                                      );
                                    },
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  void _showBottomDialog(
      BuildContext context, ProfileScreenProvider profileProvider) {
    showGeneralDialog(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Dismiss',
      transitionDuration: const Duration(milliseconds: 500),
      pageBuilder: (context, animation, secondaryAnimation) {
        return SafeArea(
          child: Align(
            alignment: Alignment.bottomCenter,
            child: Material(
              color: Colors.white,
              borderRadius:
                  const BorderRadius.vertical(bottom: Radius.circular(20)),
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      _buildTextField(context,
                          label: "Your Name",
                          controller: profileProvider.nameController),
                      _buildTextField(context,
                          label: "User Name",
                          controller: profileProvider.usernameController),
                      _buildTextField(context,
                          label: "Email",
                          controller: profileProvider.emailController),
                      _buildTextField(context,
                          label: "Date of Birth",
                          controller: profileProvider.dobController,
                          isDate: true),
                      _buildTextField(context,
                          label: "Present Address",
                          controller: profileProvider.presentAddressController),
                      _buildTextField(context,
                          label: "Permanent Address",
                          controller:
                              profileProvider.permanentAddressController),
                      _buildTextField(context,
                          label: "City",
                          controller: profileProvider.cityController),
                      _buildTextField(context,
                          label: "Postal Code",
                          controller: profileProvider.postalCodeController),
                      _buildTextField(context,
                          label: "Country",
                          controller: profileProvider.countryController),
                      const SizedBox(height: 20),
                      Center(
                        child: PrimaryButton(
                          label: 'Save',
                          onPressed: () async {
                            if (profileProvider.validateProfile()) {
                              await profileProvider.saveProfile(context);
                              Navigator.pop(
                                  context); // Close the dialog after saving
                            }
                          },
                        ),
                      ),
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
      transitionBuilder: (context, animation, secondaryAnimation, child) {
        return SlideTransition(
          position: Tween<Offset>(
            begin: const Offset(0, 1),
            end: Offset.zero,
          ).animate(animation),
          child: child,
        );
      },
    );
  }

  Widget _buildTextField(
    BuildContext context, {
    required String label,
    required TextEditingController controller,
    bool obscureText = false,
    bool isDate = false,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const SizedBox(height: 5),
          TextFormField(
            controller: controller,
            readOnly: isDate,
            obscureText: obscureText,
            onTap: isDate
                ? () async {
                    // Show DatePicker when tapping on the field
                    DateTime? pickedDate = await showDatePicker(
                      context: context,
                      initialDate: DateTime.now(),
                      firstDate: DateTime(1900), // Earliest selectable date
                      lastDate: DateTime.now(), // Latest selectable date
                    );
                    if (pickedDate != null) {
                      // Format the picked date to display
                      String formattedDate =
                          "${pickedDate.day}/${pickedDate.month}/${pickedDate.year}";
                      controller.text = formattedDate;
                    }
                  }
                : null, // No action for regular text fields
            decoration: InputDecoration(
              hintText: "Enter your $label",
              suffixIcon:
                  isDate ? const Icon(Icons.calendar_today, size: 20) : null,
            ).applyDefaults(Theme.of(context).inputDecorationTheme),
          ),
        ],
      ),
    );
  }
}
