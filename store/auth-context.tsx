import AsyncStorage from "@react-native-async-storage/async-storage"; // can only store string data
import { useSQLiteContext } from "expo-sqlite";

import { createContext, useContext, useEffect, useState } from "react";
import { UsersContext } from "./user-context";

export const AuthContext = createContext({
  token: "",
  userFirebaseId: "",
  userId: -1,
  isAuthenticated: false,
  authenticate: (token: string, firebaseId: string, userId: number) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");
  const [userFirebaseId, setUserFirebaseId] = useState("");
  const [userId, setUserId] = useState(-1);

  function authenticate(token: string, firebaseId: string, userId: number) {
    setAuthToken(token);
    setUserFirebaseId(firebaseId);
    setUserId(userId);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken("");
    setUserFirebaseId("");
    setUserId(-1);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    userFirebaseId: userFirebaseId,
    userId: userId,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
