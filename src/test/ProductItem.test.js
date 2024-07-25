import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProductItem from "../components/low-level/ProductItem";
import { ProductContext } from "../context/ProductContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

const Stack = createNativeStackNavigator();

describe("ProductItem Component", () => {
  const item = {
    id: "1",
    name: "Sample Product",
    price: "29.99",
    image: "http://example.com/image.jpg",
  };

  const mockSetCartItems = jest.fn();
  const mockSetFavorites = jest.fn();

  const renderWithContextAndNavigation = (contextValue) => {
    return render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ProductList">
            {() => (
              <ProductContext.Provider value={contextValue}>
                <ProductItem item={item} />
              </ProductContext.Provider>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  it("adds item to cart and saves to AsyncStorage", async () => {
    const contextValue = {
      cartitems: [],
      setCartItems: mockSetCartItems,
      favorites: [],
      setFavorites: mockSetFavorites,
    };

    const { getByTestId } = renderWithContextAndNavigation(contextValue);

    fireEvent.press(getByTestId("addToCartButton"));

    expect(mockSetCartItems).toHaveBeenCalledWith([item]);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("cartItems", JSON.stringify([item]));
    });
  });

  it("adds item to favorites and saves to AsyncStorage", async () => {
    const contextValue = {
      cartitems: [],
      setCartItems: mockSetCartItems,
      favorites: [],
      setFavorites: mockSetFavorites,
    };

    const { getByTestId } = renderWithContextAndNavigation(contextValue);

    fireEvent.press(getByTestId("favoriteButton"));

    expect(mockSetFavorites).toHaveBeenCalledWith([item]);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("favorites", JSON.stringify([item]));
    });
  });

  it("removes item from favorites and updates AsyncStorage", async () => {
    const contextValue = {
      cartitems: [],
      setCartItems: mockSetCartItems,
      favorites: [item],
      setFavorites: mockSetFavorites,
    };

    const { getByTestId } = renderWithContextAndNavigation(contextValue);

    fireEvent.press(getByTestId("favoriteButton"));

    expect(mockSetFavorites).toHaveBeenCalledWith([]);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("favorites", JSON.stringify([]));
    });
  });
});
