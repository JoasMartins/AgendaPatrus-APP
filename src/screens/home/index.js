import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native"
import style from "./style"
import axios from "axios";
import appData from "../../../appData.json"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"

import { LogoTitle } from "../../components/logoTitle";
import { TaskLabel } from "../../components/taskLabel";
import { LoadingPage } from "../../pages/loadingPage"
import { EmptyTaskList } from "../../components/emptyTaskList";

import OneSignal from 'react-native-onesignal';

export function Home() {
    const Navigation = useNavigation()

    const [taskList, setTaskList] = useState([])
    const [nowDay, setNowDay] = useState([])
    const [nextWeek, setNextWeek] = useState([])
    const [moreTasks, setMoreTasks] = useState([])

    const [isLoad, setIsLoad] = useState(false)
    const [loading, setLoading] = useState(true)

    async function gerarLista() {
        setLoading(true)

        let userDataSTRING = await AsyncStorage.getItem("AgendaPatrus_login")
        let userData = JSON.parse(userDataSTRING)

        let database = await axios.get(appData.api.url + "/tasks/several", { params: { turma: userData?.turma } })
        setTaskList(database.data)

        let itemsOrganizados = database.data

        itemsOrganizados.sort(function (a, b) {
            return a.date - b.date;
        });

        let hoje = []
        let semana = []
        let depois = []

        itemsOrganizados.map((item) => {
            let dias = Math.ceil((item.date - Date.now()) / (24 * 60 * 60 * 1000))
            if (dias === 0) hoje.push(item)
            if (dias >= 1 && dias <= 7) semana.push(item)
            if (dias >= 8) depois.push(item)
        })

        setNowDay(hoje)
        setNextWeek(semana)
        setMoreTasks(depois)

        setLoading(false)
    }

    async function toPastTasks() {
        Navigation.navigate("PastTasks")
    }

    useEffect(() => {
        if (isLoad === false) {
            gerarLista()
            setIsLoad(true)
        }
    }, [nowDay, nextWeek, moreTasks])

    return (
        <SafeAreaView style={style.container}>
            <LoadingPage visible={loading} />
            <LogoTitle title={"Início"} />
            <View style={style.areaMain}>

                <ScrollView style={{ overflow: "scroll", marginBottom: 110 }}>
                    <View style={style.areaActions}>
                        <TouchableOpacity onPress={gerarLista} style={style.buttonAction}>
                            <Image style={style.buttonIcon} source={require("../../assets/icons/reload.png")} />
                            <Text style={style.buttonText}>Recarregar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toPastTasks} style={style.buttonAction}>
                            <Image style={style.buttonIcon} source={require("../../assets/icons/past-list.png")} />
                            <Text style={style.buttonText}>Anteriores</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={style.titleSections}>Hoje</Text>
                    {
                        nowDay.length > 0
                        ?
                        nowDay.map((item, index) => (
                            <TaskLabel key={index} title={item.title} dataTask={item} />
                        ))
                        :
                        <EmptyTaskList/>
                    }

                    <View style={style.viewLine}>
                        <View style={style.line} />
                    </View>

                    <Text style={style.titleSections}>Em 7 dias</Text>
                    {
                        nextWeek.length > 0
                        ?
                        nextWeek.map((item, index) => (
                            <TaskLabel key={index} title={item.title} dataTask={item} daysScore={Math.ceil((item.date - Date.now()) / (24 * 60 * 60 * 1000))} />
                        ))
                        :
                        <EmptyTaskList/>
                    }

                    <View style={style.viewLine}>
                        <View style={style.line} />
                    </View>

                    <Text style={style.titleSections}>Próximos</Text>
                    {
                        moreTasks.length > 0
                        ?
                        moreTasks.map((item, index) => (
                            <TaskLabel key={index} title={item.title} dataTask={item} daysScore={Math.ceil((item.date - Date.now()) / (24 * 60 * 60 * 1000))} />
                        ))
                        :
                        <EmptyTaskList/>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}