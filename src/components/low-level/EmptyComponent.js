import { View, Text, Image } from "react-native";
import React from "react";

const EmptyComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={{ width: 263, height: 263 }} source={require("../../../assets/gif/empty-list.gif")} />
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", textAlign: "center" }}>There is nothing to show here.{"\n"}Please try again later.</Text>
    </View>
  );
};

export default EmptyComponent;
