import { StyleSheet } from "react-native"

const style = StyleSheet.create({
    container: {
        backgroundColor: "#292929",
        flex: 1,
    },
    title: {
        color: "white"
    },
    separatorVert: {
        width: 2,
        height: '100%',
        backgroundColor: '#7d9eff',
        marginVertical: 10,
        left: -1,
        borderRadius: 100
    },
    separatorHori: {
        width: "100%",
        height: 2,
        backgroundColor: '#383838',
        marginVertical: 10,
        borderRadius: 100
    },

    user_area: {
        padding: 20,
        alignItems: "center",
    },
    user_image: {
        borderRadius: 100,
        marginBottom: 10,
    },
    user_nameText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "center"

    },
    user_emailText: {
        color: "#b3b3b3",
        fontSize: 15,
        textAlign: "center"

    },
    user_areaClassAndId: {
        backgroundColor: "#6e6e6e",
        padding: 5,
        flexDirection: "row",
        borderRadius: 7.5,
        marginTop: 5,
        justifyContent: "space-between",
    },
    user_areaCI: {
        flexDirection: "row",
        paddingLeft: 7.5,
        paddingRight: 7.5,
    },
    user_keyText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 11,
    },
    user_valueText: {
        color: "#d9d9d9",
        paddingLeft: 5,
        fontSize: 11,
    },
    user_iconLogout: {
        position: "absolute",
        right: 20,
        backgroundColor: "#4071ff",
        padding: 7.5,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    user_iconLogoutImage:{
        width: 25,
        height: 25,
    },



    task_modal: {
        backgroundColor: "#4071ff",
        margin: 15,
        padding: 10,
        borderRadius: 10,
    },
    task_area: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    task_areaItem: {
        justifyContent: "center", 
        alignItems: "center"
    },
    task_areaTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 28,
        marginTop: -5,
        marginBottom: 5,
        textAlign: "center",
    },
    task_titleItem: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15
    },
    task_valueItem: {
        color: "#d9d9d9"
    },



    notification_area: {
        margin: 15,
        bottom: 20
    },
    notification_areaTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 28,
        paddingLeft: 20,
        marginBottom: 10,
    },
    notification_areaItem: {
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 2.5,
        marginTop: 2.5
    },
    notification_textItem: {
        color: "#d9d9d9",
        fontSize: 15,
        paddingLeft: 5
    }
})

export default style