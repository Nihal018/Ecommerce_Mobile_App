import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Item } from "../models/Item";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { User } from "../models/User";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { FavouriteItem } from "../models/FavouriteItem";
import { FavouriteContext } from "../store/favourite-context";
import { CartContext } from "../store/cart-context";

export default function Card({
  item,
  pressHandler,
  userId,
}: {
  item: Item;
  pressHandler: (itemId: number) => void;
  userId: number;
}) {
  const FavouriteCtx = useContext(FavouriteContext);
  let favIndex = FavouriteCtx.favouriteItems.findIndex(
    (favItem) => favItem.userId === userId && favItem.itemId === item.id
  );
  const [favItem, setFavItem] = useState(favIndex >= 0 ? true : false);

  useEffect(() => {
    favIndex = FavouriteCtx.favouriteItems.findIndex(
      (favItem) => favItem.userId === userId && favItem.itemId === item.id
    );

    setFavItem(favIndex >= 0 ? true : false);
  }, [FavouriteCtx]);

  const addToFavorites = () => {
    if (userId === -1) {
      return;
    }

    if (!favItem) {
      FavouriteCtx.addFavouriteItem({ userId: userId, itemId: item.id });
    } else {
      favIndex = FavouriteCtx.favouriteItems.findIndex(
        (favItem) => favItem.userId === userId && favItem.itemId === item.id
      );

      if (favIndex === -1) return;

      const deleteFavItem = FavouriteCtx.favouriteItems[favIndex];

      FavouriteCtx.deleteFavouriteItem(deleteFavItem);
    }

    setFavItem(!favItem);
  };

  return (
    <Pressable
      onPress={() => pressHandler(item.id)}
      style={({ pressed }) => [styles.itemContainer, pressed && styles.pressed]}
    >
      <View className="mb-3" style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `data:image/jpeg;base64,${item.imageUri}`,
          }}
          resizeMode="contain"
        />
        <Pressable
          onPress={addToFavorites}
          style={({ pressed }) => [pressed && styles.pressed, styles.heartIcon]}
        >
          <AntDesign
            name={favItem ? "heart" : "hearto"}
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      <View className="text-left ml-2" style={styles.textContainer}>
        <Text className="font-bold text-md text-red-600">${item.cost}</Text>
        <Text className="font-semibold text-md">{item.name}</Text>
        <Text className="text-sm" numberOfLines={1} ellipsizeMode="tail">
          {item.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  image: { marginLeft: 2, height: 100, width: 100 },
  imageContainer: {
    borderColor: "rgb(229, 231, 235)",
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    height: 140,
    width: 150,
  },
  textContainer: {
    width: 150,
  },
  heartIcon: {
    position: "absolute",
    top: 5,
    right: 0,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1,
    marginRight: 2,
    padding: 5,
    backgroundColor: "white",
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
    opacity: 0.5,
  },
});
