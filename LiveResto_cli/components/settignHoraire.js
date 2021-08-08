import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import ModeleOpen from './model'
import ModeleClosed from './modelClosed';
import ModelContainer from './ModelContainer';
import CountDownTime from './countDown';
import TimerLine from './timerLine';
import { AuthContext, DataContext, ShowDataOpen } from './context'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    TextInput,
    ScrollView
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const HoraireSetting = ({ navigation: { goBack }, navigation }) => {
    const [Switched, setSwitch] = useState(false)
    const [visible, setVisible] = useState(false)
    const [ferme, setFerme] = useState(false)
    const [btn, setBtn] = useState(true)
    const [msg, setMsg] = useState('Votre restaurant est fermé')
    const [heur, setHeur] = useState("N'oublier pas d'ouvrir a 11:00")
    const [order, setOrder] = useState(' Orders Comes when Restaurant Is Open')
    const [isEnabled, setIsEnabled] = useState(false);
    const [debutj, setDate] = useState(new Date())
    const openData = useContext(ShowDataOpen)
    const { toggleOpen } = React.useContext(AuthContext)


    const [horaireData, setHoraireData] = React.useState({

        day: [{
            id: 1,
            jour: 'Dimanche',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        {
            id: 2,
            jour: 'Lundi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        {
            id: 3,
            jour: 'Mardi',
            debutj: '08:00',
            finj: '13:00',
            debuts: '15:00',
            fins: '22:00',

        },
        {
            id: 4,
            jour: 'Mercredi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        {
            id: 5,
            jour: 'Jeudi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '22:00',

        },
        {
            id: 6,
            jour: 'Vendredi',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            fins: '23:00',

        }
        ]

    });

    const DaysList = ({ days }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, margin: 10, backgroundColor: '#eee', paddingHorizontal: 20, width: '90%', alignSelf: 'center' }}>

                <Text style={{ fontSize: 17, fontWeight: 'bold', width: 93, padding: 2, alignSelf: 'center', justifyContent: 'center' }} > {days.jour} </Text>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('DetailsSetTime', days) }}
                    style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', width: 80, marginRight: 10 }}>
                        <Text> {days.debutj} |</Text>
                        <Text> {days.finj} </Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: 80, marginRight: 15 }}>
                        <Text> {days.debuts} |</Text>
                        <Text> {days.fins} </Text>
                    </View>
                    <Icon name="settings" color={'#078'} size={16} />

                </TouchableOpacity>





            </View>

        )
    }

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const setTime = (index) => {
        setVisible(true)
    }

    return (

        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' ,paddingHorizontal:10 }}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon name="arrow-undo-outline" color={'#fff'} size={40} />
                    </TouchableOpacity>
                    <View style={[ { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }]}>
                        <Text style={[ { fontSize: 25 , width:'80%' , color:'#fff',textAlign:'center'}]}> Paramètre Horaires d'ouverture</Text>
                        <Icon name="settings" color={'#fff'} size={30} />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, margin: 10, backgroundColor: '#ccc' }}>

                <Text style={{ fontSize: 17, fontWeight: 'bold' }} > les jours </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}> Debut  | </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}> Fin </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}> Debut  | </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}> Fin </Text>
                </View>
            </View>

            <View >
                <FlatList
                    data={horaireData.day}
                    renderItem={({ item, index }) => <DaysList days={item} />}
                />
            </View>



            <ModelContainer
                transparent
                visible={visible}
            >

                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.titleH5, { marginBottom: 15 }]}>
                        Choisissez L'heure
                    </Text>

                </View>
                <View style={{ justifyContent: 'center' }}>
                    <DatePicker
                        date={debutj}
                        mode="time"
                        onDateChange={setDate}
                        style={{ alignSelf: 'center', padding: 6 }}
                    />
                </View>
                <TouchableOpacity style={[styles.btnPiker, { alignSelf: 'flex-end' }]} onPress={() => { setVisible(false) }}>
                    <Text style={[{ textAlign: "center", fontSize: 18, fontWeight: 'bold', color: '#fff' }]}>
                        Modifier
                    </Text>
                </TouchableOpacity>


            </ModelContainer>



            {openData.btn ? (

<View style={styles.containerMsg}>
    <View style={[styles.containerM, {}]} >
        <Icon name="md-information-circle" color={'#087'} size={45} style={{ marginTop: 8, marginLeft: -25 }} />
        <View style={{ marginLeft: 6 }}>
            <Text style={[{ fontWeight: 'bold', color: '#000', fontSize: 18 }]}>{openData.msg}</Text>
            <Text style={[{ fontSize: 17, marginVertical: 5, color: '#000' }]}>{openData.heur} </Text>
        </View>
    </View>
    <TouchableOpacity style={[styles.btn, { marginVertical: 10, borderRadius: 25 }]} onPress={() => { toggleOpen() }}>
        <View>
            <Text style={[styles.titleH3, { fontSize: 23, textAlign: 'center', fontWeight: 'bold', }]}> Ouvrir Maintenent </Text>
        </View>
    </TouchableOpacity>


</View>

) :


<TouchableOpacity style={{ position: 'absolute', right: -1, bottom: 25, marginHorizontal: 20, height: 50, width: 50, backgroundColor: '#fff', borderColor: '#078', borderWidth: 1, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}
    onPress={() => { navigation.navigate('Home') }}
>
    <View >
        <Icon name="ios-home" color={'#078'} size={32} />
    </View>
</TouchableOpacity>

}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,



    },
    preferences: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: '600',
        paddingVertical: 12,
        paddingHorizontal: 16,
        color: '#fff',
        backgroundColor: '#9CA3AF',
        borderRadius: 26,
        marginTop: 15,
        width: '88%',
        alignSelf: 'center',

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

    }, btnScondary: {
        width: '80%',
        height: 45,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    containerTimer: {
        marginTop: 20,

    },
    containerV: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },

    containerTitle: {
        backgroundColor: '#087',
        width: "100%",
        height: 100,
        justifyContent: 'center'
    },
    titleH3: {
        fontSize: 17,
        color: "#fff",
        marginLeft: 13,


    },
    titleH2: {
        fontSize: 17,
        color: "#fff",
        textAlign: 'center',

    },
    titleH4: {
        fontSize: 20,
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold',

    }, titleH5: {
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
    container1: {
        width: '100%',
        height: 120,
        padding: 10,
    },
    btnTitle: {
        fontSize: 19,
        color: "#087",
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#087',
        width: '90%',
        alignSelf: 'center',
        height: 50,
        justifyContent: 'center'

    },
    containerTow: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000989',
        padding: 10,
        marginHorizontal: 10,

        margin: 10,
    },
    containerLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10

    },
    containerLineOne: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginHorizontal: 10,


    },
    containerH: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    time: {
        fontSize: 25,
        color: "#fff",
        marginBottom: 30,
        textAlign: "center",
    },
    btnPiker: {
        width: '40%',
        height: 43,
        backgroundColor: '#087',
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        borderRadius: 20,
        marginTop: 30,

    }, containerMsg: {

        position: "absolute",
        bottom: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginHorizontal: 6,
        backgroundColor: "#ccc"
  
    },
    containerM: {
        paddingHorizontal: 35,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: 'space-evenly'
    },
});
export default HoraireSetting;
