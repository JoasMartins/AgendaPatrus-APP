import {StyleSheet} from "react-native"

const style = StyleSheet.create({
    container: {
        backgroundColor: "#292929",
        flex: 1,
        justifyContent: "space-between",
    },
    containerTop: {
        
    },



    header: {
        backgroundColor: "#23347C",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50
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
        position: "absolute",
        left: 10
    },
    header_areaIcons: {
        flexDirection: "row",
        position: "absolute",
        right: 10,
        justifyContent: "space-between"
    },
    actionsIcons: {
        height: 25,
        width: 25,
        marginLeft: 4,
        marginRight: 4,
        opacity: 0.75
    },



    main: {
        margin: 20,
    },
    main_areaItem: {
        marginBottom: 20
    },
    main_areaValues: {
        flexDirection: "row",
    },
    main_textTitleItem: {
        color: "#8492A6",
        fontSize: 22,
        fontWeight: "bold"
    },
    main_areaValueItem: {
        backgroundColor: "#1f1f1f",
        borderRadius: 10,
        width: "85%",
        marginRight: 15,
    },
    main_areaValueItemDescription: {
        backgroundColor: "#1f1f1f",
        borderRadius: 10,
        width: "85%",
        height: 200,
        marginRight: 15
    },
    main_textValueItem: {
        color: "#BBBBBB",
        padding: 10,
        fontSize: 16,
        textAlignVertical: "top",
    },
    main_areaCopy: {
        backgroundColor: "#404040",
        padding: 9,
        fontSize: 16,
        borderRadius: 7.5,
        height: 45,
        width: 45
    },
    main_copyIcon: {
        height: 25,
        width: 25,
        opacity: 0.7
    },
    main_areaDateAndType: {
        flexDirection: "row",
    },
    main_areaDT: {
        marginRight: 20
    },
    main_areaValueDT: {
        backgroundColor: "#1f1f1f",
        borderRadius: 10,
        minWidth: "45%",
        paddingLeft: 7.5
    },
    main_semiAreaValueDT: {
        flexDirection: "row"
    },
    main_areaValueDT2:{
        backgroundColor: "#1f1f1f",
        borderRadius: 10,
        minWidth: "45%",
        paddingLeft: 7.5,
        alignItems: "center",
        flexDirection: "row"
    },
    buttonSave: {
        backgroundColor: "#073ace",
        borderRadius: 5,
        padding: 10,
        marginTop: 20
    },
    textSave: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },

    footer: {
        bottom: 5,
    },
    footer_text1: {
        color: "#BBBBBB",
        left: 7.5
    },
    footer_detaque: {
        color: "#FFF",
        fontWeight: "bold"
    }
})

export default style