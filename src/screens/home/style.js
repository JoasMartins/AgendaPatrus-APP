import { StyleSheet } from "react-native"

const style = StyleSheet.create({
    container: {
        backgroundColor: "#292929",
        flex: 1,

    },
    areaMain: {
        padding: 0,
    },
    title: {
        color: "white"
    },
    titleSections: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        left: 10
    },
    line: {
        height: 2,
        width: "90%",
        backgroundColor: "#4d4d4d",
        marginTop: 10,
        marginBottom: 20
    },
    viewLine: {
        justifyContent: "center",
        alignItems: "center"
    },

    
    buttonIcon: {
        paddingRight: 25,
        height: 25,
        width: 25,
    },
    areaActions: {
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "space-around",
        paddingTop: 5,
        paddingBottom: 5,
    },
    buttonAction: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#4071ff",
        borderRadius: 10,
        width: "45%",
        padding: 10,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#fff",
    }
})

export default style