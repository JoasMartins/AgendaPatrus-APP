import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native"
import style from "./style"

export function LogoTitle({ title }) {
    return (
        <SafeAreaView style={style.area}>
            <View style={style.container}>
                <View style={style.areaLogo}>
                    <Image source={require("../../assets/images/logo.png")} style={style.logo} />
                </View>
                <Text style={style.title}>{title}</Text>
            </View>
            <View style={style.viewLine}>
                <View style={style.line} />
            </View>
        </SafeAreaView>
    )
}