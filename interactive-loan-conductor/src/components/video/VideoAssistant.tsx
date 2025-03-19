
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoAssistantProps {
  videoSrc: string;
  title: string;
  autoPlay?: boolean;
  onComplete?: () => void;
}

export const VideoAssistant = ({ 
  videoSrc, 
  title, 
  autoPlay = false,
  onComplete 
}: VideoAssistantProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(error => {
        console.error("Error playing video:", error);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
  }, [isMuted]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (onComplete) {
      onComplete();
    }
  };

  // For demo purposes, using a placeholder video
  const placeholderVideo = videoSrc || "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-bank-primary">{title}</h3>
      <div className="video-container bg-gray-100 shadow-md">
        <video
          ref={videoRef}
          className="video-responsive"
          src={placeholderVideo}
          onEnded={handleVideoEnd}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
            className="flex items-center"
          >
            {isPlaying ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMute}
            className="flex items-center"
          >
            {isMuted ? <VolumeX size={16} className="mr-1" /> : <Volume2 size={16} className="mr-1" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>
        </div>
        <p className="text-xs text-gray-500">AI Branch Manager</p>
      </div>
    </div>
  );
};
