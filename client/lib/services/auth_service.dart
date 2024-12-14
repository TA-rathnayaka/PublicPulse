import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Stream<User?> get userStream {
    return _auth.authStateChanges();
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
