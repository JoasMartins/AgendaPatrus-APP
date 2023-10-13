import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView, Alert } from "react-native"
import style from "./style.js"
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AppData from "../../../appData.json"
import { RadioButton } from "react-native-paper";

export function RegisterPage() {
    const Navigation = useNavigation()

    const [checked, setChecked] = useState("")
    const [isVisiblePassoword, setIsVisiblePassoword] = useState(true)

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleRegister(dataUser) {

        if (!fullname) return Alert.alert("Dados incompletos!", "Preencha o campo Nome Completo e tente novamente.")
        if (!email) return Alert.alert("Dados incompletos!", "Preencha o campo Email e tente novamente.")
        if (!password) return Alert.alert("Dados incompletos!", "Preencha o campo Senha e tente novamente.")
        if (!checked) return Alert.alert("Dados incompletos!", "Selecione a Turma e tente novamente.")

        let findEMAIL = await axios.get(AppData.api.url + '/users', {
            params: {
                email
            }
        })

        let findFULLNAME = await axios.get(AppData.api.url + "/users", {
            params: {
                fullname
            }
        })

        if (findEMAIL.data || findFULLNAME.data) {
            Alert.alert(
                "Já existe uma conta com esse email ou nome!",
                "",
                [
                    {
                        text: "Ir para Login",
                        onPress: () => {
                            Navigation.reset({
                                index: 0,
                                routes: [{ name: 'Profile' }],
                            })
                            Navigation.navigate("Login", {
                                from: "Register",
                                userData: dataUser
                            })
                        },
                        style: "cancel"
                    },
                    {
                        text: "Fechar",
                        onPress: () => { },
                        style: "cancel"
                    }
                ]
            )
        } else {
            let passwordCrypto = await axios.post(AppData.api.url+"/crypto", { crypto: password })
            let passwordCryptoSave = passwordCrypto.data.cryptoString

            await axios.post(AppData.api.url + '/users', {
                params: {
                    fullname,
                    email,
                    password: passwordCryptoSave,
                    turma: checked
                }
            })
                .then((resp) => {
                    Alert.alert(
                        "Sua conta foi criada com sucesso!",
                        `Olá ${fullname}, é bom te ver aqui. Sua conta já foi criada, agora clique no botão para ir até a página de login para que você possa entrar nela.`,
                        [
                            {
                                text: "Ir para Login",
                                onPress: () => {
                                    Navigation.navigate("Login", {
                                        from: "Register",
                                        userData: dataUser
                                    })
                                },
                                style: "cancel"
                            },
                            {
                                text: "Fechar",
                                onPress: () => { },
                                style: "cancel"
                            }
                        ]
                    )
                })

        }
    }

    return (
        <ScrollView style={style.container}>
            <View style={style.header}>
                <TouchableOpacity style={style.headerTouch} onPress={() => {
                    Navigation.goBack()
                }}>
                    <Image style={style.headerIcons} source={require("../../assets/icons/back.png")} />
                </TouchableOpacity>
                <Text style={style.headerTexts}>Registro</Text>
            </View>

            <View style={style.main}>
                <View style={style.alert}>
                    <View style={style.alertTitle}>
                        <Image style={style.alertTitle_icon} source={require("../../assets/icons/alert.png")} />
                        <Text style={style.alertTitle_text}>Info!</Text>
                    </View>

                    <Text style={style.alertMessage}>
                        Esse aplicativo utiliza o sistema de criptografia de padrão CHA256, CHA512 ou AES.
                    </Text>
                </View>

                <View style={style.formItem}>
                    <Text style={style.textItem}>Nome completo:</Text>
                    <TextInput style={style.inputItem} textContentType="name" onChangeText={(text) => setFullname(text)} />
                </View>
                <View style={style.formItem}>
                    <Text style={style.textItem}>Email:</Text>
                    <TextInput style={style.inputItem} textContentType="emailAddress" keyboardType="email-address" onChangeText={(text) => setEmail(text)} />
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

                <View style={style.formItem}>
                    <Text style={style.textItem}>Turma:</Text>

                    <View style={style.areaYears}>
                        <View style={style.areaYear}>
                            <Text style={style.textYear}>1° Ano</Text>
                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="1MA"
                                    status={checked === "1MA" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("1MA")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>1MA</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="1MB"
                                    status={checked === "1MB" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("1MB")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>1MB</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="1MC"
                                    status={checked === "1MC" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("1MC")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>1MC</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="1MD"
                                    status={checked === "1MD" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("1MD")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>1MD</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="1ME"
                                    status={checked === "1ME" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("1ME")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>1ME</Text>
                            </View>
                        </View>

                        <View style={style.areaYear}>
                            <Text style={style.textYear}>2° Ano</Text>
                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="2MA"
                                    status={checked === "2MA" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("2MA")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>2MA</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="2MB"
                                    status={checked === "2MB" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("2MB")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>2MB</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="2MC"
                                    status={checked === "2MC" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("2MC")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>2MC</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="2MD"
                                    status={checked === "2MD" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("2MD")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>2MD</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="2ME"
                                    status={checked === "2ME" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("2ME")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>2ME</Text>
                            </View>
                        </View>

                        <View style={style.areaYear}>
                            <Text style={style.textYear}>3° Ano</Text>
                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="3MA"
                                    status={checked === "3MA" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("3MA")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>3MA</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="3MB"
                                    status={checked === "3MB" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("3MB")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>3MB</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="3MC"
                                    status={checked === "3MC" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("3MC")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>3MC</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="3MD"
                                    status={checked === "3MD" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("3MD")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>3MD</Text>
                            </View>

                            <View style={style.areaSingleYear}>
                                <RadioButton
                                    value="3ME"
                                    status={checked === "3ME" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("3ME")}
                                    color="#4273ff"
                                />
                                <Text style={style.textInputRadio}>3ME</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={style.buttonEnter} onPress={() => handleRegister({ fullname, email, password })}>
                    <Text style={style.textButton}>Criar conta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}