import Button from "@mui/material/Button";
import { CheckCircle2, Menu, X, Zap } from "lucide-react"
import { useState } from "react"
import Footer from "views/landing/footer/Footer"
import Cta from "views/landing/cta/Cta"
import Faq from "views/landing/faq/Faq"
import Hero from 'views/landing/hero/Hero';
import Feature from "views/landing/feature/Feature";
import Testimonials from "views/landing/testimonials/Testimonials";
import Pricing from "views/landing/pricing/Pricing"
import FixedPlugin from "components/fixedPlugin/FixedPlugin";





export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  


  return (
    <div className={`flex min-h-screen flex-col dark:bg-[#0C1437]` }>
            <FixedPlugin />
<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900 dark:supports-[backdrop-filter]:bg-gray-900/60 dark:!border-white/10">        <div className="container flex h-16 items-center justify-between max-w-6xl mx-auto px-4">
          
          <div className="flex items-center gap-2 font-bold text-xl">
            <Zap className="h-5 w-5 text-brand-500" />
            <span className="text-navy-700 dark:text-white">Horizon</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium transition-colors hover:text-brand-500 text-gray-600 dark:text-gray-400">
              Features
            </a>
            <a href="#testimonials" className="text-sm font-medium transition-colors hover:text-brand-500 text-gray-600 dark:text-gray-400">
              Testimonials
            </a>
            <a href="#pricing" className="text-sm font-medium transition-colors hover:text-brand-500 text-gray-600 dark:text-gray-400">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium transition-colors hover:text-brand-500 text-gray-600 dark:text-gray-400">
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex gap-4 items-center">

          <button 
  className="px-4 py-2 rounded-full font-medium transition-colors border border-brand-500 text-brand-500 hover:bg-gray-200 dark:border-white dark:text-white dark:hover:bg-navy-700"
>
  Log in
</button>

            <button 
  className="px-4 py-2 rounded-full font-medium transition-colors bg-brand-500 text-white hover:bg-gray-200 dark:bg-brand-400 dark:hover:bg-navy-700"
>
  Sign up
</button>

          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6 dark:text-white" /> : <Menu className="h-6 w-6 dark:text-white" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
  <div className="md:hidden container  p-4 border-t dark:!border-white/10">
    <nav className="flex flex-col gap-6"> {/* Increased gap for better spacing */}
      <a
        href="#features"
        className="text-sm font-medium transition-colors hover:text-brand-500 text-gray-600 dark:text-gray-400"
        onClick={() => setMobileMenuOpen(false)}
      >
        Features
      </a>
      <a
        href="#testimonials"
        className="text-sm font-medium transition-colors hover:text-brand-500 text-gray-600 dark:text-gray-400"
        onClick={() => setMobileMenuOpen(false)}
      >
        Testimonials
      </a>
      <a
        href="#pricing"
        className="text-sm font-medium transition-colors hover:text-brand-500 text-gray-600 dark:text-gray-400"
        onClick={() => setMobileMenuOpen(false)}
      >
        Pricing
      </a>
      <a
        href="#faq"
        className="text-sm font-medium transition-colors hover:text-brand-500 text-gray-600 dark:text-gray-400"
        onClick={() => setMobileMenuOpen(false)}
      >
        FAQ
      </a>

      <div className="flex gap-4 mt-4"> {/* Increased mt for spacing between buttons */}
        <Button 
          variant="outlined" 
          size="small" 
          className="w-full dark:border-white/10 dark:text-white dark:hover:bg-white/10"
          style={{ borderColor: 'var(--brand-500)'}}
        >
          Log in
        </Button>
        <Button 
          size="small" 
          className="w-full dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          style={{ backgroundColor: 'var(--brand-500)' }}
        >
          Sign up
        </Button>
      </div>
    </nav>
  </div>
  
)}

      </header>

      <main className="flex-1">
       <Hero/>
        <Feature/>
        <Testimonials/>
        <Pricing/>
        <Faq/>

        {/* CTA Section */}
       <Cta/>
      </main>

      <Footer/>
      

    </div>
  )
}