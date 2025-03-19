import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, ArrowRight, CreditCard, Wallet, Eye, ArrowUpRight } from "lucide-react";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { LoanStatusCard } from "@/components/dashboard/LoanStatusCard";

// Define the status type to match LoanStatusCard's expected type
type LoanStatus = "approved" | "rejected" | "pending" | "more-info";

// Mock data for applications with the correct type
const mockApplications = [
  {
    id: "LOAN123456",
    applicantName: "John Doe",
    amount: 500000,
    status: "approved" as LoanStatus,
    date: "2023-08-15"
  },
  {
    id: "LOAN654321",
    applicantName: "Jane Smith",
    amount: 750000,
    status: "rejected" as LoanStatus,
    date: "2023-08-10"
  },
  {
    id: "LOAN789012",
    applicantName: "Robert Johnson",
    amount: 300000,
    status: "more-info" as LoanStatus,
    date: "2023-08-16"
  },
  {
    id: "LOAN345678",
    applicantName: "Sarah Williams",
    amount: 1000000,
    status: "pending" as LoanStatus,
    date: "2023-08-17"
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={18} className="text-bank-success" />;
      case "rejected":
        return <XCircle size={18} className="text-bank-error" />;
      case "pending":
        return <Clock size={18} className="text-bank-warning" />;
      case "more-info":
        return <AlertCircle size={18} className="text-bank-warning" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "pending":
        return "Pending";
      case "more-info":
        return "More Info Needed";
      default:
        return status;
    }
  };
  
  const getApplicationsByStatus = (status: LoanStatus | string) => {
    return mockApplications.filter(app => app.status === status);
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="bg-gradient-to-r from-bank-gradient-from to-bank-gradient-to rounded-xl text-white p-6 mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-white/90">
            Manage and track your loan applications with ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="animate-fade-in card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-bank-primary">
                {mockApplications.length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in card-hover" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-bank-success" />
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-bank-success">
                {getApplicationsByStatus("approved").length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in card-hover" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-bank-warning" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-bank-warning">
                {getApplicationsByStatus("pending").length + getApplicationsByStatus("more-info").length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in card-hover" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <XCircle className="h-4 w-4 text-bank-error" />
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-bank-error">
                {getApplicationsByStatus("rejected").length}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
            <TabsTrigger value="overview" className="data-[state=active]:bg-bank-primary data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-bank-primary data-[state=active]:text-white">Applications</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-bank-primary data-[state=active]:text-white">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <ProfileCard />
              </div>
              
              <div className="md:col-span-2">
                <QuickActions />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockApplications.slice(0, 2).map(application => (
                <LoanStatusCard key={application.id} loan={application} />
              ))}
            </div>
            
            <Card className="card-hover animate-fade-in">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Recent Loan Activity</span>
                  <Link to="/track-application" className="text-sm font-normal text-bank-primary flex items-center hover:underline">
                    <span>View all</span>
                    <ArrowUpRight size={14} className="ml-1" />
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications.slice(0, 3).map(application => (
                    <div key={application.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-white dark:bg-gray-900 p-2 rounded-full">
                          {application.status === "approved" ? <CreditCard className="text-bank-success h-5 w-5" /> :
                           application.status === "rejected" ? <XCircle className="text-bank-error h-5 w-5" /> :
                           application.status === "pending" ? <Clock className="text-bank-warning h-5 w-5" /> :
                           <AlertCircle className="text-bank-warning h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{application.applicantName}</p>
                          <p className="text-xs text-muted-foreground">₹{application.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className={`text-xs font-medium ${
                            application.status === "approved" ? "text-bank-success" :
                            application.status === "rejected" ? "text-bank-error" :
                            "text-bank-warning"
                          }`}>
                            {getStatusText(application.status)}
                          </span>
                        </div>
                        <Link to={`/track-application?id=${application.id}`}>
                          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <Eye size={14} className="text-bank-primary" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications">
            <Card className="animate-fade-in card-hover">
              <CardHeader>
                <CardTitle>All Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications.map(application => (
                    <div key={application.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full 
                          ${application.status === "approved" ? "bg-green-100 dark:bg-green-900/30" : 
                            application.status === "rejected" ? "bg-red-100 dark:bg-red-900/30" : 
                            "bg-amber-100 dark:bg-amber-900/30"}`}>
                          {application.status === "approved" ? <Wallet className="text-bank-success h-5 w-5" /> :
                           application.status === "rejected" ? <XCircle className="text-bank-error h-5 w-5" /> :
                           application.status === "pending" ? <Clock className="text-bank-warning h-5 w-5" /> :
                           <AlertCircle className="text-bank-warning h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{application.applicantName}</p>
                          <div className="flex gap-3 text-sm text-gray-500">
                            <span>₹{application.amount.toLocaleString()}</span>
                            <span>•</span>
                            <span>{application.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-full 
                          ${application.status === "approved" ? "bg-green-100 dark:bg-green-900/30 text-bank-success" : 
                            application.status === "rejected" ? "bg-red-100 dark:bg-red-900/30 text-bank-error" : 
                            "bg-amber-100 dark:bg-amber-900/30 text-bank-warning"}`}>
                          <span className="text-sm font-medium">
                            {getStatusText(application.status)}
                          </span>
                        </div>
                        <Link to={`/track-application?id=${application.id}`}>
                          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <ArrowRight className="h-4 w-4 text-bank-primary" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card className="animate-fade-in card-hover">
              <CardHeader>
                <CardTitle>Your Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    <FileText className="text-bank-primary h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Document Center</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    All your documents are securely stored in our system.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <Link to="/loan-application">
                      <button className="w-full py-3 px-4 border border-bank-primary text-bank-primary rounded-lg hover:bg-bank-primary/5 transition-colors flex items-center justify-center gap-2">
                        <CreditCard size={16} />
                        <span>Upload New Document</span>
                      </button>
                    </Link>
                    <Link to="/track-application">
                      <button className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        <Eye size={16} />
                        <span>View Submitted Documents</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
