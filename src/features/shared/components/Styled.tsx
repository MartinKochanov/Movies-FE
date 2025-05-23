import { Box, Chip, Grid, styled } from "@mui/material";

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
