import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ProductContext } from "../../context/ProductContext";
import { hp, wp } from "../../helpers/common";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ProductItem = ({ item }) => {
  const navigation = useNavigation();
  const { cartitems, setCartItems, favorites, setFavorites } = useContext(ProductContext);
  const handlePress = () => {
    navigation.navigate("ProductDetail", { product: item });
  };
  const addToCart = async (item) => {
    const updatedCart = [...cartitems, item];
    setCartItems(updatedCart);

    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error saving to AsyncStorage", error);
    }
  };

  const addToFavorites = (item) => {
    if (favorites.find((i) => i.id === item.id)) {
      const updatedFavorites = favorites.filter((i) => i.id !== item.id);
      setFavorites(updatedFavorites);
      try {
        AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      } catch (error) {
        console.error("Error saving to AsyncStorage", error);
      }
      return;
    }

    const updatedFavorites = [...favorites, item];
    setFavorites(updatedFavorites);
    try {
      AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error saving to AsyncStorage", error);
    }
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity
        testID="addToCartButton"
        style={styles.button}
        onPress={() => {
          addToCart(item);
        }}
      >
        <Text style={styles.buttonText}>Add To Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="favoriteButton"
        style={{ position: "absolute", top: 10, right: 10 }}
        onPress={() => {
          addToFavorites(item);
        }}
      >
        <MaterialIcons name="favorite" size={28} color={favorites.find((i) => i.id === item.id) ? "#FFB500" : "lightgray"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: wp(1.2),
    padding: wp(2),
    position: "relative",
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "white",
    width: "50%",
  },
  button: {
    backgroundColor: "#1C56FF",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: hp(20),
    borderRadius: 10,
  },
  name: {
    fontSize: hp(2),
    fontWeight: "bold",
    marginVertical: hp(1),
  },
  price: {
    fontSize: hp(1.8),
    color: "gray",
  },
});

export default ProductItem;
