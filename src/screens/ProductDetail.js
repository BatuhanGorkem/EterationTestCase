import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppView from "../components/high-level/AppView";
import { ProductContext } from "../context/ProductContext";
import { hp } from "../helpers/common";

const ProductDetail = ({ route }) => {
  const product = route.params.product;

  const { cartitems, setCartItems } = useContext(ProductContext);

  const addToCart = (item) => {
    const updatedCart = [...cartitems, item];
    setCartItems(updatedCart);

    try {
      AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error saving to AsyncStorage", error);
    }
  };

  return (
    <AppView text="Product Detail">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.brand}>{product.brand}</Text>

          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.addCart}>
        <View>
          <Text style={styles.price}>${product.price}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            addToCart(product);
          }}
          style={styles.button}
        >
          <Text style={styles.text}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </AppView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 8,
  },
  detailsContainer: {
    marginTop: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  brand: {
    fontSize: 18,
    color: "#666",
    marginVertical: 4,
  },
  price: {
    fontSize: hp(2.5),
    color: "blue",
    fontWeight: "bold",
  },
  model: {
    fontSize: 16,
    color: "#333",
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
    lineHeight: 22,
  },
  addCart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: "white",
    fontWeight: "800",
  },
});

export default ProductDetail;
