import React from "react";
import { BarChart3 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-white dark:bg-navy-800 dark:border-white/10">
      <div className="container px-4 py-12 md:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <BarChart3 className="h-5 w-5 text-brand-500 dark:text-white" />
              <span className="text-navy-700 dark:text-white">PublicPulse</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">
              The leading platform for gathering employee insights and shaping workplace policies.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-4 text-navy-700 dark:text-white">Platform</h3>
            <ul className="space-y-2">
              {["How It Works", "Features", "Pricing", "Security", "Integrations"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4 text-navy-700 dark:text-white">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Blog", "Careers", "Press", "Partners"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4 text-navy-700 dark:text-white">Support</h3>
            <ul className="space-y-2">
              {["Help Center", "FAQs", "Community", "Contact Us", "Status"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row dark:border-white/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} PublicPulse. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
