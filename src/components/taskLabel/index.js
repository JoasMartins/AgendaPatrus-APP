import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native"
import style from "./style"
import axios from "axios";
import AppData from "../../../appData.json"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function TaskLabel({ title, daysScore, checkbox, dataTask }) {
    const Navigation = useNavigation()

    const [checkboxMark, setCheckboxMark] = useState(false)
    const [isLoad, setIsLoad] = useState(false)

    const uploadMark = async () => {
        let userDataSTRING = await AsyncStorage.getItem("AgendaPatrus_login")
        let userData = JSON.parse(userDataSTRING)

        let dataSend = {
            id_task: dataTask?.id || null,
            id_user: userData?.id || null,
        }

        axios.post(AppData.api.url + "/markedtasks", dataSend)
            .then((resp) => {
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const removeMark = async () => {
        let userDataSTRING = await AsyncStorage.getItem("AgendaPatrus_login")
        let userData = JSON.parse(userDataSTRING)

        let userTasks = await axios.get(AppData.api.url + "/markedtasks/several", { params: { id_user: userData.id } })
        let itemTask = userTasks.data.filter((task) => task.id_task === dataTask.id)

        axios.delete(AppData.api.url + "/markedtasks", { params: { id: itemTask[0].id } })
            .then((resp) => {
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const getMark = async () => {
        let userDataSTRING = await AsyncStorage.getItem("AgendaPatrus_login")
        let userData = JSON.parse(userDataSTRING)

        let userTasks = await axios.get(AppData.api.url + "/markedtasks/several", { params: { id_user: userData.id } })
        let itemTask = userTasks.data.filter((task) => task.id_task === dataTask.id)

        if (itemTask[0]) {
            setCheckboxMark(true)
        }
    }

    useEffect(() => {
        getMark()
    }, [])

    if (!daysScore) {
        var msgDayScore = ``
    } else {
        if (daysScore >= 0) {
            var msgDayScore = `Em ${daysScore} dia`
            if (daysScore > 1) msgDayScore = `Em ${daysScore} dias`
            if (daysScore > 45) msgDayScore = `Em ${Math.round(daysScore / 30.4375)} meses`
        } else {
            var msgDayScore = `A ${Math.abs(daysScore)} dia`
            if (daysScore < -1) msgDayScore = `A ${Math.abs(daysScore)} dias`
            if (daysScore < -45) msgDayScore = `A ${Math.round(Math.abs(daysScore) / 30.4375)} meses`
        }
    }

    const handleTask = () => {
        Navigation.navigate("TaskPage", dataTask)
    }

    return (
        <TouchableOpacity onPress={handleTask}>
            <View style={style.container}>

                <View style={style.areaTask}>
                    <TouchableOpacity onPress={() => {
                        if (checkboxMark === true) {
                            setCheckboxMark(false)
                            removeMark()
                        } else {
                            setCheckboxMark(true)
                            uploadMark()
                        }
                    }}>
                        <Image source={checkboxMark === true ? require("../../assets/icons/checkbox-yesMark.png") : require("../../assets/icons/checkbox-noMark.png")} style={style.checkbox} />
                    </TouchableOpacity>
                    <Text style={style.textTask}><Text style={checkboxMark === true ? { color: "rgba(255, 255, 255, 0.5)" } : { color: "white" }}>{title}</Text></Text>
                </View>

                <View style={style.areaArrow}>
                    <Text style={style.textDaysScore}>{msgDayScore}</Text>
                    <Image source={require("../../assets/icons/arrow.png")} style={style.arrow} />
                </View>

            </View>
        </TouchableOpacity>
    )
}