import { useContext, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { createUser, login } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/LoadingOverlay";
import SignupForm from "../../components/Auth/SignupForm";
import ValidateContent from "../../components/Auth/ValidateContent";

export default function Login({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({
    email,
    password,
    userName,
  }: {
    email: string;
    password: string;
    userName: string;
  }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <ValidateContent isLogin={true} onAuthenticate={loginHandler} />;
}
