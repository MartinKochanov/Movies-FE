import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCallback } from "react";

import { useAuth } from "../../../context/AuthContext";
import { useDrawer } from "../../../hooks/shared/useDrawer";
import { useScrollOpacity } from "../../../hooks/shared/useScrollOpacity";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileNavigation from "./navigation/MobileNavigation";

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "opacity",
})<{ opacity: number }>(({ opacity }) => ({
  backgroundColor: `rgba(18, 18, 18, ${opacity})`,
  boxShadow: opacity > 0.5 ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
  transition: "background-color 300ms ease, box-shadow 300ms ease",
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 1000,
  "--Paper-overlay": "unset",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.primary.main,
}));

const MobileMenuButton = styled(IconButton)(() => ({
  display: "none",
  "@media (hover: none) and (pointer: coarse)": {
    display: "block", // Show on touch devices
  },
}));

export default function NavigationBar() {
  const { logOutSubmitHandler } = useAuth();
  const navigate = useNavigate();
  const opacity = useScrollOpacity();
  const { open: drawerOpen, toggleDrawer } = useDrawer();

  const handleLogout = useCallback(() => {
    logOutSubmitHandler();
    navigate("/sign-in", { replace: true });
    toast.success("Logged out successfully");
  }, [logOutSubmitHandler, navigate]);

  return (
    <>
      <StyledAppBar opacity={opacity}>
        <Toolbar>
          <StyledTitle variant="h6">🎬 MovieTime</StyledTitle>
          <DesktopNavigation onLogout={handleLogout} />
          <MobileMenuButton color="primary" edge="end" onClick={toggleDrawer}>
            <MenuIcon />
          </MobileMenuButton>
        </Toolbar>
      </StyledAppBar>

      <MobileNavigation open={drawerOpen} onClose={toggleDrawer} onLogout={handleLogout} />
    </>
  );
}
