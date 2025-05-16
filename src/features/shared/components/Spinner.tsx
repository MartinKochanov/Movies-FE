import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const SpinnerContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

const Spinner = () => {
  return (
    <SpinnerContainer>
      <CircularProgress />
    </SpinnerContainer>
  );
};

export default Spinner;
