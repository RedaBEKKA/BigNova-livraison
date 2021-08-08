import { StyleSheet, Dimensions } from 'react-native';;

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    titleH1: {
        fontSize: 26,
        color: "#fff",
        fontWeight: 'bold',
        marginLeft: 1,

    },
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: '#087',
        alignSelf: 'center',
        justifyContent: 'center'

    },
    ButtonScondary: {
        width: "70%",
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent:'center',
        alignItems: 'center',
        borderColor: '#078',
        borderWidth: 1,
        height: 50,
        marginVertical:10,
        alignSelf: 'center',
        

    },
    containerTimer: {
        marginTop: 20,

    },
    containerMsg: {
        padding: 10,
        backgroundColor: '#000'
    },

    containerM: {
        padding: 20,
        flexDirection: "row",
        justifyContent: 'space-evenly'
    },
    containerV: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },

    containerHeader: {
        backgroundColor: '#fff',
        position:'absolute',
        zIndex:2,left:10,
        top:10
    },
    titleH3: {
        fontSize: 24,
        color: "#000",
        padding: 5,
        fontWeight: '700'
    },
    titleH3s: {
        fontSize: 24,
        color: "#fff",
        padding: 5,
        fontWeight: '700'
    },
    titleH2: {
        fontSize: 18,
        color: "#ccc",
        textAlign: 'center',
    },
    titleH4: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 'bold',

    },
    titleH4s: {
        fontSize: 19,
        color: "#000",
        fontWeight: 'bold',
    },
    titleH5: {
        fontSize: 23,
        color: "#000",
        textAlign: 'center',
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 20,
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 11,
    },

    btnTitle: {
        fontSize: 20,
        color: "#fff",
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'

    },
    ButtonText: {
        fontSize: 25,
        color: "#087",
        fontWeight: 'bold',
       
    },

    containerLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 310,
        margin: 10,
    },
    containerLineOne: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 310,
        margin: 10,
        color: '#087'

    },

    time: {
        fontSize: 25,
        color: "#fff",
        marginBottom: 30,
        textAlign: "center",
    },
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: '#087',
        alignSelf: 'center',
        justifyContent: 'center',


    },

    containerH: {
        alignItems: "center",
        justifyContent: "center",

    },
})