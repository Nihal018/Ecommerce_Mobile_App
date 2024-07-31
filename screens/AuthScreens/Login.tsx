import { useContext, useState } from "react";
import { Alert } from "react-native";

import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/LoadingOverlay";

import ValidateContent from "../../components/Auth/ValidateContent";

import { firebaseServices } from "../../util/firebaseSDK";

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
      const res = await firebaseServices.login(email, password);
      authCtx.authenticate(res.id);
      setIsAuthenticating(false);
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
