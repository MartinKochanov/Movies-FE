import { AppBar, Button, Toolbar, Typography } from "@mui/material";
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

export default function NavigationBar() {
  const [opacity, setOpacity] = useState(0);

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

  return (
    <StyledAppBar opacity={opacity}>
      <Toolbar>
        <StyledTitle variant="h6">🎬 MovieTime</StyledTitle>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Movies</Button>
        <Button color="inherit">TV Shows</Button>
      </Toolbar>
    </StyledAppBar>
  );
}
