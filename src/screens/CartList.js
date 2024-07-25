import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useMemo } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppView from "../components/high-level/AppView";
import CartItem from "../components/low-level/CartItem"; // Yeni bileşeni import et
import EmptyComponent from "../components/low-level/EmptyComponent";
import { ProductContext } from "../context/ProductContext";
import { hp, wp } from "../helpers/common";

const CartList = () => {
  const { cartitems, setCartItems } = useContext(ProductContext);

  // Sepet ürünlerine rastgele anahtar ekler
  const cartİtemsWithKeys = useMemo(() => {
    return cartitems.map((item, index) => {
      return { ...item, key: (Math.floor(Math.random() * 1000) + 1).toString() };
    });
  }, [cartitems]);

  // Aynı ürünü birden fazla kez eklememek için miktarları toplar
  const updatedCartItems = useMemo(() => {
    const updatedCart = [];
    cartİtemsWithKeys.forEach((item) => {
      const index = updatedCart.findIndex((i) => i.id === item.id);
      if (index === -1) {
        updatedCart.push({ ...item, quantity: 1 });
      } else {
        updatedCart[index].quantity += 1;
      }
    });
    return updatedCart;
  }, [cartitems]);

  // Toplam tutarı hesaplar
  const subTotal = useMemo(() => {
    return updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [updatedCartItems]);

  // Ürün miktarını azaltma işlemi
  const decreaseQuantity = (item) => {
    const updatedCart = cartİtemsWithKeys.filter((i) => i.key !== item.key);

    setCartItems(updatedCart);

    try {
      AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error saving to AsyncStorage", error);
    }
  };

  // Ürün miktarını artırma işlemi
  const increaseQuantity = (item) => {
    const updatedCart = [...cartitems, item];
    setCartItems(updatedCart);

    try {
      AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error saving to AsyncStorage", error);
    }
  };

  // Ürünleri render ederken kullanılan fonksiyon
  const renderItem = ({ item }) => {
    return (
      <CartItem
        item={item}
        onIncrease={increaseQuantity} // Miktarı artırma işlevi
        onDecrease={decreaseQuantity} // Miktarı azaltma işlevi
      />
    );
  };

  return (
    <AppView text="Shopping Cart">
      <FlatList
        ListEmptyComponent={EmptyComponent}
        showsVerticalScrollIndicator={false}
        data={updatedCartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.subMoneyContainer}>
        <View>
          <Text style={styles.subMoneyTextTitle}>Total:</Text>
          <Text style={styles.subMoneyText}> ${subTotal}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </AppView>
  );
};

const styles = StyleSheet.create({
  subMoneyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(2),
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  subMoneyTextTitle: {
    fontSize: hp(2.2),
    color: "#1C56FF",
  },
  subMoneyText: {
    fontSize: hp(2.5),
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#1C56FF",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: 8,
  },
  checkoutText: {
    color: "white",
    fontSize: hp(2.5),
  },
});

export default CartList;
