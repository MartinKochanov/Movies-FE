import { Button, List } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

import { useAuth } from "../../../../context/AuthContext";
import ThemeToggle from "../ThemeToggle";

const DesktopButtons = styled(List)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  "@media (hover: none) and (pointer: coarse)": {
    display: "none",
  },
}));

interface DesktopNavigationProps {
  onLogout: () => void;
}

export default function DesktopNavigation({ onLogout }: DesktopNavigationProps) {
  const { auth } = useAuth();

  return (
    <DesktopButtons>
      <Button component={Link} to={"/"} color="primary">
        Home
      </Button>
      <Button component={Link} to={"/movies"} color="primary">
        Movies
      </Button>
      <Button component={Link} to={"/series"} color="primary">
        Series
      </Button>
      {!auth ? (
        <>
          <Button component={Link} to={"/sign-in"} color="primary">
            Sign-In
          </Button>
          <Button component={Link} to={"/sign-up"} color="primary">
            Sign-up
          </Button>
        </>
      ) : (
        <Button onClick={onLogout} color="primary">
          Sign-Out
        </Button>
      )}
      <ThemeToggle variant="slider" />
    </DesktopButtons>
  );
}
