import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Item } from "../../models/Item";
import { AuthContext } from "../../store/auth-context";
import { ItemsContext } from "../../store/item-context";
import CustomMenu from "../../components/CustomMenu";
import { useNavigation } from "@react-navigation/native";

function ProductCard({
  item,
  deleteHandler,
  goToDetails,
}: {
  item: Item;
  deleteHandler: (itemId: number) => void;
  goToDetails: (itemId: number) => void;
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const onClose = () => {
    setMenuVisible(false);
  };

  const onEditClick = () => {
    setMenuVisible(false);
    navigation.navigate("EditProduct", { itemId: item.id });
  };
  return (
    <View className="flex-1 flex-row justify-between align-middle">
      <Pressable
        onPress={() => goToDetails(item.id)}
        style={({ pressed }) => [
          styles.itemContainer,
          pressed && styles.pressed,
        ]}
      >
        <View className="ml-3" style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `data:image/jpeg;base64,${item.imageUri}`,
            }}
            resizeMode="contain"
          />
        </View>
        <View className="ml-4 w-40 ">
          <Text className="text-left font-bold text-md text-red-600">
            ${item.cost}
          </Text>
          <Text className="text-left font-semibold text-md">{item.name}</Text>
          <Text
            className="text-left text-sm"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
        </View>
      </Pressable>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            deleteHandler(item.id);
          }}
          style={({ pressed }) => [styles.addToCart, pressed && styles.pressed]}
        >
          <AntDesign name="delete" size={24} color="crimson" />
        </Pressable>

        <View className="flex-col" style={{ position: "relative" }}>
          <Pressable
            onPress={() => setMenuVisible(true)}
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={28}
              color="black"
            />
          </Pressable>

          {menuVisible && (
            <CustomMenu
              visible={menuVisible}
              onClose={onClose}
              onEdit={onEditClick}
            />
          )}
        </View>
      </View>
    </View>
  );
}

//{cur_userId}:{cur_userId:number}  should be sent to this screen by Profile screen
export default function MyProducts({ navigation, route }) {
  const itemCtx = useContext(ItemsContext);
  const userId = route.params.userId;

  const [products, setProducts] = useState([] as Item[]);

  useEffect(() => {
    const items = itemCtx.items.filter((item: Item) => {
      return item.vendorId === userId;
    });

    setProducts(items);
  }, [itemCtx.items, userId]);

  const goToDetails = (itemId: number) => {
    navigation.navigate("BrowseOverview", {
      screen: "ItemDetails",
      params: { itemId: itemId },
      initial: false,
    });
  };

  const goToAddProduct = () => {
    navigation.navigate("AddProduct", { userId: userId });
  };
  const deleteHandler = (itemId: number) => {
    itemCtx.deleteItem(itemId);
  };

  return (
    <View className="bg-white w-full h-full">
      <View style={{ height: 520 }}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              deleteHandler={deleteHandler}
              goToDetails={goToDetails}
            />
          )}
          initialNumToRender={10}
        />
      </View>
      <View className="flex-row justify-center">
        <Pressable
          style={({ pressed }) => [pressed && styles.pressed, styles.login]}
          onPress={() => {
            goToAddProduct();
          }}
          android_ripple={{ color: "rgba(250,250,250,0.8)" }}
        >
          <Text className="text-white font-bold text-center">Add Items</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  login: {
    backgroundColor: "rgb(96, 165, 250)",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 25,
    marginBottom: 10,
    width: 200,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 65,
    width: 65,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    borderColor: "rgb(229, 231, 235)",
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  addToCart: {
    padding: 6,
    borderRadius: 14,
    backgroundColor: "rgb(243, 244, 246 )",
    marginRight: 8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 50,
    paddingRight: 5,
  },

  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  pressed: {
    opacity: 0.5,
  },
});
