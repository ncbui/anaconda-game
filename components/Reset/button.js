import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ResetButton({ onPress }) {
  return (
    <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
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

const styles = StyleSheet.create({
    controlContainer: {
        marginTop: 30,
    },
    controllerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    resetButton: {
        padding: 10,
        margin: 20,
        backgroundColor: "#ECA400",
        borderRadius: 20,
        height: 100,
        width: 100,
    },
    resetText: {
        color: "purple",
        fontWeight: '700',
        textAlign: "center",
        fontSize: 22,
    }
})