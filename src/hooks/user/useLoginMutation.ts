import { useMutation } from "@tanstack/react-query";

import { login } from "../../services/user/userService";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
