import React from "react";
import { View, Text, SafeAreaView, Modal } from "react-native"
import style from "./style"

export function ReloadScreen({ text, visible }) {
    return (
        <Modal transparent visible={visible}>
            <View style={style.container}>
                <Text style={style.text}>{text}</Text>
            </View>
        </Modal>
    )
}