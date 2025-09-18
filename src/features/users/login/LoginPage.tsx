import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAuth } from "../../../context/AuthContext";
import AuthForm from "../../shared/components/forms/AuthForm";
import PasswordField from "../../shared/components/forms/PasswordField";
import schema from "./loginSchema";


type FormFields = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const success = await loginSubmitHandler(data);
    if (success) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign In"
      error={authError}
      onSubmit={handleSubmit(onSubmit)}
      submitText="Sign In"
      isSubmitting={isLogingIn}
      linkText="Don't have an account?"
      linkTo="/sign-up"
      linkActionText="Sign Up"
    >
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
      <PasswordField
        label="Password"
        register={register}
        name="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        color="primary"
      />
    </AuthForm>
  );
};

export default LoginPage;
