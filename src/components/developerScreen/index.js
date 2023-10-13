import React from "react";
import {View, Text, SafeAreaView, Image, Button} from "react-native"
import style from "./style"

export function DeveloperScreen({text, finish}) {
    return (
        <SafeAreaView style={style.container}>
            <View style={style.main_area}>
                <Image style={style.main_image} source={require("../../assets/images/build-alert.png")}/>
                <Text style={style.main_titleText}>Página em construção</Text>
                <View style={style.main_areaInfos}>
                    <Text style={style.main_text1}>{text}</Text>
                    <Text style={style.main_text2}>{finish}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}