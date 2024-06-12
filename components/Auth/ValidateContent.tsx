import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Colors } from "../../constants/colors";

function ValidateContent({
  isLogin,
  onAuthenticate,
}: {
  isLogin: boolean;
  onAuthenticate: ({
    email,
    password,
    userName,
  }: {
    email: string;
    password: string;
    userName: string;
  }) => Promise<void>;
}) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function submitHandler(credentials: {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    confirmEmail: string;
  }) {
    let { userName, email, confirmEmail, password, confirmPassword } =
      credentials;
    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email: email, password: password, userName: userName });
  }

  return (
    <View className="w-full h-full">
      {isLogin && (
        <LoginForm
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
      )}
      {!isLogin && (
        <SignupForm
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
      )}
    </View>
  );
}

export default ValidateContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
