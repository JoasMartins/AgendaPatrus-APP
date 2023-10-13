import React from "react";
import {View, Text, SafeAreaView} from "react-native"
import style from "./style"

export function EmptyTaskList() {
    return (
        <SafeAreaView style={style.container}>
            <Text style={style.text}>Nenhuma tarefa</Text>
        </SafeAreaView>
    )
}