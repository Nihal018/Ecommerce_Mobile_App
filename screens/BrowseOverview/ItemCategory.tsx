import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Item } from "../../models/Item";
import { useEffect } from "react";
import CardList from "../../components/CardList";

export default function ItemCategory({ navigation, route }) {
  const category: string = route.params.category;

  useEffect(() => {
    navigation.setOptions({
      title: category,
    });
  }, []);

  const pressHandler = (itemId: number) => {
    navigation.navigate("ItemDetails", { itemId: itemId });
  };

  return (
    <View className="bg-white w-full h-full">
      <CardList pressHandler={pressHandler} numColumns={2} />
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
    opacity: 0.5,
  },
});
