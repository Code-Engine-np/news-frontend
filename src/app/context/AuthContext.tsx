"use client";

import { useCallback, useReducer, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { login as apiLogin } from "@/src/lib/api";
import type { UserProfile } from "@/src/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; user: UserProfile; token: string }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" };

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

/* ------------------------------------------------------------------ */
/*  Reducer                                                            */
/* ------------------------------------------------------------------ */

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
      return {
        user: action.user,
        token: action.token,
        isLoading: false,
      };
    case "LOGIN_ERROR":
      return { ...state, isLoading: false };
    case "LOGOUT":
      return { user: null, token: null, isLoading: false };
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCESS_TOKEN_KEY = "best_khabar_access_token";
const REFRESH_TOKEN_KEY = "best_khabar_refresh_token";
const USER_KEY = "best_khabar_user";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function getStoredUser(): UserProfile | null {
  if (typeof window === "undefined") return null;

  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as UserProfile;
  } catch {
    return null;
  }
}

function getInitialAuthState(): AuthState {
  return {
    user: getStoredUser(),
    token: getToken(),
    isLoading: false,
  };
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    authReducer,
    undefined,
    getInitialAuthState,
  );

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await apiLogin({ email, password });
      // console.log("Login response:", response);
      // isAuthenticated=?true,
      // const { accessToken, refreshToken } = response.AuthTokens;
      const { accessToken, refreshToken } = response.AuthTokens;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      dispatch({
        type: "LOGIN_SUCCESS",
        user: response.user,
        token: accessToken,
      });
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" });
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isAuthenticated: !!state.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
