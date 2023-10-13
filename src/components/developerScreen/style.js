import {StyleSheet} from "react-native"

const style = StyleSheet.create({
    container: {
        backgroundColor: "#292929",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: "white"
    },

    main_area: { 
        alignItems: "center",
    },
    main_image: {
        height: 200,
        width: 200
    },
    main_titleText: {
        color: "#8492A6",
        fontSize: 44,
        fontWeight: "bold",
        textAlign: "center"
    },
    main_areaInfos: {
        justifyContent: "center",
        alignItems: "center",
        margin: 40
    },
    main_text1: {
        textAlign: "center",
        color: "#808080",
        fontSize: 16
    },
    main_text2: {
        textAlign: "center",
        color: "#5c5c5c"
    }
})

export default style