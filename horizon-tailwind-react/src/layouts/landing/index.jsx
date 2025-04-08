import Button from "@mui/material/Button";
import { CheckCircle2, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import Footer from "views/landing/footer/Footer";
import Cta from "views/landing/cta/Cta";
import Faq from "views/landing/faq/Faq";
import Hero from "views/landing/hero/Hero";
import Feature from "views/landing/feature/Feature";
import Testimonials from "views/landing/testimonials/Testimonials";
import Pricing from "views/landing/pricing/Pricing";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import avatar from "assets/img/avatars/image.png";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  console.log('user: ' , user)
  const handleSignIn = () => {
    navigate("/auth/sign-in");
  };

  return (
    <div className={`flex min-h-screen flex-col dark:bg-[#0C1437]`}>
      <FixedPlugin />
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur dark:!border-white/10 dark:bg-gray-900 dark:supports-[backdrop-filter]:bg-gray-900/60">
        {" "}
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Zap className="h-5 w-5 text-brand-500" />
            <span className="text-navy-700 dark:text-white">Public Pulse</span>
          </div>

          <nav className="hidden gap-6 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-500 dark:text-gray-400"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-500 dark:text-gray-400"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-500 dark:text-gray-400"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-500 dark:text-gray-400"
            >
              FAQ
            </a>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
      {user ? (
        <>
        <img
          src={user.photoURL || "/default-avatar.png"} // Fallback avatar
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-gray-300 dark:border-white cursor-pointer"
          onClick={() => navigate("/dashboard")} // Clicking the avatar navigates to the dashboard
        />
        <button
          onClick={handleSignIn}
          className="px-4 py-2 rounded-full font-medium transition-colors bg-brand-500 text-white hover:bg-gray-200 dark:bg-brand-400 dark:hover:bg-navy-700"
        >
          Sign out
        </button>
        
        </>
        
        
      ) : (
        <>
        <button
          onClick={handleSignIn}
          className="rounded-full border border-brand-500 px-4 py-2 font-medium text-brand-500 transition-colors hover:bg-gray-200 dark:border-white dark:text-white dark:hover:bg-navy-700"
        >
          Sign in
        </button>
        <button 
        className="px-4 py-2 rounded-full font-medium transition-colors bg-brand-500 text-white hover:bg-gray-200 dark:bg-brand-400 dark:hover:bg-navy-700"
      >
        Sign up
      </button>
      </>
      )}
    </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 dark:text-white" />
            )}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="container border-t  p-4 dark:!border-white/10 md:hidden">
            <nav className="flex flex-col gap-6">
              {" "}
              {/* Increased gap for better spacing */}
              <a
                href="#features"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-500 dark:text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-500 dark:text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-500 dark:text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-500 dark:text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
               <div className="hidden items-center gap-4 md:flex">
      {user ? (
        <img
          src={user.photoURL || avatar} // Fallback avatar
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-gray-300 dark:border-white cursor-pointer"
          onClick={() => navigate("/dashboard")} // Clicking the avatar navigates to the dashboard
        />
      ) : (
        <button
          onClick={handleSignIn}
          className="rounded-full border border-brand-500 px-4 py-2 font-medium text-brand-500 transition-colors hover:bg-gray-200 dark:border-white dark:text-white dark:hover:bg-navy-700"
        >
          Sign in
        </button>
      )}
    </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Hero />
        <Feature />
        <Testimonials />

        <Faq />

        {/* CTA Section */}
        <Cta />
      </main>

      <Footer />
    </div>
  );
}
