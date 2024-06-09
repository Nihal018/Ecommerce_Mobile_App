import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

type Cat = {
  category: string;
};

function renderListItem(cat: Cat) {
  return (
    <View
      className="flex-1 h-10 mx-6 my-2 pb-4 "
      style={styles.listItemContainer}
    >
      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && styles.pressed,
        ]}
        onPress={() => {}}
      >
        <View>
          <Text className="font-bold text-lg">{cat.category}</Text>
        </View>
        <View className="mx-4 my-1">
          <AntDesign name="right" size={24} color="black" />
        </View>
      </Pressable>
    </View>
  );
}

export default function Browse() {
  const categories: Cat[] = [
    { category: "Mobile" },
    { category: "Headphones" },
    { category: "Drones" },
  ];
  return (
    <View className="bg-white w-full h-full ">
      <View
        style={styles.textInputContainer}
        className="border-2 border-black bg-gray-100 rounded-xl "
      >
        <TextInput
          className=" flex-1 "
          style={styles.textInput}
          multiline={true}
          placeholder="Search"
        ></TextInput>
      </View>
      <View className="mt-4">
        <FlatList
          data={categories}
          keyExtractor={(cat) => cat.category}
          renderItem={({ item }) => renderListItem(item)}
        />
      </View>
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
  listItemContainer: {
    borderBottomColor: "rgb(229, 231, 235)",
    borderBottomWidth: 2,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  textInputContainer: {
    marginHorizontal: 14,
    marginTop: 50,
    height: 45,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.5,
  },
});
