import { zodResolver } from "@hookform/resolvers/zod";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, Paper, TextField, Typography, styled, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useState } from "react";

import { useAuth } from "../../../context/AuthContext";
import schema from "./loginSchema";

const LoginRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.background.default,
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
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

const PasswordBox = styled(Box)({
  width: "100%",
  position: "relative",
  padding: 0,
});

const PasswordToggle = styled(Button)(() => ({
  minWidth: 0,
  padding: 0,
  position: "absolute",
  top: 32,
  right: 10,
}));

const SignUpLink = styled(Link)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1),
  textDecoration: "none",
  marginTop: theme.spacing(2),
  color: theme.palette.text.primary,
}));

type FormFields = z.infer<typeof schema>;

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [visible, setVisible] = useState<boolean>(false);
  const handleVisibleCLick = () => setVisible((v) => !v);

  const { loginSubmitHandler, authError, isLogingIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo") || "/";

  const onSumbit: SubmitHandler<FormFields> = async (data) => {
    const success = await loginSubmitHandler(data);
    if (success) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <LoginRoot>
      <LoginPaper>
        <form
          onSubmit={handleSubmit(onSumbit)}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
            Welcome Back
          </Typography>
          <Typography variant="h5" align="center" gutterBottom sx={{ marginBottom: 4 }}>
            Sign In
          </Typography>
          {authError && (
            <Typography variant="body1" color={red[400]}>
              {authError}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            color="primary"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <PasswordBox>
            <TextField
              fullWidth
              label="Password"
              color="primary"
              type={visible ? "text" : "password"}
              variant="outlined"
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <PasswordToggle onClick={handleVisibleCLick}>
              {visible ? <VisibilityOffIcon color="primary" /> : <RemoveRedEyeIcon color="primary" />}
            </PasswordToggle>
          </PasswordBox>
          <Button
            disabled={isLogingIn}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, padding: 1 }}
          >
            {isLogingIn ? "Signing In" : "Sign In"}
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            <SignUpLink to={"/sign-up"}>
              <Typography variant="body2">Don't have an account?</Typography>
              <Typography variant="body2" color={theme.palette.primary.main}>
                Sign Up
              </Typography>
            </SignUpLink>
          </Typography>
        </form>
      </LoginPaper>
    </LoginRoot>
  );
};

export default LoginPage;
