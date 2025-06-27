import { zodResolver } from "@hookform/resolvers/zod";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, Paper, TextField, Typography, styled, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useState } from "react";

import { useAuth } from "../../../context/AuthContext";
import schema from "./registerSchema";

type FormFields = z.infer<typeof schema>;

const RegisterRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.background.default,
}));

const RegisterPaper = styled(Paper)(({ theme }) => ({
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

const SignInLink = styled(Link)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1),
  textDecoration: "none",
  marginTop: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const RegisterPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [visible, setVisible] = useState<boolean>(false);
  const handleVisibleCLick = () => setVisible((v) => !v);

  const { registerSubmitHandler, registrationError, isSigningUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const registered = await registerSubmitHandler(data);
    if (registered) {
      navigate("/sign-in");
    }
  };

  return (
    <RegisterRoot>
      <RegisterPaper>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
            Welcome
          </Typography>
          <Typography variant="h5" align="center" gutterBottom sx={{ marginBottom: 4 }}>
            Sign Up
          </Typography>
          {registrationError && (
            <Typography variant="body1" color={red[400]}>
              {registrationError}
            </Typography>
          )}
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <PasswordBox>
            <TextField
              fullWidth
              label="Password"
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
          <TextField
            fullWidth
            label="Repeat Password"
            type={visible ? "text" : "password"}
            variant="outlined"
            margin="normal"
            {...register("repeatPassword")}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, padding: 1 }}
            type="submit"
            disabled={isSigningUp}
          >
            {isSigningUp ? "Signing Up" : "Sign Up"}
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            <SignInLink to="/sign-in">
              <Typography variant="body2">Already have an account?</Typography>
              <Typography variant="body2" color={theme.palette.primary.main}>
                Sign In
              </Typography>
            </SignInLink>
          </Typography>
        </form>
      </RegisterPaper>
    </RegisterRoot>
  );
};

export default RegisterPage;
