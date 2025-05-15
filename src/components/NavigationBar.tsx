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

import { useEffect, useState } from "react";

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
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.common.white,
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const DesktopButtons = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export default function NavigationBar() {
  const [opacity, setOpacity] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
            <Button color="inherit">Home</Button>
            <Button color="inherit">Movies</Button>
            <Button color="inherit">TV Shows</Button>
          </DesktopButtons>
          <MobileMenuButton color="inherit" edge="end" onClick={toggleDrawer}>
            <MenuIcon />
          </MobileMenuButton>
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItemButton>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Movies" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="TV Shows" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
