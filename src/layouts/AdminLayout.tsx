import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "../features/shared/components/Footer";
import ScrollToTop from "../features/shared/components/ScrollToTop";
import { StyledMain } from "../features/shared/components/Styled";
import AdminNavigation from "../features/users/admin/AdminNavigation";

const AdminLayout = () => {
  return (
    <>
      <CssBaseline />
      <AdminNavigation />
      <ScrollToTop />
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Footer />
    </>
  );
};

export default AdminLayout;
