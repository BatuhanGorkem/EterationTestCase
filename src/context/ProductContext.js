import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // Sepet ve favoriler için durumları tanımlıyoruz
  const [cartitems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Sepet verilerini AsyncStorage'dan yüklemek için useEffect kullanıyoruz
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        // AsyncStorage'dan sepet verilerini alıyoruz
        const storedCartItems = await AsyncStorage.getItem("cartItems");
        if (storedCartItems !== null) {
          // Verileri parse edip state'e set ediyoruz
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        // Hata durumunda hata mesajını konsola yazdırıyoruz
        console.error("Error loading cart items:", error);
      }
    };

    loadCartItems(); // Fonksiyonu çağırıyoruz
  }, []); // Boş bağımlılık dizisi ile sadece component mount edildiğinde çalışır

  // Favori verilerini AsyncStorage'dan yüklemek için useEffect kullanıyoruz
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // AsyncStorage'dan favori verilerini alıyoruz
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites !== null) {
          // Verileri parse edip state'e set ediyoruz
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        // Hata durumunda hata mesajını konsola yazdırıyoruz
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites(); // Fonksiyonu çağırıyoruz
  }, []); // Boş bağımlılık dizisi ile sadece component mount edildiğinde çalışır

  // Provider ile context değerlerini sağlıyoruz
  return (
    <ProductContext.Provider
      value={{
        cartitems,
        setCartItems,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
