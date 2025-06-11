import { Brightness2, Brightness4 } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
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
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../types/Shared";

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

const ToggleButton = styled(IconButton)(() => ({
  color: "white",
  transition: "all 0.3s ease",
}));

const MobileToggleButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === Theme.LIGHT ? "black" : "white",
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

const DesktopButtons = styled(List)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  "@media (hover: none) and (pointer: coarse)": {
    display: "none", // Hide on touch devices
  },
}));

export default function NavigationBar() {
  const [opacity, setOpacity] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxOpacity = 1;
      const scrollThreshold = 300;

      const newOpacity = Math.min(scrollY / scrollThreshold, maxOpacity);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <StyledAppBar opacity={opacity}>
        <Toolbar>
          <StyledTitle variant="h6">🎬 MovieTime</StyledTitle>
          <DesktopButtons>
            <Button component={Link} to={"/"} color="primary">
              Home
            </Button>
            <Button component={Link} to={"/movies"} color="primary">
              Movies
            </Button>
            <Button color="primary">Series</Button>
            <ToggleButton onClick={toggleTheme}>
              {theme === "light" ? <Brightness4 color="primary" /> : <Brightness2 color="primary" />}
            </ToggleButton>
          </DesktopButtons>
          <MobileMenuButton color="primary" edge="end" onClick={toggleDrawer}>
            <MenuIcon />
          </MobileMenuButton>
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <MobileToggleButton onClick={toggleTheme}>
            {theme === Theme.LIGHT ? <Brightness4 /> : <Brightness2 />}
          </MobileToggleButton>
          <ListItemButton component={Link} to={"/"} onClick={toggleDrawer}>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton component={Link} to={"/movies"}>
            <ListItemText primary="Movies" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Series" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
