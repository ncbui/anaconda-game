
import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Controller({ engine }) {
  return (
    <View style={styles.controlContainer}>
            <View style={styles.controllerRow}>
                <TouchableOpacity onPress={() => engine.current.dispatch("move-up")}>
                    <View style={styles.controlBtn} />
                </TouchableOpacity>
            </View>
            <View style={styles.controllerRow}>
                <TouchableOpacity onPress={() => engine.current.dispatch("move-left")}>
                    <View style={styles.controlBtn} />
                </TouchableOpacity>
            <View style={[styles.controlBtn, { backgroundColor: null }]} />
                <TouchableOpacity onPress={() => engine.current.dispatch("move-right")} >
                    <View style={styles.controlBtn} />
                </TouchableOpacity>
            </View>
            <View style={styles.controllerRow}>
                <TouchableOpacity onPress={() => engine.current.dispatch("move-down")}>
                    <View style={styles.controlBtn} />
                </TouchableOpacity>
            </View>
        </View>
    )}

const styles = StyleSheet.create({
    controlContainer: {
        marginTop: 10,
    },
    controllerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    controlBtn: {
        backgroundColor: "#ECA400",
        width: 50,
        height: 50,
        borderRadius: 50,
    },
})