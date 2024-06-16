import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim().length > 0) {
      onSearch(query);
      console.log(query);
    }
  };

  return (
    <View className="mx-2">
      <View
        style={styles.textInputContainer}
        className="border-2 border-black bg-gray-100 rounded-xl "
      >
        <TextInput
          className=" flex-1 "
          value={query}
          onChangeText={setQuery}
          style={styles.textInput}
          placeholder="Search"
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        ></TextInput>
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
