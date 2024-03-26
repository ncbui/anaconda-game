import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ResetButton({ onPress }) {
  return (
    <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.resetButton}>
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
        padding: 0,
        margin: 0,
        borderRadius: 20,
    },
    controllerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    resetButton: {
        color: "purple",
        fontWeight: '700',
        textAlign: "center",
        fontSize: 22,
        padding: 10,
        margin: 20,
        backgroundColor: "#ECA400",
        borderRadius: 50,
        height: 100,
        width: 100,
    },
})