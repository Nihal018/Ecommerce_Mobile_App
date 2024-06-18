import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { Item } from "../models/Item";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../store/item-context";
import { FavouriteContext } from "../store/favourite-context";
import { AuthContext } from "../store/auth-context";

function favoriteItemCard(item: Item, goToDetails: (itemId: number) => void) {
  function DeleteHandler() {}

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
          onPress={() => {
            DeleteHandler();
          }}
          style={({ pressed }) => [styles.addToCart, pressed && styles.pressed]}
        >
          <AntDesign name="shoppingcart" size={26} color={"black"} />
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={28}
            color="black"
          />
        </Pressable>
      </View>
    </View>
  );
}

export default function Favourites({ navigation }) {
  const FavCtx = useContext(FavouriteContext);
  const ItemCtx = useContext(ItemsContext);
  const AuthCtx = useContext(AuthContext);
  const [items, setItems] = useState([] as Item[]);

  const goToDetails = (itemId: number) => {
    navigation.navigate("BrowseOverview", {
      screen: "ItemDetails",
      params: { itemId: itemId },
      initial: false,
    });
  };

  useEffect(() => {
    const favItems = FavCtx.favouriteItems.filter(
      (item) => item.userId === AuthCtx.userId
    );

    if (favItems.length > 0) {
      let arr = [] as Item[];

      for (let favItem of favItems) {
        const item = ItemCtx.items.find((item) => item.id === favItem.itemId);
        if (item) arr.push(item);
      }

      setItems(arr);
    }
  }, [FavCtx, ItemCtx]);

  return (
    <View className="bg-white w-full h-full">
      <View className="">
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => favoriteItemCard(item, goToDetails)}
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
