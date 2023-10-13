import { StyleSheet } from "react-native"

const style = StyleSheet.create({
    area: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
    },
    logo: {
        height: 53,
        width: 50,
    },
    areaLogo: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 20,
    },
    title: {
        color: "#ACACAC",
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 15,
    },
    line: {
        height: 2,
        width: "90%",
        backgroundColor: "#4d4d4d",
        marginTop: 10,
    },
    viewLine: {
        justifyContent: "center",
        alignItems: "center",
    }
})

export default style