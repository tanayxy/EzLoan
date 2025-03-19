
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CreditCard, Search, FileText, Settings } from "lucide-react";

export const QuickActions = () => {
  return (
    <Card className="animate-fade-in card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-bank-primary">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Link to="/loan-application" className="col-span-1">
          <Button className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-bank-gradient-from to-bank-gradient-to hover:shadow-md transition-all">
            <CreditCard className="h-5 w-5" />
            <span>New Loan</span>
          </Button>
        </Link>
        
        <Link to="/track-application" className="col-span-1">
          <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2 border-bank-primary/30 hover:border-bank-primary hover:bg-bank-primary/5 transition-all">
            <Search className="h-5 w-5" />
            <span>Track Loan</span>
          </Button>
        </Link>
        
        <Link to="/documents" className="col-span-1">
          <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2 border-bank-primary/30 hover:border-bank-primary hover:bg-bank-primary/5 transition-all">
            <FileText className="h-5 w-5" />
            <span>Documents</span>
          </Button>
        </Link>
        
        <Link to="/settings" className="col-span-1">
          <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2 border-bank-primary/30 hover:border-bank-primary hover:bg-bank-primary/5 transition-all">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
