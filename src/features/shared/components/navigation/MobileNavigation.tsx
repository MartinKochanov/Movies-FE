import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

import { useAuth } from "../../../../context/AuthContext";
import ThemeToggle from "../ThemeToggle";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function MobileNavigation({ open, onClose, onLogout }: MobileNavigationProps) {
  const { auth } = useAuth();

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <List>
        <ThemeToggle variant="mobile" />
        <ListItemButton component={Link} to={"/"} onClick={onClose}>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to={"/movies"} onClick={onClose}>
          <ListItemText primary="Movies" />
        </ListItemButton>
        <ListItemButton component={Link} to={"/series"} onClick={onClose}>
          <ListItemText primary="Series" />
        </ListItemButton>
        {!auth ? (
          <>
            <ListItemButton component={Link} to={"/sign-in"} onClick={onClose}>
              <ListItemText primary="Sign-In" />
            </ListItemButton>
            <ListItemButton component={Link} to={"/sign-up"} onClick={onClose}>
              <ListItemText primary="Sign-Up" />
            </ListItemButton>
          </>
        ) : (
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Sign-Out" />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
}
