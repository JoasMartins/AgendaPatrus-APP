import React from "react";
import { View, Text, SafeAreaView, Modal, ActivityIndicator } from "react-native"
import style from "./style"

export function LoadingPage({ visible }) {
    return (
        <Modal transparent visible={visible} >
            <View style={style.container}>
                <ActivityIndicator
                    size={"large"}
                    color={"#073ace"}
                />
            </View>
        </Modal>
    ) 
}