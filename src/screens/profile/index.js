import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Button, Alert, Image, TouchableOpacity, ToastAndroid, Platform, ScrollView, Switch } from "react-native"
import { useNavigation } from "@react-navigation/native";
import style from "./style"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AppData from "../../../appData.json"

import { LogoTitle } from "../../components/logoTitle";
import { LoadingPage } from "../../pages/loadingPage"
import { ReloadScreen } from "../../pages/reloadScreen";

export function Profile() {
    const Navigation = useNavigation()

    const [isStart, setIsStart] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    const [dadosUser, setDadosUser] = useState({})
    const [switch_newTask, setSwitch_newTask] = useState()
    const [switch_restToday, setSwitch_restToday] = useState()
    const [switch_rest1days, setSwitch_rest1days] = useState()
    const [switch_rest2days, setSwitch_rest2days] = useState()
    const [switch_rest3days, setSwitch_rest3days] = useState()
    const [switch_rest4days, setSwitch_rest4days] = useState()
    const [switch_rest5days, setSwitch_rest5days] = useState()
    const [switch_rest6days, setSwitch_rest6days] = useState()
    const [switch_rest7days, setSwitch_rest7days] = useState()
    const [switch_rest10days, setSwitch_rest10days] = useState()

    const [infoTasks_feitas, setInfoTasks_feitas] = useState(0)
    const [infoTasks_naofeitas, setInfoTasks_naofeitas] = useState(0)
    const [infoTasks_total, setInfoTasks_total] = useState(0)

    const setDados = async () => {

        let dadosLocalSTRING = await AsyncStorage.getItem("AgendaPatrus_login")
        let dadosLocal = JSON.parse(dadosLocalSTRING)
        let dbUserAxios = await axios.get(AppData.api.url + "/users", { params: { email: dadosLocal?.email } })
        let dbUser = dbUserAxios.data

        if (dbUser) {
            //  Infos do perfil
            let objectSend = {
                fullname: dbUser.fullname || "",
                email: dbUser.email || "",
                turma: dbUser.turma || "",
                id: dbUser.id || "NaN",
                _id: dbUser._id || ""
            }

            setDadosUser(objectSend)

            //  Infos datarefas relacionadas ao perfil
            let tasks_user = (await axios.get(AppData.api.url + "/markedtasks/several", { params: { id_user: dbUser?.id } })).data
            let tasks_total = (await axios.get(AppData.api.url + "/tasks/several", { params: { turma: dbUser?.turma } })).data
            let tasks_naofeitas = tasks_total.length - tasks_user.length

            setInfoTasks_feitas(tasks_user.length)
            setInfoTasks_naofeitas(tasks_naofeitas)
            setInfoTasks_total(tasks_total.length)

            //  Notificações de configuração do perfil

        } else {
            let objectSend = {
                fullname: "<Dado inválido>",
                email: "<Dado inválido>",
                turma: "<Dado inválido>",
                id: "<Dado inválido>",
                _id: "<Dado inválido>"
            }

            setDadosUser(objectSend)
        }

    }
    setDados()

    useEffect(() => {
        if (isStart) {
            setLoading(true)
            let dataPass = {
                _id: dadosUser?._id,
                settings: {
                    pushTasksCreated: switch_newTask,
                    pushTasksToday: switch_restToday,
                    pushTasks1Days: switch_rest1days,
                    pushTasks2Days: switch_rest2days,
                    pushTasks3Days: switch_rest3days,
                    pushTasks4Days: switch_rest4days,
                    pushTasks5Days: switch_rest5days,
                    pushTasks6Days: switch_rest6days,
                    pushTasks7Days: switch_rest7days,
                    pushTasks10Days: switch_rest10days,
                }
            }

            axios.put(AppData.api.url + "/users", { params: { dataPass } })
                .then((respo) => { setLoading(false) })
                .catch((err) => {
                    console.error(err)
                    Alert.alert("Não foi possível salvar as alterações!", "Erro de conexão com o Banco de Dados.")
                    setLoading(false)
                })
        } else {

            let getSettings = async () => {
                let dadosLocalSTRING = await AsyncStorage.getItem("AgendaPatrus_login")
                let dadosLocal = JSON.parse(dadosLocalSTRING)
                let dbUserAxios = await axios.get(AppData.api.url + "/users", { params: { email: dadosLocal?.email } })
                let dbUser = dbUserAxios.data


                setSwitch_newTask(dbUser?.settings.pushTasksCreated)
                setSwitch_restToday(dbUser?.settings.pushTasksToday)
                setSwitch_rest1days(dbUser?.settings.pushTasks1Days)
                setSwitch_rest2days(dbUser?.settings.pushTasks2Days)
                setSwitch_rest3days(dbUser?.settings.pushTasks3Days)
                setSwitch_rest4days(dbUser?.settings.pushTasks4Days)
                setSwitch_rest5days(dbUser?.settings.pushTasks5Days)
                setSwitch_rest6days(dbUser?.settings.pushTasks6Days)
                setSwitch_rest7days(dbUser?.settings.pushTasks7Days)
                setSwitch_rest10days(dbUser?.settings.pushTasks10Days)
                setLoading(false)
            }
            getSettings()
        }
        setIsStart(true)
    }, [
        switch_newTask, switch_restToday, switch_rest1days, switch_rest2days, switch_rest3days,
        switch_rest4days, switch_rest5days, switch_rest6days, switch_rest7days, switch_rest10days
    ])

    const ItemSeparatorHorizontal = () => {
        return <View style={style.separatorHori} />
    }

    const ItemSeparatorVertical = () => {
        return <View style={style.separatorVert} />
    }

    const Logout = async () => {
        let objectData = {
            email: null,
            logado: false,
            lastUpdate: Date.now()
        }

        let dadosDevice = await AsyncStorage.getItem("AgendaPatrus_device")

        let dataSend = {
            deviceId: dadosDevice,
            email: "",
            profileId: null,
        }

        await AsyncStorage.setItem("AgendaPatrus_login", JSON.stringify(objectData))
        await axios.put(AppData.api.url + "/devices", dataSend)
        setIsVisible(true)
    }

    let trackColor_true = "#23347C"
    let trackColor_false = "#6e6e6e"
    let thumbColor_true = "#4071ff"
    let thumbColor_false = "#f4f3f4"

    let modelSwitch = {
        stateValue: "",
        stateFunction: "",
        text: ""
    }

    let notificationDiasRest = [
        {
            stateValue: switch_restToday,
            stateFunction: setSwitch_restToday,
            text: "Tarefas do dia"
        },
        {
            stateValue: switch_rest1days,
            stateFunction: setSwitch_rest1days,
            text: "Tarefas restando 1 dia"
        },
        {
            stateValue: switch_rest2days,
            stateFunction: setSwitch_rest2days,
            text: "Tarefas restando 2 dias"
        },
        {
            stateValue: switch_rest3days,
            stateFunction: setSwitch_rest3days,
            text: "Tarefas restando 3 dias"
        },
        {
            stateValue: switch_rest4days,
            stateFunction: setSwitch_rest4days,
            text: "Tarefas restando 4 dias"
        },
        {
            stateValue: switch_rest5days,
            stateFunction: setSwitch_rest5days,
            text: "Tarefas restando 5 dias"
        },
        {
            stateValue: switch_rest6days,
            stateFunction: setSwitch_rest6days,
            text: "Tarefas restando 6 dias"
        },
        {
            stateValue: switch_rest7days,
            stateFunction: setSwitch_rest7days,
            text: "Tarefas restando 7 dias"
        },
        {
            stateValue: switch_rest10days,
            stateFunction: setSwitch_rest10days,
            text: "Tarefas restando 10 dias"
        },
    ]

    /*
style={style.}
    */

    return (
        <SafeAreaView style={style.container}>
            <ReloadScreen visible={isVisible} text={"Você acaba de sair da sua conta! Feche e abra denovo o App para recarregar os dados."} />
            <LoadingPage visible={loading} />
            <LogoTitle title={"Perfil"} />

            <ScrollView>
                <View style={style.user_area}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        if (Platform.OS === "android") {
                            ToastAndroid.show("Função em desenvolvimento!", ToastAndroid.SHORT)
                        } else {
                            Alert.alert("Função não existente", "Sistema de upload de Foto de Perfil ainda em desenvolvimento")
                        }
                    }}>
                        <Image source={require("../../assets/images/user-default.png")} style={style.user_image} />
                    </TouchableOpacity>
                    <Text style={style.user_nameText}>{dadosUser?.fullname}</Text>
                    <Text style={style.user_emailText}>{dadosUser?.email}</Text>
                    <View style={style.user_areaClassAndId}>
                        <View style={style.user_areaCI}>
                            <Text style={style.user_keyText}>TURMA:</Text>
                            <Text style={style.user_valueText}>{dadosUser?.turma}</Text>
                        </View>
                        <View style={style.user_areaCI}>
                            <Text style={style.user_keyText}>ID:</Text>
                            <Text style={style.user_valueText}>{dadosUser?._id}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={style.user_iconLogout} onPress={Logout}>
                        <Image source={require("../../assets/icons/logout.png")} style={style.user_iconLogoutImage} />
                    </TouchableOpacity>
                </View>

                <View style={style.task_modal}>
                <Text style={style.task_areaTitle}>Tarefas</Text>
                    <View style={style.task_area}>
                        <View style={style.task_areaItem}>
                            <Text style={style.task_titleItem}>Feitas</Text>
                            <Text style={style.task_valueItem}>{infoTasks_feitas}</Text>
                        </View>
                        <ItemSeparatorVertical />
                        <View style={style.task_areaItem}>
                            <Text style={style.task_titleItem}>Não feitas</Text>
                            <Text style={style.task_valueItem}>{infoTasks_naofeitas}</Text>
                        </View>
                        <ItemSeparatorVertical />
                        <View style={style.task_areaItem}>
                            <Text style={style.task_titleItem}>Total</Text>
                            <Text style={style.task_valueItem}>{infoTasks_total}</Text>
                        </View>
                    </View>
                </View>

                <View style={style.notification_area}>
                    <Text style={style.notification_areaTitle}>Notificações</Text>

                    <View style={style.notification_areaItem}>
                        <Switch
                            trackColor={{ true: trackColor_true, false: trackColor_false }}
                            thumbColor={switch_newTask ? thumbColor_true : thumbColor_false}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                Alert.alert("Por favor, aguarde", "Esse processo leva alguns segundos")
                                setSwitch_newTask(previousState => !previousState)
                                
                            }}
                            value={switch_newTask}
                        />
                        <Text style={style.notification_textItem}>Avisar quando uma tarefa for criada</Text>
                    </View>

                    <ItemSeparatorHorizontal />

                    {
                        notificationDiasRest.map((itemArray, index) => (
                            <View style={style.notification_areaItem} key={index}>
                                <Switch
                                    trackColor={{ true: trackColor_true, false: trackColor_false }}
                                    thumbColor={itemArray.stateValue ? thumbColor_true : thumbColor_false}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        itemArray.stateFunction(previousState => !previousState)
                                        Alert.alert("Por favor, aguarde", "Esse processo leva alguns segundos")
                                    }}
                                    value={itemArray.stateValue}
                                />
                                <Text style={style.notification_textItem}>{itemArray.text}</Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}