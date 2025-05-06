import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../backend/firebase/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setIsProcessing(true);

    if (!email.trim()) {
      setError("Please enter your email address");
      setIsProcessing(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error) {
      console.error("Password reset error:", error);
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email address");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address. Please check your email.");
      } else {
        setError("Failed to send password reset email. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Reset Password
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
            <p className="text-sm text-green-500 dark:text-green-400">
              Password reset email sent! Please check your inbox and follow the instructions.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Email*
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@example.com"
            disabled={isProcessing || success}
            required
            className="mb-3 mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 disabled:opacity-70"
            disabled={isProcessing || success}
          >
            {isProcessing
              ? "Sending Reset Email..."
              : success
              ? "Email Sent"
              : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-4 flex justify-between">
          <div>
            <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
              Remember your password?
            </span>
            <Link
              to="/auth/sign-in"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Sign In
            </Link>
          </div>
          <div>
            <Link
              to="/auth/sign-up"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
