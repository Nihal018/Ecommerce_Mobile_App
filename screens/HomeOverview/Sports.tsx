import { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import CardList from "../../components/CardList";
import { AuthContext } from "../../store/auth-context";
import { ItemsContext } from "../../store/item-context";

export default function Sports({ navigation }) {
  const category = "Sports";
  const ItemsCtx = useContext(ItemsContext);
  const catItems = ItemsCtx.items.filter((item) => item.category === category);
  const authCtx = useContext(AuthContext);

  const pressHandler = (itemId: number) => {
    navigation.navigate("ItemDetails", { itemId: itemId });
  };

  return (
    <View className="bg-white w-full h-full">
      <CardList
        pressHandler={pressHandler}
        numColumns={2}
        items={catItems}
        userId={authCtx.userId}
      />
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
