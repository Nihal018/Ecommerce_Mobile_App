import { View, Text, StyleSheet } from "react-native";
import Deals from "../../components/Deals";
import { Item } from "../../models/Item";
import CardList from "../../components/CardList";

export default function All({ navigation }) {
  const pressHandler = (itemId: number) => {
    navigation.navigate("BrowseOverview", {
      screen: "ItemDetails",
      params: { itemId: itemId },
    });
  };

  return (
    <View className="bg-white h-full w-full">
      <Deals pressHandler={pressHandler} />
      <View className="mx-5 mt-4">
        <Text className="text-xl">Recommended for you</Text>
      </View>
      <CardList numColumns={2} pressHandler={pressHandler} />
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
