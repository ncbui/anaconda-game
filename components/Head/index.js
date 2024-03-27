import React from "react";
import { View } from "react-native";
export default function Head({ position, size }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "#54457f",
        borderRadius: 10,
        position: "absolute",
        left: position[0] * size,
        top: position[1] * size,
      }}
    ></View>
  );
} 
