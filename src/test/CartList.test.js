import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import { ProductContext } from "../context/ProductContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartList from "../screens/CartList";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
}));

describe("CartList", () => {
  const setCartItems = jest.fn();

  const renderWithContext = (cartItems) => {
    return render(
      <ProductContext.Provider value={{ cartitems: cartItems, setCartItems }}>
        <CartList />
      </ProductContext.Provider>
    );
  };

  it("should increase quantity correctly", () => {
    const cartItems = [{ id: "1", name: "Test Item", price: 10, quantity: 1 }];

    const { getByTestId } = renderWithContext(cartItems);

    fireEvent.press(getByTestId("increaseButton"));

    expect(setCartItems).toHaveBeenCalledWith([{ id: "1", name: "Test Item", price: 10, quantity: 2 }]);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it("should decrease quantity correctly", () => {
    const cartItems = [{ id: "1", name: "Test Item", price: 10, quantity: 2 }];

    const { getByTestId } = renderWithContext(cartItems);

    fireEvent.press(getByTestId("decreaseButton"));

    expect(setCartItems).toHaveBeenCalledWith([{ id: "1", name: "Test Item", price: 10, quantity: 1 }]);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});
