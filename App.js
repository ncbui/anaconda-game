import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useRef, useState } from "react";
import Constants from "./Constants";
import Head from "./components/Head";
import Food from "./components/Food";
import Tail from "./components/Tail";
import GameLoop from './systems/GameLoop';


export default function App() {
  const [isGameRunning, setIsGameRunning] = useState(true);
  const engine = useRef(null);

  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  
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
                entities={{
                  head: {
                    position: [10, 10],
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
                systems={[GameLoop]}
                running={isGameRunning}
                onEvent={(e) => {
                  switch (e) {
                    case "game-over":
                      alert("Game over!");
                      setIsGameRunning(false);
                      return;
                  }}}
              />
        <View style={styles.controlContainer}>
          <View style={styles.controllerRow}>
            <TouchableOpacity onPress={() => engine.current.dispatch("move-up")}>
              <View style={styles.controlBtn} />
            </TouchableOpacity>
          </View>
          <View style={styles.controllerRow}>
            <TouchableOpacity
              onPress={() => engine.current.dispatch("move-left")}
            >
              <View style={styles.controlBtn} />
            </TouchableOpacity>
            <View style={[styles.controlBtn, { backgroundColor: null }]} />
            <TouchableOpacity
              onPress={() => engine.current.dispatch("move-right")}
            >
              <View style={styles.controlBtn} />
            </TouchableOpacity>
          </View>
          <View style={styles.controllerRow}>
            <TouchableOpacity
              onPress={() => engine.current.dispatch("move-down")}
            >
              <View style={styles.controlBtn} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B84A62',
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
  },
  // board: {
  //   width: BoardSize,
  //   height: BoardSize,
  //   flex: null,
  //   backgroundColor: "#EFE6E8",
  //   borderRadius: 20,
  //   borderWidth: 5,
  //   borderColor: "black",
  //   borderStyle: "solid"
  // },
  controlContainer: {
    marginTop: 30,
  },
  controllerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlBtn: {
    backgroundColor: "#4C243B",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
