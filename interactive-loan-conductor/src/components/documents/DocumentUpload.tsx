import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Check, FileText, Camera } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/contexts/AuthContext";

interface DocumentUploadProps {
  documentType: string;
  onDocumentUploaded: (file: File, extractedData?: any) => void;
}

export const DocumentUpload = ({ 
  documentType, 
  onDocumentUploaded 
}: DocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  const { user } = useAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    processFile(selectedFile);
  };

  const processFile = async (selectedFile: File) => {
    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      toast.error("Please upload an image file (JPEG, PNG)");
      return;
    }

    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
    
    // Process document
    setIsProcessing(true);
    setIsVerified(false);
    
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Upload file to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${user.id}/${documentType.replace(/\s+/g, '-').toLowerCase()}/${fileName}`;
      
      // TODO: Create storage buckets in Supabase first
      // Uncomment this code when storage is set up
      /*
      const { error: uploadError } = await supabase
        .storage
        .from('documents')
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw uploadError;
      }
      */
      
      // Mock OCR processing
      setTimeout(() => {
        setIsProcessing(false);
        setIsVerified(true);
        
        // Mock extracted data based on document type
        let extractedData = {};
        
        if (documentType === "Aadhaar Card") {
          extractedData = {
            name: "John Doe",
            dob: "1990-01-01",
            aadhaarNumber: "XXXX XXXX 1234",
            address: "123 Main St, Anytown"
          };
        } else if (documentType === "PAN Card") {
          extractedData = {
            name: "John Doe",
            panNumber: "ABCDE1234F",
            dob: "1990-01-01"
          };
        } else if (documentType === "Income Proof") {
          extractedData = {
            employerName: "ABC Company",
            income: "₹50,000",
            period: "Monthly"
          };
        }
        
        toast.success(`${documentType} verified successfully`);
        
        // Call the onDocumentUploaded callback with the file and extracted data
        onDocumentUploaded(selectedFile, extractedData);
      }, 2000);
    } catch (error: any) {
      console.error("Error processing document:", error);
      toast.error(error.message || "Error processing document");
      setIsProcessing(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    const droppedFile = event.dataTransfer.files[0];
    if (!droppedFile) return;
    
    processFile(droppedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setIsVerified(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setCameraStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Please check permissions.");
    }
  };

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    
    setIsCameraActive(false);
  };

  const captureImage = () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext("2d");
    if (!context) return;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const capturedFile = new File([blob], `${documentType.replace(/\s+/g, '-')}.jpg`, { type: 'image/jpeg' });
      processFile(capturedFile);
      closeCamera();
    }, 'image/jpeg', 0.95);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-bank-primary">{documentType} Upload</h3>
      
      {!isCameraActive ? (
        <>
          <div 
            className={`document-preview min-h-[200px] flex flex-col items-center justify-center transition-all duration-300 ${preview ? 'p-2' : 'p-8'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {preview ? (
              <div className="relative w-full">
                <img 
                  src={preview} 
                  alt={`${documentType} Preview`} 
                  className="max-h-[300px] mx-auto object-contain rounded"
                />
                
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button 
                    onClick={clearFile}
                    className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <X size={16} className="text-bank-error" />
                  </button>
                  
                  {isVerified && (
                    <div className="bg-bank-success p-1 rounded-full shadow-md">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <FileText size={48} className="text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Drag & drop your {documentType} here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: JPEG, PNG
                </p>
              </>
            )}
          </div>
          
          {!preview && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload size={16} className="mr-1" />
                Browse Files
              </Button>
              
              <Button
                variant="outline"
                onClick={openCamera}
                className="flex-1"
              >
                <Camera size={16} className="mr-1" />
                Use Camera
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}
          
          {isProcessing && (
            <div className="flex items-center justify-center py-2">
              <div className="animate-pulse text-bank-secondary">
                Verifying document...
              </div>
            </div>
          )}
          
          {isVerified && (
            <div className="bg-bank-success/10 border border-bank-success/30 rounded p-3 flex items-center">
              <Check size={16} className="text-bank-success mr-2" />
              <span className="text-sm text-bank-success">
                {documentType} verified successfully
              </span>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="video-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="video-responsive"
            />
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={closeCamera}
              className="flex-1"
            >
              <X size={16} className="mr-1" />
              Cancel
            </Button>
            
            <Button
              className="flex-1 bg-bank-primary hover:bg-bank-primary/90"
              onClick={captureImage}
            >
              <Camera size={16} className="mr-1" />
              Capture
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
