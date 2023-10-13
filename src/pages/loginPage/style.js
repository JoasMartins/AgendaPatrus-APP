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