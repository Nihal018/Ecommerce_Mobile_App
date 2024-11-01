import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

export default function CartMenu({
  onClose,
  onRemove,
}: {
  onClose: () => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={onRemove}>
        <Text style={styles.menuText}>Remove</Text>
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 40, // Adjust as necessary to position below the dots
    right: 0,
    marginRight: 8,
    width: 100,
    height: 55,
    backgroundColor: "white",
    paddingVertical: 4,
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
  },
});
