import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import { Item } from "../../models/Item";
import { AntDesign } from "@expo/vector-icons";
import { Items } from "../../data/dummy-data";
import { useContext, useState } from "react";
import { ItemsContext } from "../../store/item-context";

export default function ItemDetails({ navigation, route }) {
  const itemId = route.params.itemId;
  const ItemsCtx = useContext(ItemsContext);
  const item = ItemsCtx.items.filter((item) => item.id === itemId)[0];
  const [favItem, setFavItem] = useState(false);

  const heartPressHandler = () => {
    setFavItem(!favItem);
    //logic to store state in database
  };

  const addToCart = () => {
    // logic to add item to cart
  };

  return (
    <View className="bg-white w-full h-full ">
      <View className=" flex-row border-2 border-gray-100 m-4 pb-8">
        <Image
          style={styles.image}
          source={{
            uri: `data:image/jpeg;base64,${item.imageUri}`,
          }}
          resizeMode="contain"
        />

        <View className=" w-24 h-24 mt-52 mr-9">
          <Pressable
            onPress={heartPressHandler}
            style={({ pressed }) => [
              pressed && styles.pressed,
              styles.heartIcon,
            ]}
          >
            <AntDesign
              name={favItem ? "heart" : "hearto"}
              size={28}
              color="black"
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              pressed && styles.pressed,
              { marginLeft: 4 },
            ]}
          >
            <AntDesign name="shoppingcart" size={30} color="black" style={{}} />
          </Pressable>
        </View>
      </View>

      <View className="text-left ml-4 ">
        <Text className="font-extrabold  text-black" style={{ fontSize: 20 }}>
          ${item.cost}
        </Text>
        <Text className="font-semibold text-lg" style={{ fontSize: 18 }}>
          {item.name}
        </Text>
        <Text className="text-md" style={{ fontSize: 16 }}>
          {item.description}
        </Text>
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
    height: 250,
    width: 250,
    marginLeft: 25,
    marginTop: 25,
  },
  imageContainer: {
    borderColor: "rgb(229, 231, 235)",
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  heartIcon: {
    padding: 5,

    marginBottom: 15,
    marginRight: 20,
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
