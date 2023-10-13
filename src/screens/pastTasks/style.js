import {StyleSheet} from "react-native"

const style = StyleSheet.create({
    container: {
        backgroundColor: "#292929",
        flex: 1,
    },
    title: {
        color: "white"
    },
    titleSections: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: 10
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
    arrowSections: {
        color: "#fff"
    },
    headerSections: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 25,
        alignItems: "center"
    },
    iconArrow: {
        height: 22,
        width: 20
    },


    buttonIcon: {
        height: 25,
        width: 25,
    },
    buttonAction: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#4071ff",
        borderRadius: 10,
        width: "45%",
        padding: 10,
        left: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#fff",
    }
})

export default style