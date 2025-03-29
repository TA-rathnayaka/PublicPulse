import React from "react";
import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-white dark:bg-navy-800 dark:border-white/10">
      <div className="container px-4 py-12 md:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <Zap className="h-5 w-5 text-brand-500 dark:text-white" />
              <span className="text-navy-700 dark:text-white">Horizon</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">
              Empowering businesses with the tools they need to succeed in the digital age.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-4 text-navy-700 dark:text-white">Product</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Integrations", "Changelog", "Roadmap"].map((item, i) => (
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
              {["About", "Blog", "Careers", "Press", "Partners"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4 text-navy-700 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              {["Documentation", "Help Center", "Community", "Contact", "Status"].map((item, i) => (
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
            © {new Date().getFullYear()} Horizon Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;