
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";

export default function Controller({ engine }) {

  return (
    <View style={styles.controlContainer}>
            <View style={styles.controllerRow}>
                <TapGestureHandler onHandlerStateChange={() => {
                    engine.current.dispatch("move-up");}}>
                    <View style={styles.controlBtn} />
                </TapGestureHandler>
            </View>
            <View style={styles.controllerRow}>
                <TapGestureHandler onHandlerStateChange={() => {
                    engine.current.dispatch("move-left");}}>
                    <View style={styles.controlBtn} />
                </TapGestureHandler>
            <View style={[styles.controlBtn, { backgroundColor: null }]} />
                <TapGestureHandler onHandlerStateChange={() => {
                    engine.current.dispatch("move-right");}} >
                    <View style={styles.controlBtn} />
                </TapGestureHandler>
            </View>
            <View style={styles.controllerRow}>
                <TapGestureHandler onHandlerStateChange={() => {
                    engine.current.dispatch("move-down");}}>
                    <View style={styles.controlBtn} />
                </TapGestureHandler>
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