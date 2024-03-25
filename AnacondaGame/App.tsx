import React from 'react';
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

// import { GameEngine } from "react-native-game-engine";
import Head from "./components/Head";
import Food from "./components/Food";
import Tail from "./components/Tail";
import Constants from "./Constants";


type SectionProps = PropsWithChildren<{
  title: string;
}>;

const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const randomPositions = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

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
             {/* <View style={styles.container}> */}
              <View style={styles.canvas}>
                {/* <GameEngine
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
                /> */}
              {/* </View> */}
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
    alignSelf: 'stretch',
    textAlign: 'center',
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  canvas: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: "#ECA400",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    borderRadius: 20,
    borderWidth: 10,
    borderColor: "#4C243B",
    borderStyle: "solid",
  },
  board: {
    width: BoardSize,
    height: BoardSize,
    flex: null,
    backgroundColor: "#EFE6E8",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#4C243B",
    borderStyle: "solid",
    padding: 2,
  },
  title: {
    color: "#4C243B",
    fontSize: 20,
    fontWeight: "900",
    padding: 10,
  },
});

export default App;
