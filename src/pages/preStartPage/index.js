import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native"
import style from "./style"

export function PreStartPage() {
    return (
        <SafeAreaView style={style.container}>
            <View style={style.areaLogo}>
                <Image source={require("../../assets/images/logo.png")} style={style.logo} />
            </View>
            <Text style={style.textTitle}>AgendaPatrus</Text>
            <View>
                <Text style={style.textSubtitle}>O aplicativo para organizar seus estudos da</Text>
                <Text style={style.textSubtitle}>Escola E. Sebastião Patrus de Souza</Text>
            </View>
        </SafeAreaView>
    )
}