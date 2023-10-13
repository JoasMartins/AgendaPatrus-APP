import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"
import style from "./style"
import { useNavigation } from "@react-navigation/native";

export function LoginOrRegisterPage() {

    const Navigation = useNavigation()

    return (
        <SafeAreaView style={style.container}>
            <View style={style.header}>
                <Text style={style.header_textTitle}>Olá, bem vindo(a) ao AgendaPatrus!</Text>
                <Text style={style.header_textSubTitle}>O aplicativo para organizar seus estudos da Escola E. Sebastião Patrus de Souza</Text>
            </View>

            <View style={style.main}>
                <Text style={style.main_textInfo}>Primeiramente é necessário entrar na sua conta para carregar seus dados</Text>
                <TouchableOpacity style={style.main_buttonLogin} onPress={() => {
                    Navigation.navigate("Login")
                }}>
                    <Text style={style.main_textButton}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.main_buttonRegister} onPress={() => {
                    Navigation.navigate("Register")
                }}>
                    <Text style={style.main_textButton}>Registrar-se</Text>
                </TouchableOpacity>
            </View>

            <View style={style.footer}>
                <Text style={style.footer_text1}>Esse é um aplicativo não oficial da escola</Text>
                <Text style={style.footer_text2}>Desenvolvido por <Text style={style.footer_textDestaque}>Joás M. C.</Text> da turma <Text style={style.footer_textDestaque}>2MB</Text></Text>
            </View>
        </SafeAreaView>
    )
}