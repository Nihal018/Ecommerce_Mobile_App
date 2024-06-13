import { View, Text, StyleSheet, FlatList } from "react-native";
import Card from "./Card";
import { Item } from "../models/Item";

export default function CardList({
  numColumns,
  pressHandler,
  items,
}: {
  numColumns: number;
  pressHandler: (itemId: number) => void;
  items: Item[];
}) {
  return (
    <View className="flex-1 align-middle mx-2 mt-2">
      <FlatList
        data={items}
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
