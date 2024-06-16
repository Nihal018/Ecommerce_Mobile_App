import { View, Text, StyleSheet } from "react-native";
import Deals from "../../components/Deals";
import { Item } from "../../models/Item";
import CardList from "../../components/CardList";
import { useContext } from "react";
import { ItemsContext } from "../../store/item-context";
import { FavouriteContext } from "../../store/favourite-context";
import { CartContext } from "../../store/cart-context";
import { AuthContext } from "../../store/auth-context";
import { UsersContext } from "../../store/user-context";

export default function All({ navigation }) {
  const ItemCtx = useContext(ItemsContext);
  const authCtx = useContext(AuthContext);
  const items = ItemCtx.items;

  const userId = authCtx.userId;

  const pressHandler = (itemId: number) => {
    navigation.navigate("BrowseOverview", {
      screen: "ItemDetails",
      params: { itemId: itemId },
      initial: false,
    });
  };

  return (
    <View className="bg-white h-full w-full">
      <Deals pressHandler={pressHandler} items={items} userId={userId} />
      <View className="mx-5 mt-4">
        <Text className="text-xl">Recommended for you</Text>
      </View>
      <CardList
        numColumns={2}
        pressHandler={pressHandler}
        items={items}
        userId={userId}
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
});
