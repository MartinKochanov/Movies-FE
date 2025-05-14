import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.text.primary,
}));

export default function NavigationBar() {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledTitle variant="h6">🎬 MovieTime</StyledTitle>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Movies</Button>
        <Button color="inherit">TV Shows</Button>
      </Toolbar>
    </StyledAppBar>
  );
}
