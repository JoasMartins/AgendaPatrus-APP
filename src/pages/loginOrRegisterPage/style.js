import {StyleSheet} from "react-native"

const style = StyleSheet.create({
    container: {
        backgroundColor: "#292929",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },

    



    header: {
        margin: 25,
        paddingTop: 20,
    },
    header_textTitle: {
        fontSize: 32,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    header_textSubTitle: {
        fontSize: 17,
        color: "#acacac",
        textAlign: "center"
    },


    main: {
        margin: 25,
    },
    main_textInfo: {
        fontSize: 15,
        color: "#acacac",
        textAlign: "center",
        padding: 5,
    },
    main_buttonLogin: {
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#073ace",
        padding: 10,
        borderRadius: 10,
        margin: 20,
    },
    main_buttonRegister: {
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#23347C",
        padding: 10,
        borderRadius: 10,
        margin: 20,
    },
    main_textButton: {
        color: "#fff"
    },
    

    footer: {
        margin: 25,
        marginBottom: 60,
    },
    footer_text1: {
        color: "#acacac",
        textAlign: "center",
    },
    footer_text2: {
        color: "#acacac",
        textAlign: "center",
    },
    footer_textDestaque: {
        color: "#4071ff"
    }


})

export default style