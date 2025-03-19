
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video, Camera, Square, Upload } from "lucide-react";

interface VideoRecorderProps {
  onVideoRecorded: (videoBlob: Blob) => void;
  maxDuration?: number; // in seconds
  question?: string;
}

export const VideoRecorder = ({ 
  onVideoRecorded, 
  maxDuration = 30,
  question
}: VideoRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(maxDuration);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraAvailable, setIsCameraAvailable] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Check if camera is available
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setIsCameraAvailable(true);
      })
      .catch(error => {
        console.error("Camera not available:", error);
        setIsCameraAvailable(false);
      });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isRecording && countdown === 0) {
      stopRecording();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, countdown]);

  const startRecording = async () => {
    if (!isCameraAvailable) return;
    
    chunksRef.current = [];
    setCountdown(maxDuration);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setCameraStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        setRecordedVideo(videoUrl);
        onVideoRecorded(videoBlob);
        
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
          setCameraStream(null);
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      setIsCameraAvailable(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setRecordedVideo(null);
    setCountdown(maxDuration);
    
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const submitVideo = () => {
    // This would typically upload the video or process it further
    resetRecording();
  };

  return (
    <div className="space-y-4">
      {question && (
        <div className="bg-bank-secondary/20 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-bank-text">{question}</h3>
        </div>
      )}
      
      <div className="video-container border border-muted">
        {recordedVideo ? (
          <video
            ref={videoRef}
            className="video-responsive"
            src={recordedVideo}
            controls
          />
        ) : (
          <video
            ref={videoRef}
            className="video-responsive"
            autoPlay
            muted
            playsInline
          />
        )}
        
        {isRecording && (
          <div className="absolute top-2 right-2 bg-bank-error/80 text-white px-2 py-1 rounded-full flex items-center text-sm">
            <span className="recording-indicator mr-1"></span>
            {countdown}s
          </div>
        )}
        
        {!isCameraAvailable && !recordedVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center p-4">
              <Camera size={48} className="mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600">Camera not available</p>
              <p className="text-sm text-gray-500 mt-1">Please check your camera permissions and try again</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {!recordedVideo && !isRecording && isCameraAvailable && (
          <Button
            onClick={startRecording}
            className="bg-bank-primary hover:bg-bank-primary/90"
          >
            <Video size={16} className="mr-1" />
            Start Recording
          </Button>
        )}
        
        {isRecording && (
          <Button
            onClick={stopRecording}
            variant="destructive"
          >
            <Square size={16} className="mr-1" />
            Stop Recording
          </Button>
        )}
        
        {recordedVideo && (
          <>
            <Button
              onClick={resetRecording}
              variant="outline"
            >
              <Camera size={16} className="mr-1" />
              Record Again
            </Button>
            
            <Button
              onClick={submitVideo}
              className="bg-bank-success hover:bg-bank-success/90 text-white"
            >
              <Upload size={16} className="mr-1" />
              Submit Response
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
