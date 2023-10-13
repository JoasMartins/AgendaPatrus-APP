import {StyleSheet} from "react-native"

const style = StyleSheet.create({
    container: { //todo o campo
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 18,
        paddingRight: 18,
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10,
    },
    areaTask: {// View quem engloba Checkbox e TarefaTitle
        flexDirection: "row",
        position: "relative"
    },
    textTask: {// Titulo da tarefa
        color: "#fff",
        fontSize: 20,
        left: 10,
        overflow: "hidden",
        maxHeight: 30,
        width: "85%",
        
    },
    areaArrow: {// só area da imagem arrow e o EM UM DIA
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 0,
    },
    arrow: {// elemento da imagem arrow
        height: 35,
        width: 35,
        //position: "relati",
    },
    textDaysScore: {// exemplo: Em 1 dia
        color: "#fff",
        fontSize: 12,
        textAlign: "right",
        backgroundColor: "#292929",
        padding: 8,
        paddingLeft: 15,
    },
    checkbox: {// caixa de marcação
        height: 30,
        width: 30,
        opacity: 0.6
    }
})

export default style