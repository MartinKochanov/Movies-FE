import { Brightness2, Brightness4 } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCallback, useState } from "react";

import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../types/Shared";

const DrawerWidth = 220;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: DrawerWidth,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    borderRight: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(2),
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  minHeight: 64,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: 22,
  letterSpacing: 1,
}));

const Content = styled("main")(({ theme }) => ({
  marginLeft: DrawerWidth,
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    padding: theme.spacing(1),
  },
}));

export default function AdminNavigation() {
  const { auth, logOutSubmitHandler } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();

  const handleLogout = useCallback(() => {
    logOutSubmitHandler();
    navigate("/sign-in", { replace: true });
    toast.success("Logged out successfully");
  }, [logOutSubmitHandler, navigate]);

  // For mobile: toggle drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box>
      <DrawerHeader>
        <StyledTitle variant="h6">🎬 MovieTime</StyledTitle>
        <IconButton onClick={toggleTheme} sx={{ ml: "auto" }}>
          {theme === Theme.LIGHT ? <Brightness4 color="primary" /> : <Brightness2 color="primary" />}
        </IconButton>
      </DrawerHeader>
      <List>
        <ListItemButton component={Link} to={"/admin/dashboard"}>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to={"/admin/movies"}>
          <ListItemText primary="Movies" />
        </ListItemButton>
        <ListItemButton component={Link} to={"/admin/series"}>
          <ListItemText primary="Series" />
        </ListItemButton>
        {auth && (
          <ListItemButton
            onClick={() => {
              handleLogout();
            }}
          >
            <ListItemText primary="Sign-Out" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <>
      {/* AppBar for mobile menu button */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, display: { sm: "none" } }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Permanent drawer for desktop, temporary for mobile */}
      <StyledDrawer variant="permanent" open sx={{ display: { xs: "none", sm: "block" } }}>
        {drawerContent}
      </StyledDrawer>
      <StyledDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {drawerContent}
      </StyledDrawer>
      {/* The rest of your admin page content should be wrapped in <Content> */}
    </>
  );
}
