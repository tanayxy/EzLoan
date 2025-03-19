
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoanEligibilityResult } from "@/components/loan/LoanEligibilityResult";
import { Search, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const TrackApplication = () => {
  const [applicationId, setApplicationId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [applicationData, setApplicationData] = useState<any>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicationId.trim()) {
      toast.error("Please enter an application ID");
      return;
    }
    
    // Mock API call to fetch application data
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock response data - in a real app, this would come from the backend
      if (applicationId === "LOAN123456") {
        setApplicationData({
          id: "LOAN123456",
          status: "approved",
          loanAmount: 500000,
          interestRate: 10.5,
          tenure: 36,
          applicationDate: "2023-08-15",
          lastUpdated: "2023-08-17"
        });
      } else if (applicationId === "LOAN654321") {
        setApplicationData({
          id: "LOAN654321",
          status: "rejected",
          applicationDate: "2023-08-10",
          lastUpdated: "2023-08-12",
          reasons: [
            "Insufficient income for requested loan amount",
            "Recent credit history shows multiple late payments"
          ]
        });
      } else if (applicationId === "LOAN789012") {
        setApplicationData({
          id: "LOAN789012",
          status: "more-info",
          applicationDate: "2023-08-16",
          lastUpdated: "2023-08-16",
          requiredDocuments: [
            "Last 6 months bank statements",
            "Additional proof of income"
          ]
        });
      } else if (applicationId === "LOAN345678") {
        setApplicationData({
          id: "LOAN345678",
          status: "pending",
          applicationDate: "2023-08-17",
          lastUpdated: "2023-08-17"
        });
      } else {
        toast.error("Application not found. Please check the ID and try again.");
        setApplicationData(null);
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  const handleRefresh = () => {
    if (applicationData) {
      setIsLoading(true);
      
      setTimeout(() => {
        toast.success("Application status updated");
        setIsLoading(false);
      }, 1000);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-bank-primary mb-2">
            Track Your Application
          </h1>
          <p className="text-gray-600">
            Enter your application ID to check the status of your loan application.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Application</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter Application ID (e.g., LOAN123456)"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                className="flex-grow"
              />
              <Button 
                type="submit" 
                className="bg-bank-primary hover:bg-bank-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw size={16} className="mr-1 animate-spin" />
                ) : (
                  <Search size={16} className="mr-1" />
                )}
                Search
              </Button>
            </form>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Sample application IDs for testing:
              </p>
              <ul className="text-xs text-gray-500 list-disc list-inside mt-1">
                <li>LOAN123456 (Approved)</li>
                <li>LOAN654321 (Rejected)</li>
                <li>LOAN789012 (More Info Required)</li>
                <li>LOAN345678 (Pending)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        {applicationData && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-bank-primary">
                Application Details
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center"
              >
                <RefreshCw size={14} className={`mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Application ID</p>
                  <p className="font-medium">{applicationData.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-medium ${
                    applicationData.status === "approved" ? "text-bank-success" :
                    applicationData.status === "rejected" ? "text-bank-error" :
                    "text-bank-warning"
                  }`}>
                    {applicationData.status === "approved" ? "Approved ✅" :
                     applicationData.status === "rejected" ? "Rejected ❌" :
                     applicationData.status === "more-info" ? "More Info Needed 🔄" :
                     "Pending ⏳"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Application Date</p>
                  <p className="font-medium">{applicationData.applicationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">{applicationData.lastUpdated}</p>
                </div>
              </div>
            </div>
            
            <LoanEligibilityResult
              status={applicationData.status}
              loanAmount={applicationData.loanAmount}
              interestRate={applicationData.interestRate}
              tenure={applicationData.tenure}
              reasons={applicationData.reasons}
              requiredDocuments={applicationData.requiredDocuments}
              onContinue={() => toast.success("Proceeding to next steps...")}
              onAppeal={() => toast.info("Appeal submitted. We'll review your case.")}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TrackApplication;
