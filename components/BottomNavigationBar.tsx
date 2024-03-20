import * as React from "react";
import { View } from "react-native";
import SurfaceX from "./Surface";
export default function BottomNavigationBar() {
  return (
    <View
      style={{
        flexDirection: "column-reverse",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1, marginLeft: 140 }}>
          <SurfaceX />
        </View>
      </View>
    </View>
  );
}
