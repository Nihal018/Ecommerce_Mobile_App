import { View, Text, StyleSheet, FlatList } from "react-native";
import { Items } from "../data/dummy-data";
import Card from "./Card";

export default function CardList() {
  return (
    <View className="flex-1 ">
      <FlatList
        data={Items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card item={item} />}
        numColumns={2}
        initialNumToRender={8}
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
