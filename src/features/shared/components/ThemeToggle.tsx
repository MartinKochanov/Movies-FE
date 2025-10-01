import { Brightness2, Sunny } from "@mui/icons-material";
import { Box, IconButton, ListItemButton } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useCallback } from "react";

import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../types/Shared";

// Custom animated theme slider
const ThemeSlider = styled(Box)<{ $isDark: boolean }>(({ theme, $isDark }) => ({
  position: "relative",
  width: 58,
  height: 32,
  borderRadius: 32,
  backgroundColor: $isDark ? theme.palette.grey[800] : theme.palette.grey[300],
  border: `1px solid ${theme.palette.divider}`,
  cursor: "pointer",
  transition: "background-color 200ms ease, border-color 200ms ease",
  display: "flex",
  alignItems: "center",
  padding: 4,
}));

const SliderThumb = styled(Box)<{ $isDark: boolean }>(({ theme, $isDark }) => ({
  position: "absolute",
  top: 4,
  left: 4,
  width: 24,
  height: 24,
  borderRadius: "50%",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  transform: `translateX(${$isDark ? 25 : 0}px)`,
  transition: "transform 200ms ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SimpleToggleButton = styled(IconButton)(() => ({
  color: "white",
  transition: "all 0.3s ease",
}));

const MobileToggleButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === Theme.LIGHT ? "black" : "white",
}));

const StyledListItemButton = styled(ListItemButton)(() => ({
  "&:hover": {
    backgroundColor: "transparent !important",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "transparent !important",
  },
  "&.Mui-selected": {
    backgroundColor: "transparent !important",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "transparent !important",
  },
}));

interface ThemeToggleProps {
  variant?: "slider" | "simple" | "mobile";
  className?: string;
}

export default function ThemeToggle({ variant = "slider", className }: ThemeToggleProps) {
  const { toggleTheme, theme } = useTheme();
  const isDark = theme !== Theme.LIGHT;

  const handleThemeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  if (variant === "simple") {
    return (
      <SimpleToggleButton onClick={handleThemeToggle} className={className}>
        {isDark ? <Brightness2 color="primary" /> : <Sunny color="primary" />}
      </SimpleToggleButton>
    );
  }

  if (variant === "mobile") {
    return (
      <MobileToggleButton onClick={handleThemeToggle} className={className}>
        {isDark ? <Brightness2 /> : <Sunny />}
      </MobileToggleButton>
    );
  }

  // Default slider variant
  return (
    <StyledListItemButton sx={{ px: 2, justifyContent: "flex-start" }} disableRipple onClick={handleThemeToggle}>
      <ThemeSlider $isDark={isDark}>
        <SliderThumb $isDark={isDark}>
          {isDark ? <Brightness2 fontSize="small" color="primary" /> : <Sunny fontSize="small" color="primary" />}
        </SliderThumb>
      </ThemeSlider>
    </StyledListItemButton>
  );
}
