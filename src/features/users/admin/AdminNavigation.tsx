import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MovieIcon from "@mui/icons-material/Movie";
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCallback, useState } from "react";

import { useAuth } from "../../../context/AuthContext";
import ThemeToggle from "../../shared/components/ThemeToggle";

const DrawerWidth = 220;
const CollapsedWidth = 64;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: DrawerWidth,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    borderRight: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(2),
    overflowX: "hidden",
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  minHeight: 64,
  gap: theme.spacing(1),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: 22,
  letterSpacing: 1,
}));

export default function AdminNavigation() {
  const { auth, logOutSubmitHandler } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logOutSubmitHandler();
    navigate("/sign-in", { replace: true });
    toast.success("Logged out successfully");
  }, [logOutSubmitHandler, navigate]);

  const renderDrawerContent = (showText: boolean) => (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <DrawerHeader>
        {showText ? (
          <StyledTitle variant="h6">🎬 MovieTime</StyledTitle>
        ) : (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Typography variant="h6" aria-label="MovieTime" sx={{ fontWeight: 700 }}>
              🎬
            </Typography>
          </Box>
        )}
      </DrawerHeader>

      <List>
        <ListItemButton
          component={Link}
          to={"/admin/dashboard"}
          sx={{ justifyContent: showText ? "flex-start" : "center", px: showText ? 2 : 1 }}
        >
          <ListItemIcon sx={{ minWidth: showText ? 40 : 0, mr: showText ? 2 : 0, justifyContent: "center" }}>
            <HomeIcon />
          </ListItemIcon>
          {showText ? <ListItemText primary="Home" /> : null}
        </ListItemButton>
        <ListItemButton
          component={Link}
          to={"/admin/movies"}
          sx={{ justifyContent: showText ? "flex-start" : "center", px: showText ? 2 : 1 }}
        >
          <ListItemIcon sx={{ minWidth: showText ? 40 : 0, mr: showText ? 2 : 0, justifyContent: "center" }}>
            <MovieIcon />
          </ListItemIcon>
          {showText ? <ListItemText primary="Movies" /> : null}
        </ListItemButton>
        <ListItemButton
          component={Link}
          to={"/admin/series"}
          sx={{ justifyContent: showText ? "flex-start" : "center", px: showText ? 2 : 1 }}
        >
          <ListItemIcon sx={{ minWidth: showText ? 40 : 0, mr: showText ? 2 : 0, justifyContent: "center" }}>
            <LiveTvIcon />
          </ListItemIcon>
          {showText ? <ListItemText primary="Series" /> : null}
        </ListItemButton>
        {auth && (
          <ListItemButton
            onClick={() => {
              handleLogout();
            }}
            sx={{ justifyContent: showText ? "flex-start" : "center", px: showText ? 2 : 1 }}
          >
            <ListItemIcon sx={{ minWidth: showText ? 40 : 0, mr: showText ? 2 : 0, justifyContent: "center" }}>
              <LogoutIcon />
            </ListItemIcon>
            {showText ? <ListItemText primary="Sign-Out" /> : null}
          </ListItemButton>
        )}
      </List>

      <Box sx={{ mt: "auto" }}>
        {" "}
        {/* Theme toggle at footer (always bottom) */}
        <List>
          <ThemeToggle variant="slider" />
          {/* Collapse/Expand toggle at absolute bottom */}
          <Divider sx={{ mb: 1 }} />

          <ListItemButton
            onClick={() => setCollapsed((prev) => !prev)}
            sx={{ justifyContent: showText ? "flex-start" : "center", px: showText ? 2 : 1 }}
          >
            <ListItemIcon sx={{ minWidth: showText ? 40 : 0, mr: showText ? 2 : 0, justifyContent: "center" }}>
              <MenuIcon />
            </ListItemIcon>
            {showText ? null : null}
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <StyledDrawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block", sm: "block" },
          width: collapsed ? CollapsedWidth : DrawerWidth,
          "& .MuiDrawer-paper": {
            width: collapsed ? CollapsedWidth : DrawerWidth,
          },
        }}
      >
        {renderDrawerContent(!collapsed)}
      </StyledDrawer>
    </>
  );
}
