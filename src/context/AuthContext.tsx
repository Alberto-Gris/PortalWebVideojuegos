import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

enum AuthStatus {
  "checking" = "checking",
  "authenticated" = "authenticated",
  "unauthenticated" = "unauthenticated",
}

interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  isChecking: boolean;
  isAuthenticated: boolean;

  //Methods
  loginWithEmailPassword: (email: string, password: string) => void;
  logout: () => void;
}

interface User {
  name: string;
  email: string;
}

export const AuthContext = createContext({} as AuthState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState(AuthStatus.checking);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setTimeout(() => {
      setStatus(AuthStatus.unauthenticated);
    }, 1500);
  }, []);

  const loginWithEmailPassword = async (email: string, password: string) => {
    try {
      const response = await fetch("/data/users.json"); // Cargar JSON simulado
      const users = await response.json();

      // Buscar usuario en la "base de datos"
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        setUser({ name: foundUser.name, email: foundUser.email });
        setStatus(AuthStatus.authenticated);
      } else {
        setStatus(AuthStatus.unauthenticated);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  const logout = () => {
    setUser(undefined);
    setStatus(AuthStatus.unauthenticated);
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          status: status,
          user: user,
          //Getter
          isChecking: status === AuthStatus.checking,
          isAuthenticated: status === AuthStatus.authenticated,
          loginWithEmailPassword,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
