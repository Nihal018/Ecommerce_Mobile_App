import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Item } from "../models/Item";
import { useNavigation } from "@react-navigation/native";

export default function Card({
  item,
  pressHandler,
}: {
  item: Item;
  pressHandler: (itemId: number) => void;
}) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => pressHandler(item.id)}
      style={({ pressed }) => [styles.itemContainer, pressed && styles.pressed]}
    >
      <View className="mb-3" style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `data:image/jpeg;base64,${item.imageUri}`,
          }}
          resizeMode="contain"
        />
      </View>
      <View className="text-left ml-2">
        <Text className="font-bold text-md text-red-600">${item.cost}</Text>
        <Text className="font-semibold text-md">{item.name}</Text>
        <Text className="text-sm" numberOfLines={1} ellipsizeMode="tail">
          {item.description}
        </Text>
      </View>
    </Pressable>
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
