import { FlashList } from "@shopify/flash-list";
import React, { useContext } from "react";
import AppView from "../components/high-level/AppView";
import EmptyComponent from "../components/low-level/EmptyComponent";
import ProductItem from "../components/low-level/ProductItem";
import { ProductContext } from "../context/ProductContext";

const Favorites = () => {
  const { favorites } = useContext(ProductContext);
  return (
    <AppView text="Favorites">
      <FlashList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyComponent}
        data={favorites}
        numColumns={2}
        renderItem={({ item }) => <ProductItem item={item} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={200}
      />
    </AppView>
  );
};

export default Favorites;
