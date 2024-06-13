import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/colors";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { UsersContext } from "../../store/user-context";

export default function Profile({ navigation }) {
  const authCtx = useContext(AuthContext);
  const UserCtx = useContext(UsersContext);

  const UserIndex = UserCtx.users.findIndex(
    (user) => user.firebaseId === authCtx.userFirebaseId
  );

  if (UserIndex < 0) return;

  const userId = UserCtx.users[UserIndex].id;

  const logOutHandler = () => {
    authCtx.logout();
  };
  const goToMyProducts = () => {
    navigation.navigate("MyProducts", { userId: userId });
  };
  const goToPastPurchases = () => {
    navigation.navigate("PastPurchases");
  };

  return (
    <View className="bg-white w-full h-full">
      <View className="flex-1 flex-row align-middle mt-5">
        <View className="flex-1 ml-4 mr-2">
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text className=" " style={styles.buttonText}>
              Your Orders
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text className="" style={styles.buttonText}>
              Account Settings
            </Text>
          </Pressable>
        </View>

        <View className="flex-1 mr-4 ml-2">
          <Pressable
            onPress={() => {
              goToPastPurchases();
            }}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text className="" style={styles.buttonText}>
              Past Purchases
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              goToMyProducts();
            }}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text className="" style={styles.buttonText}>
              Your Products
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="mx-auto mb-5">
        <Pressable
          onPress={() => {
            logOutHandler();
          }}
          style={({ pressed }) => [
            styles.logOutButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText} className="text-white">
            Log Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 120,
    width: 120,
  },
  logOutButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgb(239 ,68, 68)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    alignItems: "center",
    width: 130,
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: Colors.gray100,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
  },
  imageContainer: {
    borderColor: "rgb(229, 231, 235)",
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  itemContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.6,
  },
});
