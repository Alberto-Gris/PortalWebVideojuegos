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
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });      
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Credenciales incorrectas o error en la conexión");
      }
  
      const data = await response.json();
      console.log(data)
      //const { token, user } = data;
  
      //localStorage.setItem("authToken", token);
      //setUser({ name: user.name, email: user.email });
      setStatus(AuthStatus.authenticated);
      console.log("estamos adentro");
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      setStatus(AuthStatus.unauthenticated);
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
