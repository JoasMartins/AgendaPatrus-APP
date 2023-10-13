import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Image } from "react-native"
import style from "./style"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import appData from "../../../appData.json"

import { LogoTitle } from "../../components/logoTitle";
import { TaskLabel } from "../../components/taskLabel";
import { LoadingPage } from "../../pages/loadingPage";
import { EmptyTaskList } from "../../components/emptyTaskList";

export function PastTasks() {

    const [loading, setLoading] = useState(true)
    const [dataVerify, setDataVerify] = useState()
    const [dadosVerificar, setDadosVerificar] = useState([])

    const [last7Days, setLast7Days] = useState([])
    const [last30Days, setLast30Days] = useState([])
    const [previousDays, setPreviousDays] = useState([])

    const [isVisible7, setIsVisible7] = useState(true)
    const [isVisible30, setIsVisible30] = useState(true)
    const [isVisiblePrevious, setIsVisiblePrevious] = useState(true)

    const handleVisible = (area) => {
        if (area === "7") {
            if (isVisible7) {
                setIsVisible7(false)
            } else {
                setIsVisible7(true)
            }
        }

        if (area === "30") {
            if (isVisible30) {
                setIsVisible30(false)
            } else {
                setIsVisible30(true)
            }
        }

        if (area === "anterior") {
            if (isVisiblePrevious) {
                setIsVisiblePrevious(false)
            } else {
                setIsVisiblePrevious(true)
            }
        }
    }

    async function gerarLista() {
        setLoading(true)

        let userDataSTRING = await AsyncStorage.getItem("AgendaPatrus_login")
        let userData = JSON.parse(userDataSTRING)

        let database = await axios.get(appData.api.url + "/tasks/several", { params: { turma: userData?.turma } })
        let itemsOrganizados = database.data

        let items = itemsOrganizados.filter(task => task.date < Date.now())

        itemsOrganizados.sort(function (a, b) {
            return a.date - b.date;
        });

        let last7days = []
        let last30days = []
        let anteriores = []

        itemsOrganizados.map((item) => {
            let dias = Math.ceil((item.date - Date.now()) / (24 * 60 * 60 * 1000));
            if (dias <= -1 && dias >= -7) last7days.push(item);
            if (dias <= -8 && dias >= -30) last30days.push(item);
            if (dias < -30) anteriores.push(item);
        })

        last7days.reverse()
        last30days.reverse()
        anteriores.reverse()

        setLast7Days(last7days)
        setLast30Days(last30days)
        setPreviousDays(anteriores)

        setLoading(false)
    }

    useEffect(() => {
        gerarLista()
        //  Avisar ao usuario solicitar que reccarere || Ou || Forçar recarregamento pq vai acontecer só
        //  se tiver alteração, aparecer a tela de carregamento avisando que está carregando novos dados
    }, [])

    return (
        <SafeAreaView style={style.container}>
            <LogoTitle title={"Tarefas Passadas"} />
            <LoadingPage visible={loading} />

            <ScrollView>
                <View>
                    <TouchableOpacity onPress={gerarLista} style={style.buttonAction}>
                        <Image style={style.buttonIcon} source={require("../../assets/icons/reload.png")} />
                        <Text style={style.buttonText}>Recarregar</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={style.headerSections}>
                        <Text style={style.titleSections}>A 7 dias</Text>
                        <TouchableOpacity onPress={() => handleVisible("7")}>
                            <Image style={style.iconArrow} source={isVisible7 ? require("../../assets/icons/arrow-top.png") : require("../../assets/icons/arrow-bottom.png")} />
                        </TouchableOpacity>
                    </View>
                    {isVisible7 ?
                        last7Days.length > 0
                            ?
                            last7Days.map((item, index) => (
                                <TaskLabel key={index} title={item.title} dataTask={item} daysScore={Math.ceil((item.date - Date.now()) / (24 * 60 * 60 * 1000))} />
                            ))
                            :
                            <EmptyTaskList />
                        :
                        <View />
                    }
                </View>

                <View>
                    <View style={style.headerSections}>
                        <Text style={style.titleSections}>A 30 dias</Text>
                        <TouchableOpacity onPress={() => handleVisible("30")}>
                            <Image style={style.iconArrow} source={isVisible30 ? require("../../assets/icons/arrow-top.png") : require("../../assets/icons/arrow-bottom.png")} />
                        </TouchableOpacity>
                    </View>
                    {
                        isVisible30 ?
                            last30Days.length > 0
                                ?
                                last30Days.map((item, index) => (
                                    <TaskLabel key={index} title={item.title} dataTask={item} daysScore={Math.ceil((item.date - Date.now()) / (24 * 60 * 60 * 1000))} />
                                ))
                                :
                                <EmptyTaskList />
                            :
                            <View />
                    }
                </View>

                <View>
                    <View style={style.headerSections}>
                        <Text style={style.titleSections}>Anteriores</Text>
                        <TouchableOpacity onPress={() => handleVisible("anterior")}>
                            <Image style={style.iconArrow} source={isVisiblePrevious ? require("../../assets/icons/arrow-top.png") : require("../../assets/icons/arrow-bottom.png")} />
                        </TouchableOpacity>
                    </View>
                    {
                        isVisiblePrevious ?
                            previousDays.length > 0
                                ?
                                previousDays.map((item, index) => (
                                    <TaskLabel key={index} title={item.title} dataTask={item} daysScore={Math.ceil((item.date - Date.now()) / (24 * 60 * 60 * 1000))} />
                                ))
                                :
                                <EmptyTaskList />
                            :
                            <View />
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}