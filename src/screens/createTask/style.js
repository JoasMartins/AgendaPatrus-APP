import {StyleSheet} from "react-native"

const style = StyleSheet.create({
    container: {
        backgroundColor: "#292929",
        flex: 1,
    },
    page: {
        paddingLeft: 18,
        paddingRight: 18,
    },
    areaTitle: {
        //  backgroundColor: "red",
        paddingBottom: 20
    },
    textTitle: {
        color: "#8492A6",
        fontSize: 22,
        fontWeight: "bold"
    },
    inputTitle: {
        borderBottomColor: "#8492A6",
        borderBottomWidth: 1,
        color: "#fff",
        fontSize: 19,
        top: 4,
    },
    inputBig: {
        borderBottomColor: "#8492A6",
        borderBottomWidth: 1,
        color: "#fff",
        fontSize: 19,
        minHeight: 200,
        maxHeight: 300,
        top: 4,
        textAlignVertical: "top",
        backgroundColor: "rgba(132, 146, 166, 0.3)",
        
    },
    inputRadio: {
        flexDirection: "row",
        alignItems: "center"
    },
    textInputRadio: {
        color: "#C3C3C3",
        fontSize: 16
    },
    buttonSave: {
        backgroundColor: "#073ace",
        borderRadius: 5,
        padding: 10,
        width: "30%"
    },
    textSave: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default style