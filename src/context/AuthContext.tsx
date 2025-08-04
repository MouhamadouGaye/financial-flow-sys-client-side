// src/context/AuthContext.tsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  LoginDto,
  UserResponseDto,
  UserRegistrationDto,
} from "@/types/banking";
import {
  loginApi,
  registerApi,
  logoutApi,
  getCurrentUser,
} from "@/lib/services/authService";
import axios from "axios";

interface AuthContextType {
  user: UserResponseDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  register: (userData: UserRegistrationDto) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Ensure Axios sends cookies for every request
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Attempt to get the current session from cookie
    const init = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const login = async (credentials: LoginDto) => {
    setIsLoading(true);
    try {
      await loginApi(credentials); // Backend should set HttpOnly cookie
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: UserRegistrationDto) => {
    setIsLoading(true);
    try {
      await registerApi(userData);
      // Optional: auto-login user after registration
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await logoutApi(); // Backend clears cookie
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
