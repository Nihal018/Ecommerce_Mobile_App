import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Item } from "../models/Item";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { CartContext } from "../store/cart-context";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { ItemsContext } from "../store/item-context";
import CartMenu from "../components/CartMenu";

function cartItemCard(
  item: Item,
  goToDetails: (itemId: number) => void,
  onRemove: (itemId: number) => void
) {
  const [menuVisible, setMenuVisible] = useState(false);

  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((oldcount) => oldcount + 1);
  };
  const decrementHandler = () => {
    setCount((oldcount) => oldcount + 1);
  };

  return (
    <View className="flex-row justify-between align-middle">
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
          onPress={() => {}}
          style={({ pressed }) => [styles.dots, pressed && styles.pressed]}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={28}
            color="black"
          />
        </Pressable>
        {/* <View className="">
          <CartMenu
            visible={menuVisible}
            onClose={() => setMenuVisible(false)}
            onRemove={onRemove}
            itemId={item.id}
          />
        </View> */}

        <View className="flex-row justify-evenly align-middle ml-12">
          <Pressable
            onPress={decrementHandler}
            style={({ pressed }) => [styles.minus, pressed && styles.pressed]}
          >
            <FontAwesome6 name="minus" size={12} color="black" />
          </Pressable>

          <Text className="mx-2 mt-1">{count}</Text>
          <Pressable
            onPress={incrementHandler}
            style={({ pressed }) => [styles.plus, pressed && styles.pressed]}
          >
            <Feather name="plus" size={10} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function Cart({ navigation }) {
  const cartCtx = useContext(CartContext);
  const ItemCtx = useContext(ItemsContext);

  const AuthCtx = useContext(AuthContext);

  const [items, setItems] = useState([] as Item[]);

  useEffect(() => {
    const cartItems = cartCtx.cartItems.filter(
      (item) => item.userId === AuthCtx.userId
    );

    let itemsList = [] as Item[];

    if (cartItems.length > 0) {
      for (let cartItem of cartItems) {
        const item = ItemCtx.items.find((item) => item.id === cartItem.itemId);
        if (item) itemsList.push(item);
      }
    }

    setItems(itemsList);
  }, [cartCtx, ItemCtx]);

  const goToDetails = (itemId: number) => {
    navigation.navigate("BrowseOverview", {
      screen: "ItemDetails",
      params: { itemId: itemId },
      initial: false,
    });
  };

  const onRemove = (itemId: number) => {
    cartCtx.deleteCartItem({ userId: AuthCtx.userId, itemId: itemId });
  };

  return (
    <View className="bg-white w-full h-full">
      <View className="">
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => cartItemCard(item, goToDetails, onRemove)}
          initialNumToRender={10}
        />
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
    height: 65,
    width: 65,
  },
  plus: {
    borderColor: "black",
    backgroundColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  dots: {
    marginLeft: 97,
    marginBottom: 5,
  },
  minus: {
    borderColor: "rgb(229, 231, 235)",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
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
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 50,
    paddingRight: 5,
    marginBottom: 25,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuContainer: {
    alignSelf: "flex-end",
    marginTop: 200,
    width: 120,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  menuItem: {
    paddingVertical: 5,
  },
  menuText: {
    fontSize: 15,
  },
});
