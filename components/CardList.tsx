import { View, Text, StyleSheet, FlatList } from "react-native";
import { Items } from "../data/dummy-data";
import Card from "./Card";

export default function CardList({
  numColumns,
  pressHandler,
}: {
  numColumns: number;
  pressHandler: (itemId: number) => void;
}) {
  return (
    <View className="flex-1 align-middle mx-2 mt-2">
      <FlatList
        data={Items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card pressHandler={pressHandler} item={item} />
        )}
        numColumns={numColumns}
        initialNumToRender={10}
      />
    </View>
  );
}
