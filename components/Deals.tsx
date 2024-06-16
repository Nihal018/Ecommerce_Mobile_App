import { View, Text, Pressable, StyleSheet } from "react-native";
import HorizontalView from "./HorizontalView";
import { Item } from "../models/Item";
export default function Deals({
  pressHandler,
  items,
  userId,
}: {
  pressHandler: (itemId: number) => void;
  items: Item[];
  userId: number;
}) {
  return (
    <View>
      <View className="flex-row justify-between align-baseline mx-5 mt-5 ">
        <View>
          <Text className="text-xl">Deals of the day</Text>
        </View>
        <Pressable
          style={({ pressed }) => [pressed && styles.pressed]}
          className=""
        >
          <Text className="text-gray-500 text-md mt-1"> See all</Text>
        </Pressable>
      </View>
      <View className="mt-5">
        <HorizontalView items={items} pressHandler={pressHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
