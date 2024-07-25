import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/common";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AppView = ({ children, text, customHeader }) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const paddingTop = top > 0 ? top + 10 : 30;
  return (
    <View style={[styles.container, { paddingTop }]}>
      {!customHeader && (
        <View style={styles.header}>
          <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={32} color="black" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{text}</Text>
          </View>
        </View>
      )}

      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp(4),
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
  },
  arrow: {
    position: "absolute",
    left: 0,
    top: 17,
  },
  title: {
    fontSize: hp(3.5),
    fontWeight: "600",
  },
});
export default AppView;
