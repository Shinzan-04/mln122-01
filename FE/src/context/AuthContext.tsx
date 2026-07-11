import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { UserDto } from "../types/auth";

const AUTH_TOKEN_KEY = "mln_auth_token";
const AUTH_USER_KEY  = "mln_auth_user";

interface AuthContextValue {
  user: UserDto | null;
  token: string | null;
  login: (token: string, user: UserDto) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  login: () => undefined,
  logout: () => undefined,
  isAuthenticated: false
});

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(AUTH_TOKEN_KEY)
  );
  const [user, setUser] = useState<UserDto | null>(() => {
    const saved = localStorage.getItem(AUTH_USER_KEY);
    return saved ? (JSON.parse(saved) as UserDto) : null;
  });

  const login = useCallback((newToken: string, newUser: UserDto) => {
    localStorage.setItem(AUTH_TOKEN_KEY, newToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}