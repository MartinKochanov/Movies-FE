import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Dialog, DialogContent, IconButton, Slider, Typography, styled } from "@mui/material";
import ReactPlayer from "react-player";

import { useEffect, useRef, useState } from "react";

type TrailerModalProps = {
  open: boolean;
  onClose: () => void;
  trailerUrl: string;
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.default,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
    borderRadius: theme.spacing(2),
    overflow: "hidden",
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  position: "relative",
  padding: 0,
  backgroundColor: theme.palette.background.default,
}));

const Overlay = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 5,
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  boxShadow: `0 4px 10px ${theme.palette.primary.dark}`,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.text.primary,
  zIndex: 10,
}));

const VideoContainer = styled("div")({
  position: "relative",
  width: "100%",
  backgroundColor: "black",
});

const ControlsContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  right: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  zIndex: 11,
}));

const VolumeControlContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "13%",
});

const ControlsBox = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  alignItems: "center",
  transition: "all 0.3s ease",
}));

const TimeTrackerContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "8px",
});

export default function TrailerModal({ open, onClose, trailerUrl }: TrailerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlayPause = () => setIsPlaying((prev) => !prev);
  const toggleMute = () => setMuted((prev) => !prev);
  const handleVolumeChange = (_: Event, newValue: number | number[]) => setVolume(newValue as number);

  const toggleFullscreen = () => {
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainerRef.current.requestFullscreen();
      }
    }
  };

  const handleProgress = () => {
    if (playerRef.current) {
      setCurrentTime(playerRef.current.getCurrentTime());
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (_: Event, newValue: number | number[]) => {
    if (playerRef.current) {
      playerRef.current.seekTo(newValue as number);
      setCurrentTime(newValue as number);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleMouseMove = () => {
    setShowControls(true); // Show controls on mouse movement
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current); // Clear previous timeout
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false); // Hide controls after 3 seconds of inactivity
    }, 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleProgress();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <StyledDialogContent onMouseMove={handleMouseMove}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <VideoContainer ref={videoContainerRef}>
          {!isPlaying && (
            <Overlay onClick={togglePlayPause}>
              <PlayButton onClick={togglePlayPause}>
                <PlayArrowIcon fontSize="large" />
              </PlayButton>
            </Overlay>
          )}
          <ReactPlayer
            ref={playerRef}
            url={trailerUrl}
            width="100%"
            height="100%"
            playing={isPlaying}
            volume={volume}
            muted={muted}
            controls={false}
            onDuration={handleDuration}
            onClick={togglePlayPause}
          />
          {showControls && ( // Conditionally render controls
            <ControlsContainer>
              {/* Time Tracker and Seek Bar */}
              <TimeTrackerContainer>
                <Typography variant="body2" color="textSecondary">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </Typography>
              </TimeTrackerContainer>
              <Slider
                value={currentTime}
                onChange={handleSeek}
                min={0}
                max={duration}
                step={0.1}
                aria-labelledby="time-slider"
              />

              {/* Play/Pause Button */}
              <ControlsBox>
                <IconButton onClick={togglePlayPause} color="primary">
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                {/* Volume Control */}
                <VolumeControlContainer>
                  <IconButton onClick={toggleMute} color="primary">
                    {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                  </IconButton>
                  <Slider
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    min={0}
                    max={1}
                    step={0.1}
                    aria-labelledby="volume-slider"
                  />
                  {/* Fullscreen Button */}
                  <IconButton onClick={toggleFullscreen} color="primary">
                    <FullscreenIcon />
                  </IconButton>
                </VolumeControlContainer>
              </ControlsBox>
            </ControlsContainer>
          )}
        </VideoContainer>
      </StyledDialogContent>
    </StyledDialog>
  );
}
