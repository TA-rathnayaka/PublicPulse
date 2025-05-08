import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth, firestore } from "../../backend/firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { doc, getDoc, setDoc } from "firebase/firestore";
import InputField from "components/fields/InputField";

export default function SignUp() {
  const navigate = useNavigate();
  const initialFormState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Debug to confirm we're receiving the correct values
    console.log(`Field changed: ${id} = ${value}`);
    
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [id]: value
      };
      console.log("Updated form data:", updatedData);
      return updatedData;
    });
    
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setAgreeTerms(false);
    setError(null);
  };

  const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return;
    
    try {
      const userRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(userRef);
      
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
          institutes: [],
          lastLogin: new Date()
        });
        console.log("User document created successfully");
      } else {
        await setDoc(userRef, { lastLogin: new Date() }, { merge: true });
      }
    } catch (error) {
      console.error("Error creating/updating user document:", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage("");
    
    console.log("Form data at submission:", formData);
    
    // Simple form validation
    if (!formData.username || !formData.username.trim()) {
      setError("Username is required");
      return;
    }
    
    if (!formData.email || !formData.email.trim()) {
      setError("Email is required");
      return;
    }
    
    // Password length check - ensure it's exactly checking the length property
    if (!formData.password || formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!agreeTerms) {
      setError("You must agree to the Terms and Conditions");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      await updateProfile(userCredential.user, {
        displayName: formData.username
      });
      
      await createUserDocument(userCredential.user, { username: formData.username });
      
      // Display success message and reset form
      setSuccessMessage("Account created successfully! Redirecting to dashboard...");
      resetForm();
      
      // Redirect after a brief delay to show success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
      
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === 'auth/email-already-in-use') {
        setError("Email is already in use. Please use a different email or try logging in.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email address. Please check your email.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password is too weak. Please choose a stronger password.");
      } else {
        setError(`Failed to create account: ${error.message || "Please try again."}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    setSuccessMessage("");
    setIsProcessing(true);
    
    try {
      const result = await signInWithPopup(auth, provider);
      
      await createUserDocument(result.user);
      
      // Display success message and reset form
      setSuccessMessage("Google sign-in successful! Redirecting to dashboard...");
      resetForm();
      
      // Redirect after a brief delay to show success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
      
    } catch (error) {
      console.error("Google sign up error:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError("Sign-up cancelled. Please try again.");
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        setError("An account already exists with the same email address but different sign-in credentials.");
      } else {
        setError(`Google sign-up failed: ${error.message || "Please try again."}`);
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
        
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded-md dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 text-sm text-green-600 bg-green-50 p-3 rounded-md dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="font-medium">Success</p>
            <p>{successMessage}</p>
          </div>
        )}
        
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
        <form onSubmit={handleSubmit} noValidate>
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
          <div className="flex gap-3">
            <button
              type="submit"
              className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 disabled:opacity-70"
              disabled={isProcessing}
            >
              {isProcessing ? "Creating Account..." : "Create Account"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="linear mt-2 rounded-xl bg-gray-200 py-[12px] px-4 text-base font-medium text-gray-700 transition duration-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600 dark:active:bg-navy-500 disabled:opacity-70"
              disabled={isProcessing}
            >
              Clear
            </button>
          </div>
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