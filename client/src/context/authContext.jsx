import { useEffect } from "react";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parsed = JSON.parse(data);

      setAuth({
        ...auth,
        user: parsed.user,
        token: parsed.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom auth hook
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
