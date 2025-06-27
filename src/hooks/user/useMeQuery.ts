import { useQuery } from "@tanstack/react-query";

import { me } from "../../services/user/userService";
import type { User } from "../../types/User";

export const useMeQuery = (enabled: boolean) =>
  useQuery<User>({
    queryKey: ["me"],
    queryFn: me,
    enabled,
    retry: false,
  });
