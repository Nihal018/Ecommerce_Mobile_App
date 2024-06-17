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

export default function cartMenu({
  onClose,
  onRemove,
  visible,
}: {
  onClose: () => void;
  visible: boolean;
  onRemove: (itemId: number) => void;
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={onRemove}>
            <Text style={styles.menuText}>Remove from Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={onClose}>
            <Text style={styles.menuText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuContainer: {
    alignSelf: "flex-end",
    marginTop: 200,
    width: 120,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  menuItem: {
    paddingVertical: 5,
  },
  menuText: {
    fontSize: 15,
  },
});
