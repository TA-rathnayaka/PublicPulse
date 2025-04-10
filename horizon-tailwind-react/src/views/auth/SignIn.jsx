import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../backend/firebase/firebase";
import { useAuth } from "../../context/authContext";
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";

export default function SignIn() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  if (user) {
    navigate("/dashboard");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Authenticated user:", userCredential.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Authenticated user:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Sign In</h4>
        <p className="mb-9 ml-1 text-base text-gray-600">Enter your email and password to sign in!</p>
        {error && <p className="text-red-500">{error}</p>}
        <div
          onClick={handleGoogleSignIn}
          className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary dark:bg-navy-800 hover:cursor-pointer"
        >
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">Sign In with Google</h5>
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
            label="Email*"
            placeholder="mail@example.com"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">Keep me logged In</p>
            </div>
            <a className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" href="#">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">Not registered yet?</span>
          <a href="#" className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
