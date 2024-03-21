import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import React, { useRef } from "react";
import Constants from "./Constants";

export default function App() {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);
  return (
    <View style={styles.container}>
    <View style={styles.canvas}>
      <GameEngine
              ref={engine}
              style={{
                width: BoardSize,
                height: BoardSize,
                flex: null,
                backgroundColor: "#EFE6E8",
                borderRadius: 20,
                borderWidth: 5,
                borderColor: "black",
                borderStyle: "solid"
              }}
            />
    </View>
  </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C243B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  canvas: {
    flex: 1,
    backgroundColor: "#ECA400",
    alignItems: "center",
    justifyContent: "start",
    padding: 50,
    borderRadius: 20,
    borderWidth: 10,
    borderColor: "black",
    borderStyle: "solid",
  }

});
