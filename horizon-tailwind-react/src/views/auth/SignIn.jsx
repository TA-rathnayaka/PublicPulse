import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, firestore } from "../../backend/firebase/firebase";
import { useAuth } from "../../context/authContext";
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function SignIn() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log("Email:", email);
    console.log("Password:", password);
  }, [email, password]);

  const createUserDocument = async (user) => {
    if (!user) return;

    try {
      const userRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          username: user.displayName || "",
          photoURL: user.photoURL || "",
          phoneNumber: user.phoneNumber || "",
          emailVerified: user.emailVerified,
          createdAt: new Date(),
          institutes: [],
          lastLogin: new Date(),
        });
      } else {
        await setDoc(userRef, { lastLogin: new Date() }, { merge: true });
      }
    } catch (err) {
      console.error("Error updating Firestore:", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsProcessing(true);
  
    try {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      console.log("Trying login with:", trimmedEmail);
  
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      await createUserDocument(userCredential.user); // Fixed typo here
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign-in error:", err);
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/user-not-found":
          setError("User not found.");
          break;
        case "auth/wrong-password":
          setError("Invalid email or password. Please try again.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Try again later or reset password.");
          break;
        default:
          setError("Sign-in failed. Please check your credentials.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    setIsProcessing(true);

    try {
      const result = await signInWithPopup(auth, provider);
      await createUserDocument(result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled.");
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Sign In</h4>
        <p className="mb-9 ml-1 text-base text-gray-600">Enter your email and password to sign in!</p>
        {error && (
          <p className="mb-4 text-sm text-red-500 bg-red-50 p-2 rounded-md dark:bg-red-900/20">
            {error}
          </p>
        )}
        <div
          onClick={handleGoogleSignIn}
          className={`mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary dark:bg-navy-800 hover:cursor-pointer transition-all ${
            isProcessing ? "opacity-70 pointer-events-none" : "hover:bg-gray-100 dark:hover:bg-navy-700"
          }`}
        >
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            {isProcessing ? "Signing in..." : "Sign In with Google"}
          </h5>
        </div>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white">or</p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        <form onSubmit={handleSubmit}>
          {/* Replace InputField with plain input for debugging */}
          <div className="mb-3 flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-navy-700 dark:text-white">
              Email*
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                console.log("Email input:", e.target.value);
                setEmail(e.target.value);
                setError(null);
              }}
              placeholder="mail@example.com"
              disabled={isProcessing}
              required
              className="rounded-xl border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-navy-800 dark:text-white"
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium text-navy-700 dark:text-white">
              Password*
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                console.log("Password input:", e.target.value);
                setPassword(e.target.value);
                setError(null);
              }}
              placeholder="Min. 8 characters"
              disabled={isProcessing}
              required
              className="rounded-xl border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-navy-800 dark:text-white"
            />
          </div>
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">Keep me logged in</p>
            </div>
            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 disabled:opacity-70"
            disabled={isProcessing || loading}
          >
            {isProcessing || loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">Not registered yet?</span>
          <Link
            to="/auth/sign-up"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}