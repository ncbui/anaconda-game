import React from "react";
import { View, Text } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { styles } from "../../systems/Styles";

export default function ResetButton({ onPress }) {
  return (
    <View style={styles.resetContainer}>
        <View style={styles.resetRow}>
            <TapGestureHandler onHandlerStateChange={onPress} style={styles.resetButton}>
                <Text style={styles.resetText}>
                    Start 
                    New 
                    Game
                </Text>
            </TapGestureHandler>
        </View>
    </View>
    )}