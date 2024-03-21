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
        <StatusBar style="auto" />
        <GameEngine
                ref={engine}
                style={{
                  width: BoardSize,
                  height: BoardSize,
                  flex: null,
                  backgroundColor: "black",
                }}
              />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  canvas: {
    flex: 1,
    height: 600,
    width: 400,
    backgroundColor: "pink",
    borderStyle: 'slashed',
    borderWidth: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "start",
    padding: 50,
  }
});
