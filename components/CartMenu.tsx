import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

export default function CartMenu({
  onClose,
  onRemove,
  itemId,
}: {
  onClose: () => void;
  onRemove: (itemId: number) => void;
  itemId: number;
}) {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => onRemove(itemId)}
      >
        <Text style={styles.menuText}>Remove from Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
        <Text style={styles.menuText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 50, // Adjust as necessary to position below the dots
    right: 0,
    marginRight: 8,
    width: 140,
    height: 55,
    backgroundColor: "white",
    paddingVertical: 4,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 100,
  },
  menuItem: {
    paddingVertical: 2,
  },
  menuText: {
    fontSize: 14,
    fontWeight: 600,
  },
});
