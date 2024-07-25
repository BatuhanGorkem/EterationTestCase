import { AntDesign, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { Text, View } from "react-native";
import "react-native-gesture-handler";
import { ProductContext, ProductProvider } from "./src/context/ProductContext";
import HomeStack from "./src/navigation";
import CartList from "./src/screens/CartList";
import Favorites from "./src/screens/Favorites";
import Profile from "./src/screens/Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tapBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 66,
    background: "red",
  },
};

const CartIconWithBadge = ({ focused }) => {
  const { cartitems } = useContext(ProductContext);
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <AntDesign name="shoppingcart" size={24} color={focused ? "blue" : "black"} />
      {cartitems?.length > 0 && (
        <View
          style={{
            position: "absolute",
            right: -6,
            top: -3,
            backgroundColor: "red",
            borderRadius: 6,
            width: 14,
            height: 14,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>{cartitems?.length}</Text>
        </View>
      )}
    </View>
  );
};

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="home" size={24} color={focused ? "blue" : "black"} />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="CartList"
            component={CartList}
            options={{
              tabBarIcon: ({ focused }) => <CartIconWithBadge focused={focused} />,
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={Favorites}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="star" size={24} color={focused ? "blue" : "black"} />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name="body-outline" size={24} color={focused ? "blue" : "black"} />
                  </View>
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}
