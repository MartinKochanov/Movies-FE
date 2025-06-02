import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Dialog, DialogContent, IconButton, styled } from "@mui/material";
import ReactPlayer from "react-player";

import { useState } from "react";

type TrailerModalProps = {
  open: boolean;
  onClose: () => void;
  trailerUrl: string;
  onPlay?: (isPlaying: boolean) => void;
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

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.text.primary,
  zIndex: 20,
}));

const VideoContainer = styled("div")({
  position: "relative",
  width: "100%",
  backgroundColor: "black",
});

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
  zIndex: 10,
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

export default function TrailerModal({ open, onClose, trailerUrl, onPlay }: TrailerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false); // Separate state for playback

  const handlePlay = () => {
    setIsPlaying(true); // Start playback explicitly
    onPlay?.(true); // Notify parent that playback has started
  };

  const handlePause = () => {
    setIsPlaying(false); // Stop playback explicitly
    onPlay?.(false); // Notify parent that playback has stopped
  };

  const handleClose = () => {
    setIsPlaying(false); // Ensure playback stops when modal is closed
    onClose();
    onPlay?.(false); // Notify parent that playback has stopped
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <StyledDialogContent>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <VideoContainer>
          {!isPlaying && (
            <Overlay>
              <PlayButton onClick={handlePlay}>
                <PlayArrowIcon fontSize="large" />
              </PlayButton>
            </Overlay>
          )}
          <ReactPlayer
            url={trailerUrl}
            width="100%"
            height="100%"
            controls
            playing={isPlaying} // Use isPlaying state for playback control
            onPlay={handlePlay} // Trigger handlePlay only when playback starts
            onPause={handlePause} // Trigger handlePause when playback pauses
            onEnded={handlePause} // Trigger handlePause when playback ends
          />
        </VideoContainer>
      </StyledDialogContent>
    </StyledDialog>
  );
}
