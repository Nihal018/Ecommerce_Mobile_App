import { View, Text, FlatList } from "react-native";
import { Items } from "../../data/dummy-data";

function productCard(item: Item) {
  return (
    <View className="flex-1 flex-row justify-between align-middle">
      <Pressable
        style={({ pressed }) => [
          styles.itemContainer,
          pressed && styles.pressed,
        ]}
      >
        <View className="ml-3" style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
            resizeMode="contain"
          />
        </View>
        <View className="ml-4 w-40 ">
          <Text className="text-left font-bold text-md text-red-600">
            ${item.cost}
          </Text>
          <Text className="text-left font-semibold text-md">{item.name}</Text>
          <Text
            className="text-left text-sm"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
        </View>
      </Pressable>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            DeleteHandler();
          }}
          style={({ pressed }) => [styles.addToCart, pressed && styles.pressed]}
        >
          <AntDesign name="shoppingcart" size={26} color={"black"} />
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={28}
            color="black"
          />
        </Pressable>
      </View>
    </View>
  );
}

export default function MyProducts({ navigation }) {
  return (
    <View className="bg-white w-full h-full">
      <View className="">
        <FlatList
          data={Items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => productCard(item)}
          initialNumToRender={10}
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
  image: {
    height: 65,
    width: 65,
  },
  imageContainer: {
    borderColor: "rgb(229, 231, 235)",
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  addToCart: {
    padding: 6,
    borderRadius: 14,
    backgroundColor: "rgb(243, 244, 246 )",
    marginRight: 8,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 50,
    paddingRight: 5,
  },

  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  pressed: {
    opacity: 0.5,
  },
});
