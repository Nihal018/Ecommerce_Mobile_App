import { createContext, useState } from "react";

export const AuthContext = createContext({
  userId: "",
  isAuthenticated: false,
  authenticate: (userId: string) => {},
  logout: () => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState("");

  function authenticate(userId: string) {
    setUserId(userId);
  }

  function logout() {
    setUserId("");
  }

  const value = {
    userId: userId,
    isAuthenticated: userId === "" ? false : true,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
