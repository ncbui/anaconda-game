import React, { useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
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


type SectionProps = PropsWithChildren<{
  title: string;
}>;

const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;


function App(): React.JSX.Element {
  const [isGameRunning, setIsGameRunning] = useState(true);
  const engine = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';
  const randomPositions = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
    };

  const backgroundStyle = {
    backgroundColor: !isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
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
              <View>
                <Controller engine={engine}/>
              </View>
              </View>
            </Section>
          </View>
        </ScrollView>
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
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
  },
  canvas: {
    flex: 1,
    textAlign: 'center',
    width: (Constants.MAX_WIDTH-60),
    height: (Constants.MAX_HEIGHT-60),
    backgroundColor: "#ECA400",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
    borderWidth: 10,
    borderColor: "#4C243B",
    borderStyle: "solid",
  },
  board: {
    flex: undefined,
    width: (BoardSize-10),
    height: (BoardSize-10),
    backgroundColor: "#EFE6E8",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#4C243B",
    borderStyle: "solid",
    padding: 2,
  }
});

export default App;
