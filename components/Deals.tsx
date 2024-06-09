import { View, Text, Pressable, StyleSheet } from "react-native";
import HorizontalView from "./HorizontalView";
import { Items } from "../data/dummy-data";
export default function Deals() {
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
        <HorizontalView items={Items} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
