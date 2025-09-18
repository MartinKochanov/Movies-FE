import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAuth } from "../../../context/AuthContext";
import AuthForm from "../../shared/components/forms/AuthForm";
import PasswordField from "../../shared/components/forms/PasswordField";
import schema from "./registerSchema";

type FormFields = z.infer<typeof schema>;

const RegisterPage = () => {
  const navigate = useNavigate();
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
    <AuthForm
      title="Welcome"
      subtitle="Sign Up"
      error={registrationError}
      onSubmit={handleSubmit(onSubmit)}
      submitText="Sign Up"
      isSubmitting={isSigningUp}
      linkText="Already have an account?"
      linkTo="/sign-in"
      linkActionText="Sign In"
    >
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
      <PasswordField
        label="Password"
        register={register}
        name="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <PasswordField
        label="Repeat Password"
        register={register}
        name="repeatPassword"
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
      />
    </AuthForm>
  );
};

export default RegisterPage;
