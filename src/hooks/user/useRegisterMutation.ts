import { useMutation } from "@tanstack/react-query";

import { register } from "../../services/user/userService";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
