import { AxiosError } from "axios";

import { type PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";

import { useLogin } from "../hooks/user/useLoginMutation";
import { useMeQuery } from "../hooks/user/useMeQuery";
import { useRegister } from "../hooks/user/useRegisterMutation";
import { queryClient } from "../services/config/queryClient";
import { type LoginCredentials, type RegisterCredentials, type User, UserRole } from "../types/User";

type ContextType = {
  authError: string | undefined;
  registrationError: string | undefined;
  auth: string | undefined;
  loginSubmitHandler: (values: LoginCredentials) => Promise<boolean>;
  registerSubmitHandler: (values: RegisterCredentials) => Promise<boolean>;
  logOutSubmitHandler: () => void;
  isLogingIn: boolean;
  isSigningUp: boolean;
  user: User | undefined;
  setCurrentUserInfo: (user: User | undefined) => void;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isClient: boolean;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const initializeState = () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      return auth;
    }
    return undefined;
  };

  const [auth, setAuth] = useState<string | undefined>(initializeState);
  const [user, setUser] = useState<User | undefined>();
  const [authError, setAuthError] = useState<string | undefined>();
  const [registrationError, setRegistrationError] = useState<string | undefined>();

  const { mutateAsync: login, isPending: isLogingIn } = useLogin();
  const { mutateAsync: register, isPending: isSigningUp } = useRegister();
  const { data: me, isSuccess } = useMeQuery(!!auth);

  useEffect(() => {
    if (isSuccess && me) {
      setUser(me);
    }
  }, [isSuccess, me, auth]);

  const loginSubmitHandler = async (values: LoginCredentials) => {
    try {
      const data = await login(values);
      setAuth(data.token);
      localStorage.setItem("auth", data.token);
      setAuthError(undefined);
      return true;
    } catch (err) {
      const error = err as AxiosError;
      if (error.code === "ERR_BAD_REQUEST") {
        setAuthError("Wrong email or password");
      }
      return false;
    }
  };

  const registerSubmitHandler = async (values: RegisterCredentials) => {
    try {
      await register(values);
      setRegistrationError(undefined);
      return true;
    } catch (err) {
      const error = err as AxiosError;
      if (error.code === "ERR_BAD_REQUEST") {
        setRegistrationError(Object.values(error.response?.data as {}).join("\n"));
      }
      return false;
    }
  };

  const logOutSubmitHandler = () => {
    localStorage.removeItem("auth");
    queryClient.removeQueries({ queryKey: ["me"] });
    setTimeout(() => {
      setAuth(undefined);
      setUser(undefined);
    }, 100);
  };

  const setCurrentUserInfo = useCallback((user: User | undefined) => {
    setUser(user);
  }, []);

  const isAdmin = user?.role === UserRole.ADMIN;
  const isSuperAdmin = user?.role === UserRole.SUPER_ADMIN;
  const isClient = user?.role === UserRole.CLIENT;

  const values: ContextType = {
    authError,
    registrationError,
    auth,
    loginSubmitHandler,
    registerSubmitHandler,
    logOutSubmitHandler,
    isLogingIn,
    isSigningUp,
    user,
    setCurrentUserInfo,
    isAdmin,
    isSuperAdmin,
    isClient,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = (): ContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
