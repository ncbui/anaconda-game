import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../systems/Styles";

export default function ResetButton({ onPress }) {
  return (
    <View style={styles.resetContainer}>
        <View style={styles.resetRow}>
            <TouchableOpacity onPress={onPress} style={styles.resetButton}>
                <Text style={styles.resetText}>
                    Start 
                    New 
                    Game
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    )}