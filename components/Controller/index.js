
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { styles } from "../../systems/Styles";

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