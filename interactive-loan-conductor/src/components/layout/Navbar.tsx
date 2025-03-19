
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // This would be replaced with actual auth logic

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    // For demo purposes only
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // For demo purposes only
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient">AI Branch Manager</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-item relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-bank-primary after:transition-all after:duration-300">
              Home
            </Link>
            <Link to="/loan-application" className="nav-item relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-bank-primary after:transition-all after:duration-300">
              Apply for Loan
            </Link>
            <Link to="/track-application" className="nav-item relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-bank-primary after:transition-all after:duration-300">
              Track Application
            </Link>
            
            <div className="pl-4">
              <ThemeToggle />
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/dashboard" className="nav-item relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-bank-primary after:transition-all after:duration-300">
                  Dashboard
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-bank-error hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Button 
                variant="default" 
                size="sm"
                onClick={handleLogin}
                className="bg-bank-primary hover:bg-bank-primary/90 shadow-sm hover:shadow-glow-sm text-white"
              >
                <User size={16} className="mr-1" />
                <span>Login</span>
              </Button>
            )}
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-bank-text dark:text-white hover:text-bank-primary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-slide-in-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-bank-text dark:text-white hover:text-bank-primary hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/loan-application" 
              className="block px-3 py-2 rounded-md text-base font-medium text-bank-text dark:text-white hover:text-bank-primary hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Apply for Loan
            </Link>
            <Link 
              to="/track-application" 
              className="block px-3 py-2 rounded-md text-base font-medium text-bank-text dark:text-white hover:text-bank-primary hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Track Application
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-bank-text dark:text-white hover:text-bank-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-bank-error hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => {
                  handleLogin();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-bank-primary hover:bg-bank-primary/90"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
