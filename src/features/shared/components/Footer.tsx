import { Box, Link, Typography, styled } from "@mui/material";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  padding: theme.spacing(4),
  textAlign: "center",
  marginTop: theme.spacing(4),
}));

const FooterLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export default function Footer() {
  return (
    <FooterContainer>
      <Typography variant="body2">© {new Date().getFullYear()} MovieTime. All rights reserved.</Typography>
      <FooterLinks>
        <Link href="#" color="inherit" underline="hover">
          Privacy Policy
        </Link>
        <Link href="#" color="inherit" underline="hover">
          Terms of Service
        </Link>
        <Link href="#" color="inherit" underline="hover">
          Contact Us
        </Link>
      </FooterLinks>
    </FooterContainer>
  );
}
