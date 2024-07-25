import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppView from "../components/high-level/AppView";

const Profile = () => {
  return (
    <AppView text="Profile">
      <View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.info}>Batuhan Görkem</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>batuhangorkem_8@hotmail.com</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.info}>534 366 14 87</Text>
        </View>
      </View>
    </AppView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
  info: {
    fontSize: 16,
  },
});

export default Profile;
