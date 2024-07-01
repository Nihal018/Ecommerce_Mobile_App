import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

export default function CustomMenu({
  visible,
  onClose,
  onEdit,
}: {
  onClose: () => void;
  onEdit: () => void;
  visible: boolean;
}) {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
        <Text style={styles.menuText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => onClose()}>
        <Text style={styles.menuText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    justifyContent: "center",
    marginTop: 0,
    width: 105,
    top: 35, // Adjust as necessary to position below the dots
    right: 0,
    height: 60,
    marginRight: 5,
    backgroundColor: "white",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 100,
  },
  menuItem: {
    paddingVertical: 2,
    justifyContent: "center",
  },
  menuText: {
    fontSize: 15,
  },
});
