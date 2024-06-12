import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../../constants/colors";

export default function LoginForm({
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
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  const navigation = useNavigation();

  const LoginHandler = () => {};
  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  function submitHandler() {
    const cred = {
      userName: "",
      email: email,
      confirmEmail: confirmEmail,
      password: password,
      confirmPassword: confirmPassword,
    };
    onSubmit(cred);
  }

  return (
    <View className="bg-white w-full h-full" style={styles.container}>
      <View className="border-2 border-black py-4 px-6 h-64 w-64 rounded-xl mt-16">
        <View>
          <Text style={[emailIsInvalid && styles.labelInvalid]}>
            Email Address:
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            style={[styles.input, emailIsInvalid && styles.inputInvalid]}
          />
          <Text style={[passwordIsInvalid && styles.labelInvalid]}>
            Password:
          </Text>
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            placeholder="Enter Password"
            style={[styles.input, passwordIsInvalid && styles.inputInvalid]}
          />

          <Pressable
            style={({ pressed }) => [pressed && styles.pressed, styles.login]}
            onPress={submitHandler}
          >
            <Text className="text-white font-bold text-center">Log In</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={goToSignUp}
          >
            <Text className="text-blue-300 text-center my-2">
              Create a new user
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    height: 120,
    width: 120,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 4,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
  labelInvalid: {
    color: Colors.error500,
  },

  login: {
    backgroundColor: "rgb(147, 197 ,253)",
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
