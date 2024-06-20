import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Item } from "../models/Item";

import { CartContext } from "../store/cart-context";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { ItemsContext } from "../store/item-context";
import CartItemCard from "../components/CartItemCard";

export default function Cart({ navigation }) {
  const cartCtx = useContext(CartContext);
  const ItemCtx = useContext(ItemsContext);

  const AuthCtx = useContext(AuthContext);

  const [items, setItems] = useState([] as Item[]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const cartItems = cartCtx.cartItems.filter(
      (item) => item.userId === AuthCtx.userId
    );

    let itemsList = [] as Item[];

    if (cartItems.length > 0) {
      for (let cartItem of cartItems) {
        const item = ItemCtx.items.find((item) => item.id === cartItem.itemId);
        if (item) {
          itemsList.push(item);
        }
      }
      setItems(itemsList);
    }
  }, [cartCtx, ItemCtx]);

  const goToDetails = (itemId: number) => {
    navigation.navigate("BrowseOverview", {
      screen: "ItemDetails",
      params: { itemId: itemId },
      initial: false,
    });
  };

  function addItemCost(itemCost: number) {
    setTotalCost((oldcost) => oldcost + itemCost);
  }

  function minusItemCost(itemCost: number) {
    setTotalCost((oldcost) => oldcost - itemCost);
  }

  function paymentHandler() {}

  return (
    <View className="bg-white w-full h-full">
      <View style={{ height: "77%" }}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <CartItemCard
                item={item}
                goToDetails={goToDetails}
                addItemCost={addItemCost}
                minusItemCost={minusItemCost}
              />
            );
          }}
          initialNumToRender={10}
        />
      </View>
      <View className="w-full px-4 mt-4">
        <View className="px-2 mb-2">
          <View className="flex-row justify-between mb-1">
            <Text style={{ fontSize: 15 }}>Shipping :</Text>
            <Text style={{ fontSize: 15 }}>$0.00</Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{ fontSize: 16 }} className="font-bold ">
              Total :
            </Text>
            <Text style={{ fontSize: 16 }} className="font-bold ">
              ${totalCost}
            </Text>
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [pressed && styles.pressed, styles.checkout]}
          onPress={paymentHandler}
          android_ripple={{ color: "rgba(255, 255, 255, 1.6)" }}
        >
          <Text className="text-white font-bold text-center">Checkout</Text>
        </Pressable>
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
  plus: {
    borderColor: "black",
    backgroundColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  checkout: {
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",

    marginTop: 5,
    marginBottom: 10,
    height: 50,
  },
  dots: {
    marginLeft: 97,
    marginBottom: 5,
  },
  minus: {
    borderColor: "rgb(229, 231, 235)",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
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
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 50,
    paddingRight: 5,
    marginBottom: 25,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuContainer: {
    alignSelf: "flex-end",
    marginTop: 200,
    width: 110,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  menuItem: {
    paddingVertical: 5,
  },
  text: {
    fontSize: 15,
  },
});
