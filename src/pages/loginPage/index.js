import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, Alert } from "react-native"
import style from "./style"
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AppData from "../../../appData.json"
import AsyncStorage from "@react-native-async-storage/async-storage"
import OneSignal from "react-native-onesignal";

import { ReloadScreen } from "../../pages/reloadScreen";

export function LoginPage(data) {
    const Navigation = useNavigation()

    let userData = data?.route?.params?.userData

    let [email, setEmail] = useState(userData?.email || "")
    let [password, setPassword] = useState(userData?.password || "")
    let [isVisible, setIsVisible] = useState(false)
    let [isVisiblePassoword, setIsVisiblePassoword] = useState(true)

    async function handleEnter(dataUser) {
        // USAR SISTEMA DE BANCO DE DADOS LOCAL PARA GUARDAR DADOS DE LOGIN
        let dbUser = await axios.get(AppData.api.url + "/users", { params: { email } })
        if (!dbUser || !dbUser?.data || dbUser?.data?.message) {
            return Alert.alert("Não foi possível encontrar essa conta!", "Verifique o email e tente novamente.")
        }

        let passwordDBDescryptoDATA = await axios.get(AppData.api.url+"/crypto", { params: { crypto: dbUser?.data?.password } })
        let passwordDBDescrypto = passwordDBDescryptoDATA?.data?.cryptoString
        if(passwordDBDescrypto !== password) {
            return Alert.alert("Senha incorreta!", "Verifique a senha e tente novamente. Se você não se lembra, entre em contato com o desenvolvedor (Joás 2MB) para trocar a senha.")
        }

        let itemSave = {
            email,
            turma: dbUser?.data?.turma,
            logado: true,
            lastUpdate: Date.now(),
            id: dbUser?.data?.id
        }

        await AsyncStorage.setItem("AgendaPatrus_login", JSON.stringify(itemSave))
            .then(() => { })
            .catch((err) => { return console.error(err) })

        let device = await OneSignal.getDeviceState()
        let findDeviceInDB = await axios.get(AppData.api.url + "/devices", { params: { userId: device.userId } })

        if (findDeviceInDB.data) {
            if (!findDeviceInDB.data.email) {
                let dataUpdate = {
                    deviceId: device.userId,
                    email: email,
                    profileId: dbUser.data._id
                }

                axios.put(AppData.api.url + "/devices", dataUpdate)
                    .then((resp) => { })
                    .catch((err) => { console.error(err) })
            }
        } else {

        }

        /*
    Navigation.reset({
        index: 0,
        routes: [{ name: 'Profile' }], // Substitua 'NomeDaTela' pelo nome da tela que você deseja reiniciar
      });
      */

        setIsVisible(true)
    }

    return (
        <SafeAreaView style={style.container}>
            <ReloadScreen text={"Você entrou com sucesso na sua conta! Feche e abra denovo o App para recarregar seus dados."} visible={isVisible} />
            <View style={style.header}>
                <TouchableOpacity style={style.headerTouch} onPress={() => {
                    Navigation.goBack()
                }}>
                    <Image style={style.headerIcons} source={require("../../assets/icons/back.png")} />
                </TouchableOpacity>
                <Text style={style.headerTexts}>Login</Text>
            </View>

            <View style={style.main}>
                <View style={style.formItem}>
                    <Text style={style.textItem}>Email:</Text>
                    <TextInput style={style.inputItem} defaultValue={email} keyboardType="email-address" onChangeText={(text) => setEmail(text)} />
                </View>
                <View style={style.formItem}>
                    <Text style={style.textItem}>Senha:</Text>
                    <View style={style.areaInputPassword}>
                        <TextInput style={style.inputItem} secureTextEntry={isVisiblePassoword} defaultValue={password} onChangeText={(text) => setPassword(text)} />
                        <TouchableOpacity style={style.areaIconShowP} onPress={() => setIsVisiblePassoword(!isVisiblePassoword)}>
                            {
                                isVisiblePassoword
                                    ?
                                    <Image style={style.iconShowPassword} source={require("../../assets/icons/eyePassword-block.png")} />
                                    :
                                    <Image style={style.iconShowPassword} source={require("../../assets/icons/eyePassword-free.png")} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={style.buttonEnter} onPress={() => handleEnter({ email, password })}>
                    <Text style={style.textButton}>Entrar</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}