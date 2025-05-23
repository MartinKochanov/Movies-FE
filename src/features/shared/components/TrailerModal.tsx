import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, IconButton, styled } from "@mui/material";
import ReactPlayer from "react-player";

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
  zIndex: 10,
}));

const VideoContainer = styled("div")({
  position: "relative",
  width: "100%",
  backgroundColor: "black",
});

export default function TrailerModal({ open, onClose, trailerUrl, onPlay }: TrailerModalProps) {
  const handlePlay = () => {
    onPlay?.(true);
  };

  const handlePause = () => {
    onPlay?.(false);
  };
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <StyledDialogContent>
        <CloseButton
          onClick={() => {
            onClose();
            onPlay?.(false);
          }}
        >
          <CloseIcon />
        </CloseButton>
        <VideoContainer>
          <ReactPlayer
            url={trailerUrl}
            width="100%"
            height="100%"
            controls
            playing={open}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handlePause}
          />
        </VideoContainer>
      </StyledDialogContent>
    </StyledDialog>
  );
}
