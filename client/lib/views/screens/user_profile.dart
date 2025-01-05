import 'package:client/providers/screens_providers/theme_provider.dart';
import 'package:client/views/screens/_all.dart';
import 'package:firebase_auth/firebase_auth.dart';
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

class UserProfileScreen extends StatelessWidget {
  static const id = '/combinedProfile';

  const UserProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => ProfileScreenProvider(),
      child: Consumer<ProfileScreenProvider>(
        builder: (context, profileProvider, child) {
          return SafeArea(
            child: Scaffold(
              body: SingleChildScrollView(
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
                      child: Builder(
                        builder: (context) {
                          final firebaseUser = FirebaseAuth.instance.currentUser;

                          // Check if the user is null
                          if (firebaseUser == null) {
                            return Center(child: CircularProgressIndicator());
                          }

                          // ProfileProvider logic (optional)
                          profileProvider.initializeProfile({
                            'displayName': firebaseUser.displayName,
                            'email': firebaseUser.email,
                            'phoneNumber': firebaseUser.phoneNumber,
                            'photoURL': firebaseUser.photoURL?? "assets/default_profile.jpg",
                          });
                          print(profileProvider);

                          return Identity(
                            imagePath: firebaseUser.photoURL ?? "assets/default_profile.jpg",
                            name: firebaseUser.displayName ?? "No name available",
                            email: firebaseUser.email ?? "No email available",
                            phoneNumber: firebaseUser.phoneNumber ?? "No phone number available",
                          );

                        },
                      ),
                    ),
                      child: Consumer<UserProvider>(
                        builder: (context, userProvider, child) {
                          final user = userProvider.userDetails;

                          // Check if user is null before proceeding
                          if (user == null) {
                            return Center(child: CircularProgressIndicator());
                          }

                          profileProvider.initializeProfile(user);

                          return Identity(
                            imagePath: user['profileImage'] ?? "assets/default_profile.jpg",
                            name: "${user['firstName'] ?? ''} ${user['lastName'] ?? ''}".trim(),
                            email: user['email'] ?? "No email available",
                            phoneNumber: user['phoneNumber'] ?? "No phone number available",


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
                                duration: Duration(milliseconds: 500),
                                child: MenuRow(
                                  icon: Icons.privacy_tip,
                                  text: "Privacy",
                                ),
                              ),
                              const Divider(),
                              FadeInUp(
                                duration: Duration(milliseconds: 500),
                                child: MenuRow(
                                  icon: Icons.person,
                                  text: "Personal Info",
                                  onTap: () {
                                    final userProvider = context.read<UserProvider>();
                                    final user = userProvider.userDetails;
                                    if (user != null)
                                      _showBottomSheet(context, profileProvider, user);
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
                                        Provider.of<MyAuthProvider>(context, listen: false)
                                            .signOut();
                                        Navigator.pushReplacementNamed(context, SplashScreen.id);
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
          );
        },
      ),
    );
  }

  void _showBottomSheet(BuildContext context, ProfileScreenProvider profileProvider, Map<String, dynamic> user) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return FractionallySizedBox(
          heightFactor: 0.9,
          child: Padding(
            padding: EdgeInsets.only(
              bottom: MediaQuery.of(context).viewInsets.bottom,
              left: 20,
              right: 20,
              top: 20,
            ),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildTextField(context,
                      label: "Your Name",
                      controller: profileProvider.nameController),
                  _buildTextField(context,
                      label: "Email",
                      controller: profileProvider.emailController),
                  _buildTextField(context,
                      label: "Date of Birth",
                      controller: profileProvider.dobController,
                      isDate: true),
                  const SizedBox(height: 20),
                  Center(
                    child: PrimaryButton(
                      label: 'Save',
                      onPressed: () {
                        if (profileProvider.validateProfile()) {
                          profileProvider.saveProfile(context);
                        }
                      },
                    ),
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildTextField(
      context, {
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
            decoration: InputDecoration(
              hintText: "Enter your $label",
              suffixIcon: isDate ? const Icon(Icons.calendar_today, size: 20) : null,
            ).applyDefaults(Theme.of(context).inputDecorationTheme),
          ),
        ],
      ),
    );
  }
}