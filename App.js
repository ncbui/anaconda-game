import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import React, { useRef } from "react";
import Constants from "./Constants";
import Head from "./components/Head";
import Food from "./components/Food";
import Tail from "./components/Tail";

const randomPositions = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;

export default function App() {
  const engine = useRef(null);
  
  return (
    <View style={styles.container}>
    <View style={styles.canvas}>
      <Text style={styles.title}>Anaconda</Text>
      <GameEngine
              ref={engine}
              style={styles.board}
              entities={{
                head: {
                  position: [0, 0],
                  size: Constants.CELL_SIZE,
                  updateFrequency: 10,
                  nextMove: 10,
                  xspeed: 0,
                  yspeed: 0,
                  renderer: <Head />,
                },
                food: {
                  position: [
                    randomPositions(0, Constants.GRID_SIZE - 2),
                    randomPositions(0, Constants.GRID_SIZE - 2),
                    randomPositions(0, Constants.GRID_SIZE - 2),
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
  },
  board: {
    width: BoardSize,
    height: BoardSize,
    flex: null,
    backgroundColor: "#EFE6E8",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "black",
    borderStyle: "solid"
  },
  title: {

  },
  

});
