import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ItemsContext } from "../../store/item-context";
import { useSQLiteContext } from "expo-sqlite";
import SearchBar from "../../components/SearchBar";
import { Item } from "../../models/Item";
import CardList from "../../components/CardList";
import { AuthContext } from "../../store/auth-context";
import Card from "../../components/Card";

type Cat = {
  category: string;
};

function renderListItem(cat: Cat, pressHandler: (category: string) => void) {
  return (
    <View className="flex-1 h-12 mx-6  " style={styles.listItemContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && styles.pressed,
        ]}
        onPress={() => {
          pressHandler(cat.category);
        }}
        android_ripple={{ color: "rgba(255, 255, 255, 1.6)" }}
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

export default function Browse({ navigation }) {
  const [categories, setCategories] = useState([] as Cat[]);
  const [filteredItems, setFilteredItems] = useState([] as Item[]);
  const [displayCats, setDisplayCats] = useState(true);
  const itemCtx = useContext(ItemsContext);
  const authCtx = useContext(AuthContext);

  const items = itemCtx.items;

  const db = useSQLiteContext();

  useEffect(() => {
    async function fetchCats() {
      const allCategs = await db.getAllAsync<Cat>(
        "SELECT category FROM Items GROUP BY category"
      );
      setCategories(allCategs);
    }

    fetchCats();
  }, [db]);

  const goToItemDetails = (itemId: number) => {
    navigation.navigate("ItemDetails", { itemId: itemId });
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.trim().toLowerCase();
    setDisplayCats(lowerCaseQuery.length === 0);

    const results = items.filter(
      (item) =>
        item.name.trim().toLowerCase().includes(lowerCaseQuery) ||
        item.description.trim().toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredItems(results);
    if (filteredItems.length > 0) console.log(filteredItems[0].description);
  };

  const goToItemCategory = (category: string) => {
    navigation.navigate("ItemCategory", { category: category });
  };

  return (
    <View className="bg-white w-full h-full ">
      <SearchBar onSearch={handleSearch} />
      <View className="mt-4">
        {filteredItems.length === 0 || displayCats ? (
          <FlatList
            data={categories}
            keyExtractor={(cat) => cat.category}
            renderItem={({ item }) => renderListItem(item, goToItemCategory)}
          />
        ) : (
          <View className="mr-2 mt-2">
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <Card
                    pressHandler={goToItemDetails}
                    item={item}
                    userId={authCtx.userId}
                  />
                );
              }}
              numColumns={2}
              initialNumToRender={10}
            />
          </View>
        )}
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
