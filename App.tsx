import { GameEngine } from "react-native-game-engine";
import React, { useRef } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Head from "./components/Head";
import Food from "./components/Food";
import Tail from "./components/Tail";
import Constants from "./Constants";
import Section from "./components/Common/section";


type SectionProps = PropsWithChildren<{
  title: string;
}>;

const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const engine = useRef(null);
  const randomPositions = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
    };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
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
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits. {BoardSize}
          </Section>
          <Section title="play">
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
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: "#B84A62",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    // width: (Constants.MAX_WIDTH-50),
    // maxHeight: (Constants.MAX_HEIGHT-50),
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
    flex: 1,
    width: (BoardSize-10),
    height: (BoardSize-10),
    // flex: null,
    backgroundColor: "#EFE6E8",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#4C243B",
    borderStyle: "solid",
    padding: 2,
  }
});

export default App;
