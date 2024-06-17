import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  PanResponder,
} from "react-native";
import { Item } from "../models/Item";
import { Colors } from "../constants/colors";
import { useState } from "react";

const { width } = Dimensions.get("window");

function renderListItem(item: Item, pressHandler: (itemId: number) => void) {
  return (
    <View style={{ width: width, height: 160 }} className="">
      <Pressable
        style={({ pressed }) => [
          styles.itemContainer,
          pressed && styles.pressed,
        ]}
        onPress={() => {
          pressHandler(item.id);
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `data:image/jpeg;base64,${item.imageUri}`,
            }}
            resizeMode="contain"
          />
        </View>
        <View className="mb-6 mx-4 w-44 pr-3 ">
          <Text className="font-bold text-lg">{item.category}</Text>
          <Text className="text-red-600 text-lg"> ${item.cost}</Text>
          <Text className="text-md font-semibold " numberOfLines={1}>
            {item.description}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default function HorizontalView({
  items,
  pressHandler,
}: {
  items: Item[];
  pressHandler: (itemId: number) => void;
}) {
  return (
    <View className="">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderListItem(item, pressHandler)}
        horizontal={true}
        pagingEnabled={true}
        initialNumToRender={5}
        showsHorizontalScrollIndicator={true}
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
    marginTop: 10,
  },
  imageContainer: {
    marginBottom: 20,
  },
  pressed: {
    opacity: 0.5,
  },
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(229, 231, 235)",
    paddingHorizontal: 20,
  },
});
