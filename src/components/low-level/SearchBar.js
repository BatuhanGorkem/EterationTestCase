import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { hp } from "../../helpers/common";

const SearchBar = ({ query, onChangeQuery, onClearQuery }) => {
  return (
    <View style={styles.searchBar}>
      <View style={styles.searchIcon}>
        <Feather name="search" size={24} />
      </View>
      <TextInput style={styles.searchInput} placeholder="Search for photos.." value={query} onChangeText={onChangeQuery} />
      <TouchableOpacity onPress={onClearQuery}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "lightgray",
    padding: 6,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 15,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: hp(1.8),
  },
});

export default SearchBar;
