import React from "react";
import { View, Text, SafeAreaView } from "react-native"
import style from "./style"

import { LogoTitle } from "../../components/logoTitle";
import { DeveloperScreen } from "../../components/developerScreen";

export function Statistics() {
    return (
        <DeveloperScreen
        text={"Aqui estarão as estatísticas gerais como: o aluno com mais tarefas feitas, a turma com mais tarefas, etc..."}
        finish={"Setor ainda em desenvolvimento sem previsão para término."}
        />
    )
}

/*

Rank de Tarefas feitas
Melhor da sua turma:
Melhor do seu ano:
Melhor da escola:

        <SafeAreaView style={style.container}>
            {
                // <LogoTitle title={"Anotações"} />
            }

        </SafeAreaView>

*/