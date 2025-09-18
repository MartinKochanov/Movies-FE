import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { forwardRef, useState } from "react";

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

interface PasswordFieldProps {
  label: string;
  error?: boolean;
  helperText?: string;
  register: any;
  name: string;
  margin?: "normal" | "dense" | "none";
  fullWidth?: boolean;
  variant?: "outlined" | "filled" | "standard";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, helperText, register, name, margin = "normal", fullWidth = true, variant = "outlined", color = "primary" }, ref) => {
    const [visible, setVisible] = useState(false);
    
    const handleToggleVisibility = () => setVisible((prev) => !prev);

    return (
      <PasswordBox>
        <TextField
          ref={ref}
          fullWidth={fullWidth}
          label={label}
          type={visible ? "text" : "password"}
          variant={variant}
          color={color}
          margin={margin}
          {...register(name)}
          error={error}
          helperText={helperText}
        />
        <PasswordToggle onClick={handleToggleVisibility}>
          {visible ? <VisibilityOffIcon color="primary" /> : <RemoveRedEyeIcon color="primary" />}
        </PasswordToggle>
      </PasswordBox>
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
