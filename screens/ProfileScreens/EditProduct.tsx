import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { ItemsContext } from "../../store/item-context";
import { UsersContext } from "../../store/user-context";
import { AuthContext } from "../../store/auth-context";

async function convertImageToBase64(uri: string) {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return base64;
}

// function getImage(callback) {
//   db.transaction((tx) => {
//     tx.executeSql("SELECT * FROM images;", [], (_, { rows }) => {
//       if (rows.length > 0) {
//         const base64String = rows.item(0).image;
//         callback(base64String);
//       }
//     });
//   });
// }

export default function EditProduct({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const itemId = route.params.itemId;
  const itemsCtx = useContext(ItemsContext);

  const userId = authCtx.userId;
  const product = itemsCtx.items.find((item) => item.id === itemId);

  if (!product) {
    return;
  }

  const [cred, setCred] = useState({
    name: product.name,
    cost: product.cost,
    imageUri: product.imageUri,
    description: product.description,
    category: product.category,
    vendorId: userId,
  });
  const [selectedImage, setSelectedImage] = useState("");
  const ItemCtx = useContext(ItemsContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64String = await convertImageToBase64(result.assets[0].uri);
      setCred({ ...cred, imageUri: base64String });
    }
  };

  // const loadImage = () => {
  //   getImage((base64String: string) => {
  //     const uri = `data:image/jpeg;base64,${base64String}`;
  //     setSelectedImage(uri);
  //   });
  // };

  const updateProduct = () => {
    ItemCtx.updateItem({ ...cred, id: itemId });
    navigation.goBack();
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
            <Pressable
              style={({ pressed }) => [pressed && styles.pressed, styles.login]}
              onPress={() => {
                pickImage();
              }}
            >
              <Text className="text-white font-bold text-center">
                Edit Image
              </Text>
            </Pressable>

            <Text style={{}}>Name:</Text>
            <TextInput
              value={cred.name}
              onChangeText={(input) =>
                setCred({
                  ...cred,
                  name: input,
                })
              }
              placeholder={product.name}
              style={[styles.inputContainer]}
            />

            <Text>Cost:</Text>
            <TextInput
              value={cred.cost ? cred.cost.toString() : ""}
              onChangeText={(input) =>
                setCred({
                  ...cred,
                  cost: parseInt(input, 10),
                })
              }
              placeholder={product.cost.toString()}
              style={[styles.inputContainer]}
              keyboardType="numeric"
            />

            <Text style={{}}>Description:</Text>
            <TextInput
              value={cred.description}
              onChangeText={(input) =>
                setCred({
                  ...cred,
                  description: input,
                })
              }
              placeholder={product.description}
              style={[styles.inputContainer]}
            />

            <Text>Category:</Text>
            <TextInput
              value={cred.category}
              onChangeText={(input) =>
                setCred({
                  ...cred,
                  category: input,
                })
              }
              placeholder={product.category}
              style={[styles.inputContainer]}
            />

            <Pressable
              style={({ pressed }) => [pressed && styles.pressed, styles.login]}
              onPress={() => {
                updateProduct();
              }}
            >
              <Text className="text-white font-bold text-center"> Update </Text>
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
