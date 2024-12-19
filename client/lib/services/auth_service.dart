import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  Stream<User?> get userStream {
    return _auth.authStateChanges();
  }



  Future<User?> signInWithFacebook() async {
    try {
      // Trigger the Facebook login flow.
      final LoginResult loginResult = await FacebookAuth.instance.login();

      if (loginResult.status == LoginStatus.success) {
        // Obtain the Facebook Access Token.
        final AccessToken accessToken = loginResult.accessToken!;

        // Create a credential for Firebase authentication.
        final OAuthCredential facebookCredential =
        FacebookAuthProvider.credential(accessToken.tokenString);

        // Sign in to Firebase with the Facebook credential.
        UserCredential userCredential =
        await _auth.signInWithCredential(facebookCredential);

        return userCredential.user;
      } else if (loginResult.status == LoginStatus.cancelled) {
        print("Facebook login cancelled by the user.");
        return null;
      } else {
        print("Facebook login failed: ${loginResult.message}");
        return null;
      }
    } catch (e) {
      print("Error signing in with Facebook: $e");
      rethrow;
    }
  }


  Future<User?> signInWithGoogle() async {
    try {

      // Trigger the Google Sign-In flow.
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      if (googleUser == null) {
        // If the user cancels the sign-in process.
        return null;
      }

      // Obtain the Google authentication details.
      final GoogleSignInAuthentication googleAuth = await googleUser.authentication;

      // Create a credential for Firebase authentication.
      final AuthCredential credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      // Sign in to Firebase with the Google credential.
      UserCredential userCredential =
      await _auth.signInWithCredential(credential);

      return userCredential.user;
    } catch (e) {
      print("Error signing in with Google: $e");
      rethrow; // Pass the error to the UI or caller for handling.
    }
  }

  Future<User?> signInEmailAndPassword(String email, String password) async {
    try {
      UserCredential result = await _auth.signInWithEmailAndPassword(
          email: email, password: password);
      User? user = result.user;
      return user;
    } on FirebaseAuthException catch (e) {
      switch (e.code) {
        case 'invalid-email':
          print('Invalid email format.');
          break;
        case 'user-not-found':
          print('No user found for that email.');
          break;
        case 'wrong-password':
          print('Wrong password provided for that user.');
          break;
        default:
          print('An undefined Error happened.');
      }
      return null;
    } catch (e) {
      print('An error occurred: $e');
      return null;
    }
  }

  Future<User?> registerUserAndPassword(String email, String password) async {
    try {
      UserCredential result = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      print(result.user);
      return result.user;
    } catch (e) {
      if (e is FirebaseAuthException) {
        switch (e.code) {
          case 'email-already-in-use':
            print('This email is already registered.');
            break;
          case 'invalid-email':
            print('The email address is not valid.');
            break;
          case 'weak-password':
            print('The password is too weak.');
            break;
          default:
            print('Registration failed: ${e.message}');
        }
      } else {
        print('An unexpected error occurred: ${e.toString()}');
      }
      return null;
    }
  }

  Future<void> changeUserEmail(String newEmail) async {
    User? user = _auth.currentUser;

    if (user != null) {
      try {
        await user.updateEmail(newEmail);
        print('Email updated successfully to $newEmail');
      } on FirebaseAuthException catch (e) {
        switch (e.code) {
          case 'invalid-email':
            print('The email address is not valid.');
            break;
          case 'email-already-in-use':
            print('The email is already in use by another account.');
            break;
          case 'requires-recent-login':
            print('Please reauthenticate to update your email.');
            break;
          default:
            print('An error occurred: ${e.message}');
        }
      } catch (e) {
        print('An unexpected error occurred: $e');
      }
    } else {
      print('No user is currently logged in.');
    }
  }

  Future<void> signOut() async {
    try {
      await _auth.signOut();
      await _googleSignIn.signOut();
      print('User signed out successfully.');
    } catch (e) {
      print('Error signing out: $e');
    }
  }

  Future<String?> getCurrentUserUid() async {
    User? user = _auth.currentUser;
    return user?.uid;
  }
}
