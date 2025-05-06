import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth, firestore } from "../../backend/firebase/firebase";
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return;
    
    try {
      // Check if user document already exists
      const userRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(userRef);
      
      // If user document doesn't exist, create one
      if (!userSnap.exists()) {
        console.log("Creating new user document");
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          username: additionalData.username || user.displayName || "",
          photoURL: user.photoURL || "",
          phoneNumber: user.phoneNumber || "",
          emailVerified: user.emailVerified,
          createdAt: new Date(),
          institutes: [], // Empty array for institutes
          lastLogin: new Date()
        });
        console.log("User document created successfully");
      } else {
        // Update last login time if user already exists
        await setDoc(userRef, { lastLogin: new Date() }, { merge: true });
      }
    } catch (error) {
      console.error("Error creating/updating user document:", error);
      throw error; // Re-throw to be handled by the caller
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsProcessing(true);
    
    // Form validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsProcessing(false);
      return;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsProcessing(false);
      return;
    }
    
    if (!agreeTerms) {
      setError("You must agree to the Terms and Conditions");
      setIsProcessing(false);
      return;
    }
    
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      // Update profile with username
      await updateProfile(userCredential.user, {
        displayName: formData.username
      });
      
      // Create user document
      await createUserDocument(userCredential.user, { username: formData.username });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === 'auth/email-already-in-use') {
        setError("Email is already in use. Please use a different email or try logging in.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email address. Please check your email.");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    setIsProcessing(true);
    
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Create or update user document after Google sign-in
      await createUserDocument(result.user);
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign up error:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError("Sign-up cancelled. Please try again.");
      } else {
        setError("Google sign-up failed. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Sign Up</h4>
        <p className="mb-9 ml-1 text-base text-gray-600">Create your account to get started!</p>
        {error && <p className="mb-4 text-sm text-red-500 bg-red-50 p-2 rounded-md dark:bg-red-900/20">{error}</p>}
        <div
          onClick={handleGoogleSignUp}
          className={`mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary dark:bg-navy-800 hover:cursor-pointer transition-all ${isProcessing ? 'opacity-70 pointer-events-none' : 'hover:bg-gray-100 dark:hover:bg-navy-700'}`}
          disabled={isProcessing}
        >
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            {isProcessing ? "Signing up..." : "Sign Up with Google"}
          </h5>
        </div>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        <form onSubmit={handleSubmit}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Username*"
            placeholder="John Doe"
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            disabled={isProcessing}
            required
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@example.com"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isProcessing}
            required
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isProcessing}
            required
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Confirm Password*"
            placeholder="Confirm your password"
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isProcessing}
            required
          />
          <div className="mb-4 flex items-center justify-start px-2">
            <div className="flex items-center">
              <Checkbox 
                checked={agreeTerms} 
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                I agree to the <a href="#" className="text-brand-500 hover:text-brand-600">Terms and Conditions</a>
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 disabled:opacity-70"
            disabled={isProcessing}
          >
            {isProcessing ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">Already have an account?</span>
          <Link to="/auth/sign-in" className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}