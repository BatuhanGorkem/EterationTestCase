import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import ProductDetail from "../screens/ProductDetail";
import { ProductProvider, ProductContext } from "../context/ProductContext";
import CartList from "../screens/CartList";
import Favorites from "../screens/Favorites";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="CartList" component={CartList} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
