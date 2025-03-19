
import React from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, CreditCard, ShieldCheck, Users, LockKeyhole } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-bank-gradient-from to-bank-gradient-to rounded-3xl text-white p-8 md:p-12 mb-12 mt-8">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 animate-slide-in-left">
            Banking made simple with AI
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
            Experience our AI-powered Branch Manager for a seamless and secure loan application process. Get personalized service anywhere, anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-bank-primary hover:bg-gray-100 transition-all hover:shadow-lg group">
                    Go to Dashboard
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/loan-application">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 transition-all">
                    Apply for a Loan
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button size="lg" className="bg-white text-bank-primary hover:bg-gray-100 transition-all hover:shadow-lg group">
                    Sign In
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 transition-all" onClick={() => localStorage.setItem('authTab', 'register')}>
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto pb-16">
        <h2 className="text-3xl font-heading font-bold text-center mb-12 animate-fade-in">Why Choose Standard Chartered</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 w-14 h-14 flex items-center justify-center mb-4">
              <ShieldCheck className="text-bank-primary h-7 w-7" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">Secure Banking</h3>
            <p className="text-gray-600 dark:text-gray-300">State-of-the-art security measures to protect your financial data.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 w-14 h-14 flex items-center justify-center mb-4">
              <CreditCard className="text-bank-success h-7 w-7" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">Easy Loans</h3>
            <p className="text-gray-600 dark:text-gray-300">Streamlined loan application process with quick approvals.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 w-14 h-14 flex items-center justify-center mb-4">
              <LockKeyhole className="text-purple-600 dark:text-purple-400 h-7 w-7" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">AI Security</h3>
            <p className="text-gray-600 dark:text-gray-300">Advanced AI-powered fraud detection and prevention systems.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 w-14 h-14 flex items-center justify-center mb-4">
              <Users className="text-bank-warning h-7 w-7" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600 dark:text-gray-300">Round-the-clock customer service through multiple channels.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 animate-fade-in">Ready to experience modern banking?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in">Join thousands of customers who trust Standard Chartered for their banking needs.</p>
          
          <Link to={user ? "/dashboard" : "/auth"}>
            <Button size="lg" className="btn-gradient px-8 py-6 text-lg animate-fade-in">
              {user ? "Go to Dashboard" : "Get Started Now"}
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
