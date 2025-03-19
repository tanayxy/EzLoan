
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

type ResultStatus = "approved" | "rejected" | "pending" | "more-info";

interface LoanEligibilityResultProps {
  status: ResultStatus;
  loanAmount?: number;
  interestRate?: number;
  tenure?: number;
  reasons?: string[];
  requiredDocuments?: string[];
  onContinue?: () => void;
  onAppeal?: () => void;
}

export const LoanEligibilityResult = ({
  status,
  loanAmount = 0,
  interestRate = 0,
  tenure = 0,
  reasons = [],
  requiredDocuments = [],
  onContinue,
  onAppeal
}: LoanEligibilityResultProps) => {
  const renderStatusIcon = () => {
    switch (status) {
      case "approved":
        return <CheckCircle size={48} className="text-bank-success" />;
      case "rejected":
        return <XCircle size={48} className="text-bank-error" />;
      case "pending":
        return <Info size={48} className="text-bank-warning" />;
      case "more-info":
        return <AlertCircle size={48} className="text-bank-warning" />;
      default:
        return null;
    }
  };
  
  const renderStatusTitle = () => {
    switch (status) {
      case "approved":
        return "Loan Approved! 🎉";
      case "rejected":
        return "Loan Application Rejected";
      case "pending":
        return "Application Under Review";
      case "more-info":
        return "Additional Information Required";
      default:
        return "Loan Application Status";
    }
  };
  
  const renderStatusDescription = () => {
    switch (status) {
      case "approved":
        return "Congratulations! Your loan application has been approved.";
      case "rejected":
        return "We're sorry, but your loan application was not approved at this time.";
      case "pending":
        return "Your loan application is currently being reviewed by our team.";
      case "more-info":
        return "We need some additional information to process your application.";
      default:
        return "";
    }
  };

  return (
    <Card className={`
      border-t-4 
      ${status === "approved" ? "border-t-bank-success" : ""} 
      ${status === "rejected" ? "border-t-bank-error" : ""} 
      ${status === "pending" || status === "more-info" ? "border-t-bank-warning" : ""}
    `}>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex-shrink-0">
          {renderStatusIcon()}
        </div>
        <div>
          <CardTitle className="text-xl md:text-2xl">
            {renderStatusTitle()}
          </CardTitle>
          <CardDescription className="mt-1">
            {renderStatusDescription()}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {status === "approved" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Loan Amount</p>
              <p className="text-xl font-bold text-bank-primary">₹{loanAmount.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="text-xl font-bold text-bank-primary">{interestRate}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Tenure</p>
              <p className="text-xl font-bold text-bank-primary">{tenure} months</p>
            </div>
          </div>
        )}
        
        {status === "rejected" && reasons.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Reasons:</h4>
            <ul className="list-disc list-inside space-y-1">
              {reasons.map((reason, index) => (
                <li key={index} className="text-sm text-gray-700">{reason}</li>
              ))}
            </ul>
          </div>
        )}
        
        {status === "more-info" && requiredDocuments.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Required Documents:</h4>
            <ul className="list-disc list-inside space-y-1">
              {requiredDocuments.map((doc, index) => (
                <li key={index} className="text-sm text-gray-700">{doc}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2">
        {status === "approved" && onContinue && (
          <Button 
            onClick={onContinue}
            className="bg-bank-success hover:bg-bank-success/90 text-white"
          >
            Continue to Disbursement
          </Button>
        )}
        
        {status === "rejected" && onAppeal && (
          <Button 
            onClick={onAppeal}
            variant="outline"
          >
            Appeal Decision
          </Button>
        )}
        
        {status === "more-info" && onContinue && (
          <Button 
            onClick={onContinue}
            className="bg-bank-warning hover:bg-bank-warning/90 text-white"
          >
            Provide Additional Information
          </Button>
        )}
        
        {status === "pending" && (
          <p className="text-sm text-gray-500 italic">
            We'll notify you when your application status changes.
          </p>
        )}
      </CardFooter>
    </Card>
  );
};
