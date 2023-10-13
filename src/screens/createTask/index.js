import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity, ScrollView, Alert } from "react-native"
import style from "./style"
import { RadioButton } from "react-native-paper"
import axios from "axios"
const appData = require("../../../appData.json")
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LogoTitle } from "../../components/logoTitle";
import { LoadingPage } from "../../pages/loadingPage"

export function CreateTask() {

    let date = new Date()
    let dia = date.getDate()
    if (dia < 10) dia = "0" + dia
    let mes = date.getMonth() + 1
    if (mes < 10) mes = "0" + mes
    let textDate = `${dia}/${mes}`

    const [checked, setChecked] = useState("Atividade")
    const [loading, setLoading] = useState(false)

    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [taskDate, setTaskDate] = useState(textDate)

    return (
        <SafeAreaView style={style.container}>
            <LoadingPage visible={loading} />
            <LogoTitle title={"Criar nova tarefa"} />

            <ScrollView style={style.page}>
                <View style={style.areaTitle}>
                    <Text style={style.textTitle}>Título:</Text>
                    <TextInput style={style.inputTitle} onChangeText={(text) => { setTaskTitle(text) }} placeholder="Prova de Matemática..." placeholderTextColor={"rgba(132, 146, 166, 0.4)"} />
                </View>

                <View style={style.areaTitle}>
                    <Text style={style.textTitle}>Descrição:</Text>
                    <TextInput style={style.inputBig} onChangeText={(text) => { setTaskDescription(text) }} multiline={true} numberOfLines={5} placeholderTextColor={"rgba(132, 146, 166, 0.5)"} placeholder={`Oque vai cair na prova: \n- Pitágoras; \n- Bhaskara; \n- Geometria...`} />
                </View>

                <View style={style.areaTitle}>
                    <Text style={style.textTitle}>Tipo:</Text>

                    <View style={style.inputRadio}>
                        <RadioButton
                            value="Atividade"
                            status={checked === "Atividade" ? "checked" : "unchecked"}
                            onPress={() => setChecked("Atividade")}
                            color="#4273ff"
                        />
                        <Text style={style.textInputRadio}>Atividade</Text>
                    </View>

                    <View style={style.inputRadio}>
                        <RadioButton
                            value="Trabalho"
                            status={checked === "Trabalho" ? "checked" : "unchecked"}
                            onPress={() => setChecked("Trabalho")}
                            color="#4273ff"
                        />
                        <Text style={style.textInputRadio}>Trabalho</Text>
                    </View>

                    <View style={style.inputRadio}>
                        <RadioButton
                            value="Prova"
                            status={checked === "Prova" ? "checked" : "unchecked"}
                            onPress={() => setChecked("Prova")}
                            color="#4273ff"
                        />
                        <Text style={style.textInputRadio}>Prova</Text>
                    </View>

                    <View style={style.inputRadio}>
                        <RadioButton
                            value="Outro"
                            status={checked === "Outro" ? "checked" : "unchecked"}
                            onPress={() => setChecked("Outro")}
                            color="#4273ff"
                        />
                        <Text style={style.textInputRadio}>Outro</Text>
                    </View>

                </View>

                <View style={style.areaTitle}>
                    <Text style={style.textTitle}>Data:</Text>
                    <TextInput style={style.inputTitle} onChangeText={(text) => { setTaskDate(text) }} placeholder={textDate} placeholderTextColor={"rgba(132, 146, 166, 0.4)"} >{textDate}</TextInput>
                </View>


                <TouchableOpacity style={style.buttonSave} onPress={async () => {
                    setLoading(true)
                    var PONTOinicial = Date.now()
                    var PONTO1 = Date.now()
                    console.log(`[${PONTO1 - PONTOinicial}] PONTO 1 - Inicio`)

                    let userDataSTRING = await AsyncStorage.getItem("AgendaPatrus_login")
                    let userData = JSON.parse(userDataSTRING)
                    var PONTO2 = Date.now()
                    console.log(`[${PONTO2 - PONTO1}] PONTO 2 - Busca do Login do Dispositivo`)

                    if (!taskTitle) {
                        setLoading(false)
                        Alert.alert("Formulário incompleto!", "É necessário preencher o campo 'Título'", [
                            { text: "Fechar", style: "cancel" },
                        ])
                        return
                    }
                    var PONTO3 = Date.now()
                    console.log(`[${PONTO3 - PONTO2}] PONTO 3 - Verificação de campo Título`)

                    let dataInput = taskDate.split("/")
                    let day = Number(dataInput[0])
                    let month = Number(dataInput[1]) - 1

                    let formattedDate = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
                    var date = new Date(formattedDate)
                    date.setMonth(month)
                    date.setDate(day)
                    date.setHours(0)
                    date.setMinutes(0)
                    date.setSeconds(0)
                    date.setMilliseconds(0)

                    var minhaData = new Date(date);
                    var PONTO4 = Date.now()
                    console.log(`[${PONTO4 - PONTO3}] PONTO 4 - Formatação de Data`)

                    if (isNaN(minhaData)) {
                        setLoading(false)
                        Alert.alert("Formato de data inválido!", "ATENÇÃO! No campo 'Data' preencha no seguinte formato: dia/mês\nExemplos:\n- 13/05\n- 31/12\n- 01/01\n- 31/01\n- 01/12")
                        return
                    }
                    var PONTO5 = Date.now()
                    console.log(`[${PONTO5 - PONTO4}] PONTO 5 - Verificação da formatação da Data`)

                    let data = {
                        title: taskTitle,
                        description: taskDescription,
                        type: checked,
                        date: date.getTime(),
                        turma: userData.turma || ""
                    }
                    var PONTO6 = Date.now()
                    console.log(`[${PONTO6 - PONTO5}] PONTO 6 - Montagem do objeto para API`)

                    var PONTO7 = Date.now()
                    console.log(`[${PONTO7 - PONTO6}] PONTO 7 - Enviando requisição para API...`)
                    axios({
                        method: "post",
                        url: appData.api.url + "/tasks",
                        data: data
                    }).then(async respo => {
                        var PONTO8 = Date.now()
                        console.log(`[${PONTO8 - PONTO7}] PONTO 8 - Resposta recebida da API!`)
                        let response = respo.data
                        if (respo.status === 200) {

                            Alert.alert("Tarefa criada com sucesso!", `Sua tarefa ${response.type} que é ${response.title} na data de ${taskDate} com as seguintes observações: ${response.description || "Nenhuma observação"}`)
                            var PONTO9 = Date.now()
                            console.log(`[${PONTO9 - PONTO8}] PONTO 9 - Avisando usuario sobre sucesso`)

                            //  Pegando todos os perfis dessa turma
                            let usersTurma = await (await axios.get(appData.api.url + "/users/several", { params: { turma: userData?.turma } })).data
                            var PONTO10 = Date.now()
                            console.log(`[${PONTO10 - PONTO9}] PONTO 10 - Pegando perfis da turma`)

                            //  Filtrando para apenas os que estão com a configuração "Avisar novas tarefas" ativada
                            let usersANotificar = usersTurma.filter(user => user.settings.pushTasksCreated === true)
                            var PONTO11 = Date.now()
                            console.log(`[${PONTO11 - PONTO10}] PONTO 11 - Filtrando os com a notificação ligada`)

                            //  Definindo mensagem
                            const headers = {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Authorization': `Basic ${appData.onesginal.authorization}`,
                            };
                            var PONTO12 = Date.now()
                            console.log(`[${PONTO12 - PONTO11}] PONTO 12 - Definindo a mensagem`)

                            let icon = ""
                            if (response.type == "Atividade") icon = "🔵"
                            if (response.type == "Trabalho") icon = "🟡"
                            if (response.type == "Prova") icon = "🔴"
                            if (response.type == "Outro") icon = "⚪"

                            //  Fazendo lista com idDevice desses usuarios
                            let listIDUsersSend = []

                            var PONTO13 = Date.now()
                            console.log(`[${PONTO13 - PONTO12}] PONTO 13 - Iniciando criação da lista desses usuarios...`)
                            usersANotificar.map(async (user, index) => {
                                let allDevices = (await axios.get(appData.api.url + "/devices")).data
                                let userDevice = allDevices.find(device => device.email === user.email)
                                listIDUsersSend.push(userDevice?.userId)

                                if (listIDUsersSend.length === usersANotificar.length) {
                                    var PONTO14 = Date.now()
                                    console.log(`[${PONTO14 - PONTO13}] PONTO 14 - Lista de usuarios criada!`)
                                    const data = {
                                        app_id: appData.onesginal.appId,
                                        include_player_ids: listIDUsersSend,
                                        headings: { "en": "Nova tarefa criada!" },
                                        contents: { "en": `${icon} - ${response.title}, marcada para o dia ${taskDate}, do tipo ${response.type} e com a seguinte descrição:\n${response.description || "Nenhuma descrição."}` },
                                    }
                                    var PONTO15 = Date.now()
                                    console.log(`[${PONTO15 - PONTO14}] PONTO 15 - Enviando notificações...`)
                                    axios.post('https://onesignal.com/api/v1/notifications', data, { headers })
                                        .then((respon) => {
                                            var PONTO16 = Date.now()
                                            console.log(`[${PONTO16 - PONTO15}] PONTO 16 - Notificações enviadas!`)
                                            var PONTOfinal = Date.now()
                                            console.log(`[TOTAL: ${PONTOfinal - PONTOinicial}] PONTO FINAL ========================`)
                                        })
                                        //.catch((error) => console.error('Erro ao enviar notificação:', error.message))
                                }
                            })
                        }

                        if (respo.status !== 200) {
                            Alert.alert("Ocorreu um erro ao registrar a tarefa!", "Tente novamente, se persistir o erro, reporte ao desenvolvedor.", [
                                { text: "Ver mais", style: "default", onPress: () => Alert.alert("Erro:", JSON.stringify(respo?.erro)) },
                                { text: "Fechar", style: "cancel" }
                            ])
                        }
                        setLoading(false)
                        var PONTO17 = Date.now()
                        console.log(`[${PONTO17 - PONTO16}] PONTO 17 - Desligando Loading`)
                    }).catch(err => {
                        Alert.alert("Ocorreu um erro ao registrar a tarefa!", "Tente novamente, se persistir o erro, reporte ao desenvolvedor.", [
                            { text: "Ver mais", style: "default", onPress: () => Alert.alert("Erro:", JSON.stringify(err)) },
                            { text: "Fechar", style: "cancel" }
                        ])
                        setLoading(false)
                    })


                }} >
                    <Text style={style.textSave}>Salvar</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )
}