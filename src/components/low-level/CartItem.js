import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { hp, wp } from "../../helpers/common";

const CartItem = ({ item, onIncrease, onDecrease }) => {
  return (
    <View key={item.id} style={styles.itemContainer}>
      <View style={styles.itemDetailsContainer}>
        <Text numberOfLines={1} style={styles.itemName}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity testID="increaseButton" onPress={() => onDecrease(item)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity testID="decreaseButton" onPress={() => onIncrease(item)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemDetailsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: wp(50),
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemName: {
    fontSize: hp(2.5),
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: hp(2),
    color: "blue",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: wp(10),
    height: wp(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 20,
  },
  quantityButtonText: {
    color: "white",
    fontSize: hp(2.5),
  },
  quantityText: {
    marginHorizontal: wp(2),
    fontSize: hp(2.5),
    width: wp(8),
    textAlign: "center",
  },
});

export default CartItem;
