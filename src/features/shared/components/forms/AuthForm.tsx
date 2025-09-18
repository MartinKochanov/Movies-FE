import { Box, Button, Paper, Typography, styled } from "@mui/material";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";

const AuthRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.background.default,
}));

const AuthPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  borderRadius: theme.spacing(2),
  backgroundColor: "transparent",
  boxShadow: theme.shadows[4],
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const AuthLink = styled(Link)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1),
  textDecoration: "none",
  marginTop: theme.spacing(2),
  color: theme.palette.text.primary,
}));

interface AuthFormProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  error?: string;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  isSubmitting: boolean;
  linkText: string;
  linkTo: string;
  linkActionText: string;
}

export default function AuthForm({
  title,
  subtitle,
  children,
  error,
  onSubmit,
  submitText,
  isSubmitting,
  linkText,
  linkTo,
  linkActionText,
}: AuthFormProps) {
  return (
    <AuthRoot>
      <AuthPaper>
        <form
          onSubmit={onSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="h5" align="center" gutterBottom sx={{ marginBottom: 4 }}>
            {subtitle}
          </Typography>
          {error && (
            <Typography variant="body1" color={red[400]}>
              {error}
            </Typography>
          )}
          {children}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, padding: 1 }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? `${submitText}...` : submitText}
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            <AuthLink to={linkTo}>
              <Typography variant="body2">{linkText}</Typography>
              <Typography variant="body2" color="primary">
                {linkActionText}
              </Typography>
            </AuthLink>
          </Typography>
        </form>
      </AuthPaper>
    </AuthRoot>
  );
}
