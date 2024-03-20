import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AlertX from "./Alert";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeAuthStackNavigator } from "../navigator/HomeAuthStackNavigator";
function SurfaceX() {

  const navigtor =
    useNavigation<NativeStackNavigationProp<HomeAuthStackNavigator>>();
  return (
    <>
      <Button
        style={styles.surface}
        icon="card-plus-outline"
        onPress={() => {
          navigtor.push("PostNotes");
        }}
        mode="contained"
      >
        <></>
      </Button>

      <AlertX />
    </>
  );
}

export default SurfaceX;

const styles = StyleSheet.create({
  surface: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
