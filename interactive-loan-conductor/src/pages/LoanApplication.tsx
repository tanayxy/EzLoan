
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { VideoAssistant } from "@/components/video/VideoAssistant";
import { VideoRecorder } from "@/components/video/VideoRecorder";
import { DocumentUpload } from "@/components/documents/DocumentUpload";
import { LoanEligibilityResult } from "@/components/loan/LoanEligibilityResult";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

type Step = {
  id: string;
  title: string;
  assistantPrompt?: string;
  question?: string;
};

const LoanApplication = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<string, any>>({});
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<string | null>(null);
  
  // Define the steps of the loan application process
  const steps: Step[] = [
    {
      id: "welcome",
      title: "Welcome",
      assistantPrompt: "Welcome to the AI Branch Manager. I'll be guiding you through your loan application process today. You can speak directly to me via video, and I'll help assess your loan eligibility. Let's get started!"
    },
    {
      id: "loan-amount",
      title: "Loan Amount",
      assistantPrompt: "First, let me know how much you'd like to borrow. Please record a short video telling me the loan amount and the purpose of the loan.",
      question: "What is the loan amount you're requesting and what will you use it for?"
    },
    {
      id: "employment",
      title: "Employment Details",
      assistantPrompt: "Thank you. Now, I need to know about your employment. Please record a video telling me your current job, how long you've been employed there, and your monthly income.",
      question: "What is your current job, how long have you been employed there, and what is your monthly income?"
    },
    {
      id: "id-verification",
      title: "ID Verification",
      assistantPrompt: "Thank you for sharing that information. Now I need to verify your identity. Please upload a photo of your Aadhaar card or other government ID."
    },
    {
      id: "income-proof",
      title: "Income Proof",
      assistantPrompt: "Great! Now, I need proof of your income. Please upload your salary slip, bank statement, or any other income proof document."
    },
    {
      id: "review",
      title: "Application Review",
      assistantPrompt: "Thank you for providing all the required information. I'm now going to review your application and determine your loan eligibility. This will just take a moment."
    }
  ];
  
  const currentStep = steps[currentStepIndex];
  
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prevIndex => prevIndex + 1);
      setProgress(((currentStepIndex + 1) / (steps.length - 1)) * 100);
    } else {
      // Submit application
      handleSubmitApplication();
    }
  };
  
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prevIndex => prevIndex - 1);
      setProgress(((currentStepIndex - 1) / (steps.length - 1)) * 100);
    }
  };
  
  const handleVideoResponse = (videoBlob: Blob) => {
    // In a real application, this would send the video to a server for analysis
    // For now, we just save the fact that the user responded
    setUserResponses(prev => ({
      ...prev,
      [currentStep.id]: {
        type: "video",
        timestamp: new Date().toISOString()
      }
    }));
    
    // Show success message
    toast.success("Video response recorded successfully");
  };
  
  const handleDocumentUploaded = (file: File, extractedData?: any) => {
    // In a real application, this would process the document data
    setUserResponses(prev => ({
      ...prev,
      [currentStep.id]: {
        type: "document",
        documentType: currentStep.id === "id-verification" ? "ID" : "Income Proof",
        extractedData: extractedData || {},
        timestamp: new Date().toISOString()
      }
    }));
  };
  
  const handleSubmitApplication = () => {
    // Simulate processing time
    toast.info("Processing your application...");
    
    setTimeout(() => {
      setApplicationSubmitted(true);
      
      // Randomly determine eligibility status for demonstration
      const outcomes = ["approved", "rejected", "more-info"];
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      setEligibilityResult(randomOutcome);
      
      // Set the progress to 100%
      setProgress(100);
    }, 3000);
  };
  
  const renderStepContent = () => {
    if (applicationSubmitted) {
      return renderEligibilityResult();
    }
    
    switch (currentStep.id) {
      case "welcome":
        return (
          <div className="space-y-6">
            <VideoAssistant
              videoSrc=""
              title="Welcome to AI Branch Manager"
              autoPlay={true}
            />
            <div className="flex justify-end">
              <Button onClick={handleNext} className="bg-bank-primary hover:bg-bank-primary/90">
                Get Started <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        );
      
      case "loan-amount":
      case "employment":
        return (
          <div className="space-y-6">
            <VideoAssistant
              videoSrc=""
              title={currentStep.title}
            />
            <VideoRecorder
              onVideoRecorded={handleVideoResponse}
              question={currentStep.question}
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
              <Button 
                onClick={handleNext} 
                className="bg-bank-primary hover:bg-bank-primary/90"
                disabled={!userResponses[currentStep.id]}
              >
                Continue <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        );
      
      case "id-verification":
        return (
          <div className="space-y-6">
            <VideoAssistant
              videoSrc=""
              title="Identity Verification"
            />
            <DocumentUpload
              documentType="Aadhaar Card"
              onDocumentUploaded={handleDocumentUploaded}
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
              <Button 
                onClick={handleNext} 
                className="bg-bank-primary hover:bg-bank-primary/90"
                disabled={!userResponses[currentStep.id]}
              >
                Continue <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        );
      
      case "income-proof":
        return (
          <div className="space-y-6">
            <VideoAssistant
              videoSrc=""
              title="Income Verification"
            />
            <DocumentUpload
              documentType="Income Proof"
              onDocumentUploaded={handleDocumentUploaded}
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
              <Button 
                onClick={handleNext} 
                className="bg-bank-primary hover:bg-bank-primary/90"
                disabled={!userResponses[currentStep.id]}
              >
                Continue <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        );
      
      case "review":
        return (
          <div className="space-y-6">
            <VideoAssistant
              videoSrc=""
              title="Application Review"
            />
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Application Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Loan Details</p>
                    <p className="font-medium">✅ Provided via video response</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employment Details</p>
                    <p className="font-medium">✅ Provided via video response</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Identity Verification</p>
                    <p className="font-medium">✅ Document verified</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Income Proof</p>
                    <p className="font-medium">✅ Document verified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
              <Button 
                onClick={handleSubmitApplication} 
                className="bg-bank-success hover:bg-bank-success/90 text-white"
              >
                Submit Application
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  const renderEligibilityResult = () => {
    if (!eligibilityResult) return null;
    
    switch (eligibilityResult) {
      case "approved":
        return (
          <div className="space-y-6">
            <VideoAssistant
              videoSrc=""
              title="Application Approved!"
            />
            <LoanEligibilityResult
              status="approved"
              loanAmount={500000}
              interestRate={10.5}
              tenure={36}
              onContinue={() => toast.success("Proceeding to loan disbursement")}
            />
          </div>
        );
      
      case "rejected":
        return (
          <div className="space-y-6">
            <VideoAssistant
              videoSrc=""
              title="Application Result"
            />
            <LoanEligibilityResult
              status="rejected"
              reasons={[
                "Insufficient income for requested loan amount",
                "Recent credit history shows multiple late payments",
                "Current debt-to-income ratio exceeds our threshold"
              ]}
              onAppeal={() => toast.info("Appeal submitted. We'll review your case.")}
            />
          </div>
        );
      
      case "more-info":
        return (
          <div className="space-y-6">
            <VideoAssistant
              videoSrc=""
              title="Additional Information Needed"
            />
            <LoanEligibilityResult
              status="more-info"
              requiredDocuments={[
                "Last 6 months bank statements",
                "Additional proof of income",
                "Existing loan statements"
              ]}
              onContinue={() => toast.info("Redirecting to document upload...")}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-bank-primary mb-2">
            Loan Application
          </h1>
          <p className="text-gray-600 mb-6">
            Complete your loan application by following the steps below.
          </p>
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Step indicator */}
          <div className="flex justify-between mt-6">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex flex-col items-center ${index > currentStepIndex ? 'text-gray-400' : ''}`}
              >
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${index < currentStepIndex ? 'bg-bank-primary text-white' : ''}
                    ${index === currentStepIndex ? 'bg-bank-secondary text-bank-primary border-2 border-bank-primary' : ''}
                    ${index > currentStepIndex ? 'bg-gray-200 text-gray-400' : ''}
                  `}
                >
                  {index + 1}
                </div>
                <span className="hidden md:block text-xs mt-1">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Current step content */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {renderStepContent()}
        </div>
      </div>
    </MainLayout>
  );
};

export default LoanApplication;
