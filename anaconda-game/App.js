import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import React, { useRef } from "react";
import Constants from "./Constants";
import Head from "./components/Head";
import Food from "./components/Food";
import Tail from "./components/Tail";

export default function App() {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);
  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };


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
                entities={{
                  head: {
                    position: [0, 0],
                    borderRadius: 20,
                    size: Constants.CELL_SIZE,
                    updateFrequency: 10,
                    nextMove: 10,
                    xspeed: 1,
                    yspeed: 1,
                    renderer: <Head />,
                  },
                  food: {
                    position: [
                      randomPositions(0, Constants.GRID_SIZE - 1),
                      randomPositions(0, Constants.GRID_SIZE - 1),
                    ],
                    size: Constants.CELL_SIZE,
                    renderer: <Food />,
                  },
                  tail: {
                    size: Constants.CELL_SIZE,
                    elements: [],
                    renderer: <Tail />,
                  },
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
