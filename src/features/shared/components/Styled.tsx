import { Box, Button, Chip, Grid, IconButton, styled } from "@mui/material";

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  paddingBottom: theme.spacing(4),
}));

export const CardGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

export const CenteredText = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginTop: theme.spacing(4),
}));

export const SeriesChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  fontWeight: "bold",
  textTransform: "uppercase",
  marginBottom: theme.spacing(2),
}));

export const GenreListContainer = styled("div")(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    overflowY: "visible",
    flex: "unset",
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
}));

export const Sidebar = styled("aside")(({ theme }) => ({
  width: 260,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  minHeight: "80vh",
  position: "fixed",
  left: 0,
  top: 130,
  bottom: 0,
  zIndex: 1100,
  boxShadow: theme.shadows[3],
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    position: "static",
    width: "100%",
    minHeight: "unset",
    borderRadius: theme.spacing(1),
    flexDirection: "row",
    alignItems: "center",
    boxShadow: "none",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}));

export const ChipsContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    marginTop: 0,
    marginLeft: theme.spacing(2),
  },
}));

export const MainContent = styled("main")(({ theme }) => ({
  flex: 1,
  marginLeft: 280,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
}));

export const MobileFilterButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  top: 80,
  left: 16,
  zIndex: 1200,
  background: "#fff",
  boxShadow: theme.shadows[2],
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const DrawerPaper = styled("div")(({ theme }) => ({
  width: 260,
  padding: theme.spacing(2),
  paddingTop: theme.spacing(4),
  height: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
}));

export const DrawerClearButton = styled(Button)(({ theme }) => ({
  width: "100%",
  marginTop: 16,
  [theme.breakpoints.down("md")]: {
    width: "auto",
    marginTop: 0,
    marginLeft: 8,
  },
}));

export const PlayButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  zIndex: 10,
  transition: "opacity 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
