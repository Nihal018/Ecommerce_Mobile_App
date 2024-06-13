import AsyncStorage from "@react-native-async-storage/async-storage"; // can only store string data

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  userFirebaseId: "",
  isAuthenticated: false,
  authenticate: (token: string, firebaseId: string) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");
  const [userFirebaseId, setUserFirebaseId] = useState("");

  function authenticate(token: string, firebaseId: string) {
    setAuthToken(token);
    setUserFirebaseId(firebaseId);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken("");
    setUserFirebaseId("");
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    userFirebaseId: userFirebaseId,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
