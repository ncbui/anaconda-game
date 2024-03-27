import React, { useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Alert
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { GameEngine } from "react-native-game-engine";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Head from "./components/Head";
import Food from "./components/Food";
import Tail from "./components/Tail";
import Constants from "./Constants";
import Section from "./components/Common/section";
import GameLoop from "./systems/GameLoop";
import Controller from './components/Controller';
import ResetButton from './components/Reset/button';
import { randomPositions } from './components/Common/functions';
import { styles } from './systems/Styles';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;


function App(): React.JSX.Element {
  const [isGameRunning, setIsGameRunning] = useState(true);
  const engine = useRef(null);
  const [currentEngine, setcurrentEngine] = useState(useRef.current)
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: !isDarkMode ? Colors.darker : Colors.lighter,
  };
  const resetGame = () => {
      engine.current.swap({
        head: {
          position: [1, 1],
          size: Constants.CELL_SIZE,
          updateFrequency: 10,
          nextMove: 10,
          xspeed: 1,
          yspeed: 0,
          renderer: <Head />,
        },
        food: {
          position: [
            randomPositions(0, Constants.GRID_SIZE - 3),
            randomPositions(0, Constants.GRID_SIZE - 3),
            randomPositions(0, Constants.GRID_SIZE - 3),
          ],
          size: Constants.CELL_SIZE,
          renderer: <Food />,
        },
        tail: {
          size: Constants.CELL_SIZE,
          elements: [],
          renderer: <Tail />,
        },
      });
      setcurrentEngine(engine);
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
              backgroundColor: !isDarkMode ? '#4c243b' : Colors.white,
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
                          randomPositions(0, Constants.GRID_SIZE - 3),
                          randomPositions(0, Constants.GRID_SIZE - 3),
                          randomPositions(0, Constants.GRID_SIZE - 3),
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
                          Alert.alert("Game over!");
                          setIsGameRunning(false);
                          return;
                      }
                    }}
                  /> 
                </View>
              <View style={styles.controller}>
                {isGameRunning ?  <Controller engine={engine} /> : <ResetButton onPress={resetGame}/> }
              </View>
              </View>
            </Section>
          </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
