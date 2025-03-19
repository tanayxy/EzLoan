
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900/20">
        <div className="animate-pulse flex flex-col items-center p-8 rounded-xl glassmorphism">
          <Loader2 className="h-12 w-12 text-bank-primary animate-spin mb-4" />
          <h2 className="text-xl font-heading text-bank-text dark:text-white">Loading your account...</h2>
          <p className="text-muted-foreground mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
