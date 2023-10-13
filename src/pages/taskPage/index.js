import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, Share, Alert, TextInput, ScrollView, ToastAndroid } from "react-native"
import style from "./style"
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AppData from "../../../appData.json"
import { RadioButton } from "react-native-paper";

import { LoadingPage } from "../loadingPage";

export function TaskPage(params) {
    const [dataTask, setDataTask] = useState(params?.route?.params)
    let Navigation = useNavigation()

    const [formatDateEdit, setFormatDateEdit] = useState("")
    const [formatDate, setFormatDate] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let date = new Date(dataTask.date)
        let dateDay = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        let dateMonth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
        var formatDate = `${dateDay}/${dateMonth}/${date.getFullYear()}`
        var formatDateEdit = `${dateDay}/${dateMonth}`
        setFormatDate(formatDate)
        setFormatDateEdit(formatDateEdit)
        setCampDate(formatDateEdit)

        if (dataTask.type === "Atividade") setColorTypeTask("#36c9ff") // 🔵
        if (dataTask.type === "Trabalho") setColorTypeTask("#ffd900") // 🟡
        if (dataTask.type === "Prova") setColorTypeTask("#ff0000")    // 🔴
    }, [dataTask])

    const [modoEdit, setModoEdit] = useState(false)

    const [title, setTitle] = useState(dataTask.title)
    const [description, setDescription] = useState(dataTask.description)
    const [typeTask, setTypeTask] = useState(dataTask.type)
    const [campDate, setCampDate] = useState("")
    const [colorTypeTask, setColorTypeTask] = useState("#fff")

    /*
    DADOS OBRIGATORIOS:
    - Title
    - Description
    - Type
    - Date limit

    DADOS DO FOOTER
    - Turma
    - Id Task
    */

    const handleShare = () => {
        let emojiType = "⚪"
        if (dataTask.type === "Atividade") emojiType = "🔵"
        if (dataTask.type === "Trabalho") emojiType = "🟡"
        if (dataTask.type === "Prova") emojiType = "🔴"

        let msg = `● Tarefa *${dataTask.title}*`
        if (dataTask.description != "") {
            msg = msg + `\n● *Observações:*\n${dataTask.description}`
        }
        msg = msg + `\n\n➥ *Tarefa do tipo:*\n[${emojiType}] ${dataTask.type}`
        msg = msg + `\n➥ *Para o dia*\n${formatDate}`
        msg = msg + `\n➥ *Turma*:\n${dataTask.turma}`

        Share.share({ message: msg })
    }

    const handleEdit = () => {
        setModoEdit(true)
    }

    const handleSaveEdit = () => {
        setLoading(true)

        if (!title) {
            Alert.alert("Formulário incompleto!", "É necessário preencher o campo 'Título'", [
                { text: "Fechar", style: "cancel" },
            ])
            return
        }

        let dataInput = campDate.split("/")
        let day = Number(dataInput[0])
        let month = Number(dataInput[1]) - 1

        var date = new Date()
        date.setMonth(month)
        date.setDate(day)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)

        var minhaData = new Date(date);

        if (isNaN(minhaData)) {
            Alert.alert("Formato de data inválido!", "ATENÇÃO! No campo 'Data' preencha no seguinte formato: dia/mês\nExemplos:\n- 13/05\n- 31/12\n- 01/01\n- 31/01\n- 01/12")
            return
        }

        /*
        newDataTask.title = title
        newDataTask.description = description
        newDataTask.date = minhaData.getTime()
        newDataTask.type = typeTask
        */

        let newData = {
            title: title,
            description: description,
            type: typeTask,
            date: minhaData.getTime(),
            turma: dataTask.turma,
            id: dataTask.id,
            _id: dataTask._id
        }


        // Os dados de NewData que deveriam seros novos dados para enviar pra API, está com os dados antigos

        setDataTask(newData)

        axios.put(AppData.api.url + "/tasks", { params: newData })
            .then((result) => {
                setLoading(false)
                setModoEdit(false)
                ToastAndroid.show("Alteração realizada com sucesso!", 5000)
            })
            .catch((err) => {
                setLoading(false)
                console.error(err)
                Alert.alert("Ocorreu um erro!")
            })

        
    }

    const handleDelete = () => {
        Alert.alert(
            "Quer mesmo excluir essa tarefa?",
            `Essa ação irá apagar a tarefa ${dataTask.title}. Essa ação é irreversível!`,
            [
                {
                    text: "Sim, excluir",
                    onPress: () => {
                        axios.delete(AppData.api.url + "/tasks", { params: { id: dataTask.id } })
                            .then((result) => {
                                Alert.alert("Tarefa apagada com suceso!", "")
                                Navigation.goBack()
                            })
                            .catch((err) => {
                                console.error(err)
                                Alert.alert("Ocorreu um erro ao excluir a tarefa", "")
                            })
                    }
                },
                {
                    text: "Não, cancelar"
                }
            ]
        )
    }

    const handleCopy = (item) => {
        if (item === "title") Share.share({ message: dataTask.title })
        if (item === "description") Share.share({ message: dataTask.description })
    }

    return (
        <View style={style.container}>
            <LoadingPage visible={loading} />
            <ScrollView>
                <View style={style.containerTop}>
                    <View style={style.header} >

                        <TouchableOpacity style={style.headerTouch} onPress={() => {
                            Navigation.goBack()
                        }}>
                            <Image style={style.headerIcons} source={require("../../assets/icons/back.png")} />
                        </TouchableOpacity>

                        <Text style={style.headerTexts}>Tarefa</Text>

                        <View style={style.header_areaIcons}>
                            <TouchableOpacity onPress={handleShare}>
                                <Image style={style.actionsIcons} source={require("../../assets/icons/share.png")} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleEdit}>
                                <Image style={style.actionsIcons} source={require("../../assets/icons/edit.png")} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDelete}>
                                <Image style={style.actionsIcons} source={require("../../assets/icons/trash.png")} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={style.main}>

                        <View style={style.main_areaItem}>
                            <Text style={style.main_textTitleItem}>Título:</Text>
                            <View style={style.main_areaValues}>
                                <ScrollView style={style.main_areaValueItem}>
                                    {modoEdit
                                        ?
                                        (<TextInput style={style.main_textValueItem} onChangeText={(text) => setTitle(text)}>{dataTask.title}</TextInput>)
                                        :
                                        (<Text style={style.main_textValueItem}>{dataTask.title}</Text>)
                                    }
                                </ScrollView>
                                <TouchableOpacity style={style.main_areaCopy} onPress={() => handleCopy("title")}>
                                    <Image style={style.main_copyIcon} source={require("../../assets/icons/copy-outline.png")} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={style.main_areaItem}>
                            <Text style={style.main_textTitleItem}>Descrição:</Text>
                            <View style={style.main_areaValues}>
                                <ScrollView style={style.main_areaValueItemDescription}>
                                    {
                                        modoEdit
                                            ?
                                            <TextInput style={style.main_textValueItem} onChangeText={(text) => setDescription(text)} multiline={true} numberOfLines={10}>{dataTask.description}</TextInput>
                                            :
                                            <Text style={style.main_textValueItem}>{dataTask.description}</Text>
                                    }
                                </ScrollView>
                                <TouchableOpacity style={style.main_areaCopy} onPress={() => handleCopy("description")}>
                                    <Image style={style.main_copyIcon} source={require("../../assets/icons/copy-outline.png")} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={style.main_areaDateAndType}>
                            <View style={style.main_areaDT}>
                                <Text style={style.main_textTitleItem}>Data:</Text>
                                <View style={style.main_areaValueDT}>
                                    {
                                        modoEdit
                                            ?
                                            <TextInput style={style.main_textValueItem} onChangeText={(text) => setCampDate(text)}>{formatDateEdit}</TextInput>
                                            :
                                            <Text style={style.main_textValueItem}>{formatDate}</Text>
                                    }
                                </View>
                                {
                                    modoEdit
                                        ?
                                        (<TouchableOpacity style={style.buttonSave} onPress={handleSaveEdit}>
                                            <Text style={style.textSave}>Salvar</Text>
                                        </TouchableOpacity>)
                                        :
                                        <View />
                                }
                            </View>
                            <View style={style.main_areaDT}>
                                <Text style={style.main_textTitleItem}>Tipo:</Text>
                                {
                                    modoEdit
                                        ?
                                        <View style={style.main_areaValueDT}>
                                            <View style={style.main_semiAreaValueDT}>
                                                <RadioButton
                                                    value="Atividade"
                                                    status={typeTask === "Atividade" ? "checked" : "unchecked"}
                                                    onPress={() => setTypeTask("Atividade")}
                                                    color="#36c9ff"
                                                />
                                                <Text style={style.main_textValueItem}>Atividade</Text>
                                            </View>
                                            <View style={style.main_semiAreaValueDT}>
                                                <RadioButton
                                                    value="Trabalho"
                                                    status={typeTask === "Trabalho" ? "checked" : "unchecked"}
                                                    onPress={() => setTypeTask("Trabalho")}
                                                    color="#ffd900"
                                                />
                                                <Text style={style.main_textValueItem}>Trabalho</Text>
                                            </View>

                                            <View style={style.main_semiAreaValueDT}>
                                                <RadioButton
                                                    value="Prova"
                                                    status={typeTask === "Prova" ? "checked" : "unchecked"}
                                                    onPress={() => setTypeTask("Prova")}
                                                    color="#ff0000"
                                                />
                                                <Text style={style.main_textValueItem}>Prova</Text>
                                            </View>
                                            <View style={style.main_semiAreaValueDT}>
                                                <RadioButton
                                                    value="Outro"
                                                    status={typeTask === "Outro" ? "checked" : "unchecked"}
                                                    onPress={() => setTypeTask("Outro")}
                                                    color="#fff"
                                                />
                                                <Text style={style.main_textValueItem}>Outro</Text>
                                            </View>
                                        </View>
                                        :
                                        <View style={style.main_areaValueDT2}>
                                            <View style={{ backgroundColor: colorTypeTask, height: 15, width: 15, borderRadius: 100 }} />
                                            <Text style={style.main_textValueItem}>{dataTask.type}</Text>
                                        </View>
                                }
                            </View>
                        </View>
                    </View>
                </View>

                <View style={style.footer}>
                    <Text style={style.footer_text1}>Id: <Text style={style.footer_detaque}>{dataTask.turma}.{dataTask.id}</Text></Text>
                </View>
            </ScrollView>
        </View>
    )
}