
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { CircleUser, Mail } from "lucide-react";

export const ProfileCard = () => {
  const { user } = useAuth();
  
  return (
    <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 animate-fade-in overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
            <CircleUser className="w-12 h-12 text-bank-primary" />
          </div>
          
          <h3 className="text-xl font-semibold text-bank-text">
            {user?.user_metadata?.full_name || "User"}
          </h3>
          
          <div className="flex items-center mt-2 text-muted-foreground text-sm">
            <Mail className="w-4 h-4 mr-1" />
            <span>{user?.email}</span>
          </div>
          
          <div className="w-full mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Customer ID</span>
              <span className="font-mono text-sm">{user?.id.substring(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Member Since</span>
              <span className="text-sm">{new Date(user?.created_at || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
