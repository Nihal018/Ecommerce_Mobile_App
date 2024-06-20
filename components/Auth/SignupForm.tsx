import { useContext, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { createUser } from "../../util/auth";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";

export default function SignupForm({
  onSubmit,
  credentialsInvalid,
}: {
  onSubmit: (credentials: {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    confirmEmail: string;
  }) => void;
  credentialsInvalid: {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    confirmEmail: boolean;
  };
}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const navigation = useNavigation();

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEmail(enteredValue);
        break;
      case "confirmEmail":
        setConfirmEmail(enteredValue);
        break;
      case "password":
        setPassword(enteredValue);
        break;
      case "confirmPassword":
        setConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    const cred = {
      userName: userName,
      email: email,
      confirmEmail: confirmEmail,
      password: password,
      confirmPassword: confirmPassword,
    };
    onSubmit(cred);
  }

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View className="bg-white w-full h-full" style={styles.container}>
          <View
            className="border-2 border-black py-4 px-6 rounded-xl mt-10"
            style={styles.keyBoardContainer}
          >
            <Text>Username:</Text>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter Username"
              style={[styles.inputContainer]}
            />

            <Text style={[emailIsInvalid && styles.labelInvalid]}>
              Email Address:
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email"
              style={[
                styles.inputContainer,
                emailIsInvalid && styles.inputInvalid,
              ]}
            />

            <Text style={[emailsDontMatch && styles.labelInvalid]}>
              Confirm Email Address:
            </Text>
            <TextInput
              value={confirmEmail}
              onChangeText={setConfirmEmail}
              placeholder="Confirm Email"
              style={[
                styles.inputContainer,
                emailsDontMatch && styles.inputInvalid,
              ]}
            />
            <Text style={[passwordIsInvalid && styles.labelInvalid]}>
              Password:
            </Text>
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              placeholder="Enter Password"
              style={[
                styles.inputContainer,
                passwordIsInvalid && styles.inputInvalid,
              ]}
            />
            <Text style={[passwordsDontMatch && styles.labelInvalid]}>
              Confirm Password:
            </Text>
            <TextInput
              value={confirmPassword}
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              style={[
                styles.inputContainer,
                passwordsDontMatch && styles.inputInvalid,
              ]}
            />

            <Pressable
              style={({ pressed }) => [pressed && styles.pressed, styles.login]}
              onPress={submitHandler}
            >
              <Text className="text-white font-bold text-center">Sign Up</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [pressed && styles.pressed]}
              onPress={goToLogin}
            >
              <Text className="text-blue-300 text-center ">Log in instead</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  keyBoardContainer: {
    height: 500,
    width: 300,
  },
  image: {
    height: 120,
    width: 120,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
  labelInvalid: {
    color: Colors.error400,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inputContainer: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginBottom: 14,
    marginTop: 6,
  },

  login: {
    backgroundColor: "rgb(96, 165, 250)",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
