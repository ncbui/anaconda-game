import React, { useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { GameEngine } from "react-native-game-engine";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Head from "./components/Head";
import Food from "./components/Food";
// import Tail from "./components/Tail";
import Constants from "./Constants";
import Section from "./components/Common/section";
import GameLoop from "./systems/GameLoop";
import Controller from './components/Controller';
import ResetButton from './components/Reset/button';
import { randomPositions } from './components/Common/functions';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;


function App(): React.JSX.Element {
  const [isGameRunning, setIsGameRunning] = useState(true);
  const engine = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: !isDarkMode ? Colors.darker : Colors.lighter,
  };
  const resetGame = () => {
      engine.current.swap({
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
      });
      setIsGameRunning(true);
    };

  return (
    <GestureHandlerRootView style={backgroundStyle}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}> */}
          <View
            style={{
              backgroundColor: !isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Anaconda">
              <View style={styles.container}>
                <View style={styles.canvas}>
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
                      }
                    }}
                    systems={[GameLoop]}
                    running={isGameRunning}
                    onEvent={(e) => {
                      switch (e) {
                        case "game-over":
                          alert("Game over!");
                          setIsGameRunning(false);
                          return;
                      }
                    }}
                  /> 
                </View>
              <View style={styles.controller}>
                {isGameRunning ?  <Controller engine={engine}/> : <ResetButton onPress={resetGame}/> }
              </View>
              </View>
            </Section>
          </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: "#B84A62",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
  },
  canvas: {
    backgroundColor: "#ECA400",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  board: {
    flex: undefined,
    width: (BoardSize-20),
    height: (BoardSize-20),
    backgroundColor: "#EFE6E8",
    borderRadius: 20,
    padding: 3,
    borderWidth: 2,
    borderColor: "#B84A62",
    borderStyle: "solid",
  },
  controller: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "stretch",
    alignItems: "flex-end",
    borderRadius: 20,
  }
});

export default App;

