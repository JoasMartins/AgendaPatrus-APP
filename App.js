import React, { useState, useEffect } from "react"
import { View, Text, SafeAreaView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import OneSignal from "react-native-onesignal"
import appData from "./appData.json"
import axios from "axios"

import { NavigationContainer } from "@react-navigation/native"
import { Routes } from "./src/routes"
import { LoginOrRegister_StackRoutes } from "./src/pages/loginOrRegisterPage/routesStack"
import { LoadingPage } from "./src/pages/loadingPage"
import { PreStartPage } from "./src/pages/preStartPage"

export default function App() {

  let [login, setLogin] = useState(null)
  let [startApp, setStartApp] = useState(false)

  useEffect(() => {
    if (!startApp) {

      const VELHOfetchLogin = async () => {
        let dataUserSTRING = await AsyncStorage.getItem("AgendaPatrus_login")
        //  L--> {"email":"bielfernando8391@gmail.com","logado":true,"date":1689025497406}
        //  email: teste@gmail.com | senha: 12345678 | nome: Testador Oficial

        // PARA TESTES:
        //  Nome:  Joás Tester da Silva
        //  Email: joas.teste@gmail.com
        //  Senha: senha123senha
        let dataUser = JSON.parse(dataUserSTRING)

        if (dataUser?.logado === true) {
          setLogin(true)
        } else {
          setLogin(false)
        }
      }
      //VELHOfetchLoginfetchLogin()

      const fetchLogin = async () => {
        let dataUser_STRING = await AsyncStorage.getItem("AgendaPatrus_login")
        let dataUser = JSON.parse(dataUser_STRING)

        if (dataUser?.logado === true) {
          setLogin(true)
        } else {
          setLogin(false)
        }
      }
      fetchLogin()

    } else {
      const startOneSignal = async () => {
        //  Iniciando OneSignal
        OneSignal.setAppId(appData.onesginal.appId)
        OneSignal.setLogLevel(6, 0)
        OneSignal.setRequiresUserPrivacyConsent(false)
        OneSignal.promptForPushNotificationsWithUserResponse()

        let device = await OneSignal.getDeviceState()

        //  Buscar em LocalStorage os valores de "device" 
        let localStorage_device = await AsyncStorage.getItem("AgendaPatrus_device")

        //  se o playerId NÃO está salvo no StorageLocal em "device" 
        if (!localStorage_device) {
          await AsyncStorage.setItem("AgendaPatrus_device", `${device.userId}`)
        }

        //  Verificar se o playerId do dispositivo já está no Banco de Dados
        let dataDB_deviceAWAIT = await axios.get(appData.api.url + "/devices", { params: { userId: device.userId } })
        let dataDB_deviceNOFILTER = dataDB_deviceAWAIT.data
        let dataDB_deviceFILTER = dataDB_deviceNOFILTER.filter(item => item.userId === device.userId)
        let dataDB_device = dataDB_deviceFILTER[0]

        //  se NÃO existir nenhum item no Banco de Dados "Device" com o playerId do dispositivo
        if (!dataDB_device) {
          await axios.post(appData.api.url + "/devices", {
            userId: device.userId,
            email: "",
            //profileId: null,
          })
            .then((resp) => { })
            .catch((err) => { console.error(err) })
        }

        // LOGIN
        // se nesse dispositivo o login NÃO  está realizado
        if (login === false) return
        // se o login estiver realizado, prossegue...
        let dataUser_STRING = await AsyncStorage.getItem("AgendaPatrus_login")
        let dataUser = JSON.parse(dataUser_STRING)

        //  Verificar se os dados "Email" e "Id" da conta está no item do dispositivo em "Devices"
        let dataDB_deviceNEW = await (await axios.get(appData.api.url + "/devices", { params: { userId: device.userId } })).data
        if (!dataDB_deviceNEW?.email) {
          let dataSend = {
            deviceId: device.userId,
            email: dataUser.email,
            profileId: dataUser._id,
          }

          await axios.put(appData.api.url + "/devices", dataSend)
            .then((resp) => { })
            .catch((err) => { console.error(err) })
        }
      }

      const formacaoDados = async () => {
        //  FORMAÇÃO DE DADOS

        let localStorage_device = await AsyncStorage.getItem("AgendaPatrus_device")
        let object_localstorage_device = {
          
        }

        let object_localstorage_login = {

        }

        let object_database_devices = {

        }

        let object_database_profile = {

        }
      }

      startOneSignal()
    }

    setStartApp(true)
  }, [login])

  return (
    <NavigationContainer>
      {
        login === null
          ?
          <PreStartPage />
          :
          login === true
            ?
            <Routes />
            :
            <LoginOrRegister_StackRoutes />

      }
    </NavigationContainer>
  )
}