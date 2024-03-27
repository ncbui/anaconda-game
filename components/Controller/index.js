
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Controller({ engine, setEngine }) {

  return (
    <View style={styles.controlContainer}>
            <View style={styles.controllerRow}>
                <TouchableOpacity onPress={() => {
                    engine.current.dispatch("move-up");
                    setEngine(engine)}}>
                    <View style={styles.controlBtn} />
                </TouchableOpacity>
            </View>
            <View style={styles.controllerRow}>
                <TouchableOpacity onPress={() => {
                    engine.current.dispatch("move-left");
                    setEngine(engine)}}>
                    <View style={styles.controlBtn} />
                </TouchableOpacity>
            <View style={[styles.controlBtn, { backgroundColor: null }]} />
                <TouchableOpacity onPress={() => {
                    engine.current.dispatch("move-right");
                    setEngine(engine)}} >
                    <View style={styles.controlBtn} />
                </TouchableOpacity>
            </View>
            <View style={styles.controllerRow}>
                <TouchableOpacity onPress={() => {
                    engine.current.dispatch("move-down");
                    setEngine(engine)}}>
                    <View style={styles.controlBtn} />
                </TouchableOpacity>
            </View>
        </View>
    )}

const styles = StyleSheet.create({
    controlContainer: {
        marginTop: 30,
        padding: 0,
        margin: 0,
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
        borderRadius: 50
    },
})