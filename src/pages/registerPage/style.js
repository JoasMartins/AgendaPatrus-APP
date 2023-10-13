import {StyleSheet} from "react-native"

const style = StyleSheet.create({
    container: {
        backgroundColor: "#292929",
        flex: 1,
    },
    header: {
        backgroundColor: "#23347C",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
    headerTexts: {
        color: "white",
        fontSize: 28,
        textAlign: "center",
        fontWeight: "bold"
    },
    headerIcons: {
        height: 25,
        width:  25,
    },
    headerTouch: {
        marginLeft: 10,
        position: "absolute",
        left: 0
    },



    main: {
        justifyContent: "center",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
        paddingBottom: 30
    },
    formItem: {
        marginTop: 0,
        marginBottom: 20
    },
    inputItem: {
        borderBottomColor: "#8492A6",
        borderBottomWidth: 1,
        color: "#fff",
        fontSize: 18,
        top: 4,
    },
    textItem: {
        color: "#8492A6",
        fontSize: 22,
        fontWeight: "bold"
    },
    buttonEnter: {
        height: 40,
        backgroundColor: "#073ace",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 30
    },
    textButton: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },

    areaYears: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    areaYear: {
        alignItems: "center"
    },
    textYear: {
        borderBottomColor: "#8492A6",
        borderBottomWidth: 1,
        color: "#abbdd6",
        fontWeight: "bold",
        fontSize: 18,
        height: 25,
        marginBottom: 10,
        marginTop: 15,
    },
    areaSingleYear: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: -6,
    },
    textInputRadio: {
        color: "#c1d7f5"
    },



    alert: {
        backgroundColor: "#7d96ff",
        padding: 20,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 15,
        borderColor: "#073ace",
        borderWidth: 3,
        marginBottom: 20
    },
    alertTitle: {
        flexDirection: "row",
        alignItems: "center"
    },
    alertTitle_icon: {
        width: 25,
        height: 25,
    },
    alertTitle_text: {
        fontSize: 22,
        color: "#111C49",
        left: 5,

    },
    alertMessage: {
        color: "#111C49",
        fontSize: 15
    },
    areaInputPassword: {
    },
    iconShowPassword: {
        height: 35,
        width: 35,
        backgroundColor: "#292929",
    },
    areaIconShowP: {
        position: "absolute",
        right: 0,
        
    }
})

export default style