import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<User?> signInEmailAndPassword(String email, String password) async {
    try {
      UserCredential result = await _auth.signInWithEmailAndPassword(
          email: email, password: password);
      User? user = result.user;
      return user;
    } on FirebaseAuthException catch (e) {
      // Handle specific FirebaseAuth exceptions
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
}
