
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white shadow-sm mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-bank-primary mb-4">AI Branch Manager</h3>
            <p className="text-sm text-gray-600">
              Experience banking like never before with our AI-powered virtual branch manager.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-bank-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-bank-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/loan-application" className="text-sm text-gray-600 hover:text-bank-primary">
                  Apply for Loan
                </Link>
              </li>
              <li>
                <Link to="/track-application" className="text-sm text-gray-600 hover:text-bank-primary">
                  Track Application
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-bank-primary mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                Email: support@aibranchmanager.com
              </li>
              <li className="text-sm text-gray-600">
                Phone: +1 (123) 456-7890
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AI Branch Manager. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-xs text-gray-500 flex items-center">
              Made with <Heart size={12} className="mx-1 text-bank-error" /> for secure banking
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
