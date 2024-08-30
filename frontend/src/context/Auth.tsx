"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { UserCredential, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<UserCredential>({
    token: "",
    data: {
      user_id: "",
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const data = { ...user };
    setAuthState({ token: token || "", data });
  }, []);

  const setUserAuthInfo = (data: UserCredential) => {
    const userData: UserCredential = {
      token: data.token || authState.token,
      data: data.data || authState.data,
    };

    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.data));

    setAuthState(userData);
  };

  const isUserAuthenticated = () => {
    return !!authState.token;
  };

  return (
    <Provider
      value={{
        authState,
        setUserAuthInfo,
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, useAuth };