import { useContext, useState } from "react";
import { Alert } from "react-native";

import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/LoadingOverlay";
import SignupForm from "../../components/Auth/SignupForm";
import ValidateContent from "../../components/Auth/ValidateContent";
import { UsersContext } from "../../store/user-context";
import { firebaseServices } from "../../util/firebaseSDK";

export default function SignUp({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const UserCtx = useContext(UsersContext);

  const authCtx = useContext(AuthContext);

  async function signUpHandler({
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
      const res = await firebaseServices.signUp(email, password, userName, "");
      // add function to add user to user context and sqllite

      authCtx.authenticate(res.id);
      setIsAuthenticating(false);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      console.log(error);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <ValidateContent isLogin={false} onAuthenticate={signUpHandler} />;
}
