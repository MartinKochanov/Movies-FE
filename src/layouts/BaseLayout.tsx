import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

import Footer from "../features/shared/components/Footer";
import NavigationBar from "../features/shared/components/NavigationBar";
import ScrollToTop from "../features/shared/components/ScrollToTop";

// Styled components
const StyledMain = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: "calc(100vh - 64px)", // Adjust for navbar height
}));

const BaseLayout = () => {
  return (
    <>
      <CssBaseline />
      <NavigationBar />
      <ScrollToTop />
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Footer />
    </>
  );
};

export default BaseLayout;
