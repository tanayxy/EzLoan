
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface LoanStatusCardProps {
  loan: {
    id: string;
    amount: number;
    status: "approved" | "rejected" | "pending" | "more-info";
    date: string;
  };
}

export const LoanStatusCard = ({ loan }: LoanStatusCardProps) => {
  const getStatusDetails = () => {
    switch (loan.status) {
      case "approved":
        return {
          icon: <CheckCircle className="text-bank-success h-5 w-5" />,
          text: "Approved",
          color: "text-bank-success",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          actionText: "View Details"
        };
      case "rejected":
        return {
          icon: <XCircle className="text-bank-error h-5 w-5" />,
          text: "Rejected",
          color: "text-bank-error",
          bgColor: "bg-red-50 dark:bg-red-900/20",
          actionText: "View Reason"
        };
      case "pending":
        return {
          icon: <Clock className="text-bank-warning h-5 w-5" />,
          text: "Under Review",
          color: "text-bank-warning",
          bgColor: "bg-amber-50 dark:bg-amber-900/20",
          actionText: "Check Status"
        };
      case "more-info":
        return {
          icon: <AlertCircle className="text-bank-warning h-5 w-5" />,
          text: "Action Required",
          color: "text-bank-warning",
          bgColor: "bg-amber-50 dark:bg-amber-900/20",
          actionText: "Provide Info"
        };
      default:
        return {
          icon: <Clock className="text-gray-500 h-5 w-5" />,
          text: "Unknown",
          color: "text-gray-500",
          bgColor: "bg-gray-50 dark:bg-gray-800",
          actionText: "View Details"
        };
    }
  };

  const { icon, text, color, bgColor, actionText } = getStatusDetails();

  return (
    <Card className="animate-fade-in card-hover overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-bank-gradient-from to-bank-gradient-to"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex justify-between">
          <span>Loan Application</span>
          <span className="text-sm font-normal text-muted-foreground">{loan.date}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="font-medium text-lg">₹{loan.amount.toLocaleString()}</p>
          </div>
          <div className={`px-3 py-1 rounded-full flex items-center gap-1.5 ${bgColor}`}>
            {icon}
            <span className={`text-sm font-medium ${color}`}>{text}</span>
          </div>
        </div>
        
        <div className="pt-2">
          <Link to={`/track-application?id=${loan.id}`}>
            <Button variant="ghost" className="w-full justify-between hover:bg-gray-100 dark:hover:bg-gray-800 group">
              <span>{actionText}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
