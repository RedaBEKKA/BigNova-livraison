import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem } from 'react-native-elements';
import { AuthContext, DataContext, ShowDataOpen } from './../components/context'

import {BluetoothManager,BluetoothEscposPrinter,BluetoothTscPrinter} from 'react-native-bluetooth-escpos-printer';

import ModeleOpen from './model'
import ModeleClosed from './modelClosed';
import ModelContainer from './ModelContainer';
import CountDownTime from './countDown';
import TimerLine from './timerLine';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    TextInput
} from 'react-native';









const Impression = ({ navigation: { goBack }, navigation }) => {
    const [Switched, setSwitch] = useState(false)
    const [visible, setVisible] = useState(false)
    const [ferme, setFerme] = useState(false)
    const [btn, setBtn] = useState(true)
    const [msg, setMsg] = useState('Votre restaurant est fermé')
    const [heur, setHeur] = useState("N'oublier pas d'ouvrir a 11:00")
    const [order, setOrder] = useState(' Orders Comes when Restaurant Is Open')
    const [isEnabled, setIsEnabled] = useState(false);
    const [debut, setDebut] = useState('10:00');
    const [fin, setFin] = useState('20:00');
    const openData = useContext(ShowDataOpen)
    const { toggleOpen } = React.useContext(AuthContext)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    _listeners = [];
    
    const [devices,setDevice] = useState(null)
    const [pairedDs,setPairedDs] = useState([])
    const [foundDs,setFoundDs] = useState([])
    const [bleOpend,setBleOpend] = useState(false)
    const [loading,setLoading] = useState(true)
    const [boundAddress,setBoundAddress] = useState('')
    const [debugMsg,setDebugMsg] = useState('')

    

    // useEffect(() => {

    //     //alert(BluetoothManager)
    //     BluetoothManager.isBluetoothEnabled().then((enabled)=> {
    //         setState({
    //             bleOpend: Boolean(enabled),
    //             loading: false
    //         })
    //     }, (err)=> {
    //         err
    //     });

    //     if (Platform.OS === 'ios') {
    //         let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
    //         _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
    //             (rsp)=> {
    //                 _deviceAlreadPaired(rsp)
    //             }));
    //         _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp)=> {
    //             _deviceFoundEvent(rsp)
    //         }));
    //         _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, ()=> {
    //             setState({
    //                 name: '',
    //                 boundAddress: ''
    //             });
    //         }));
    //     } else if (Platform.OS === 'android') {
    //         _listeners.push(DeviceEventEmitter.addListener(
    //             BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp)=> {
    //                 _deviceAlreadPaired(rsp)
    //             }));
    //         _listeners.push(DeviceEventEmitter.addListener(
    //             BluetoothManager.EVENT_DEVICE_FOUND, (rsp)=> {
    //                 _deviceFoundEvent(rsp)
    //             }));
    //         _listeners.push(DeviceEventEmitter.addListener(
    //             BluetoothManager.EVENT_CONNECTION_LOST, ()=> {
    //                 setState({
    //                     name: '',
    //                     boundAddress: ''
    //                 });
    //             }
    //         ));
    //         _listeners.push(DeviceEventEmitter.addListener(
    //             BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, ()=> {
    //                 ToastAndroid.show("Device Not Support Bluetooth !", ToastAndroid.LONG);
    //             }
    //         ))
    //     }
    // }, [])










        return (
            <View style={styles.container}>

                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#087', paddingHorizontal: 10 }]}>
                    <View>
                        <TouchableOpacity onPress={() => { goBack() }}>
                            <Icon name="arrow-undo-outline" color={'#fff'} size={40} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#087',
                        height: 110,
                    }}>
                        <View style={{}}>
                            <Text style={{ color: '#fff', fontSize: 23, fontWeight: 'bold' }}>Paramètre Imprimante</Text>
                            <Text style={{ color: '#ccc', fontSize: 15, fontWeight: 'bold' }}>Choisissez Votre Imprimante !  </Text>
                        </View>
                        <Icon name="print" color={'#fff'} size={25} style={{ marginLeft: 10 }} />
                    </View>
                </View>


                <View style={{ borderRadius: 15, margin: 5, alignItems: 'center', marginTop: 10, backgroundColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 30 }}>

                    <View style={{}}>
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 17 }}>Bluetooth</Text>
                    </View>

                    <Switch
                        trackColor={{ false: "#000", true: "#fff" }}
                        thumbColor={isEnabled ? "#087" : "#eee"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />

                </View>

                <View style={{ height: 1, width: '90%', backgroundColor: '#078', alignSelf: 'center', marginVertical: 10 }}>

                </View>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 10 }}>Appareils Associés</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: '#eee', borderColor: '#ccc', borderWidth: 1, padding: 5, margin: 5, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Icon name="ios-print-outline" color={'#087'} size={30} />
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Nom Imprimante</Text>
                        </View>
                        <Icon name="ios-information-circle-outline" color={'#087'} size={30} />


                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: '#eee', borderColor: '#ccc', borderWidth: 1, padding: 5, margin: 5, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Icon name="ios-print-outline" color={'#087'} size={30} />
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Imprimante 2 </Text>
                        </View>
                        <Icon name="ios-information-circle-outline" color={'#087'} size={30} />


                    </View>
                </View>
                <View style={{ height: 1, width: '90%', backgroundColor: '#078', alignSelf: 'center', marginVertical: 10 }}>

                </View>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 10 }}>Appareils Disponible</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: '#eee', borderColor: '#ccc', borderWidth: 1, padding: 5, margin: 5, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Icon name="ios-print-outline" color={'#087'} size={30} />
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Nom Imprimante 3</Text>
                        </View>
                        <Icon name="ios-information-circle-outline" color={'#087'} size={30} />


                    </View>
                </View>





                <ModelContainer
                    transparent
                    visible={visible}
                >

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.titleH5}>
                            Enter Your Time Here
                        </Text>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={{ height: 40, width: 100, backgroundColor: '#9CA3AF', margin: 20 }}
                            onChangeText={text => setDebut(text)}
                            value={debut}
                        />
                        <TextInput
                            style={{ height: 40, width: 100, backgroundColor: '#9CA3AF', margin: 20 }}
                            onChangeText={text => setFin(text)}
                            value={fin}
                        />
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => setVisible(false)}>
                        <Text style={styles.titleH3}>
                            Ajouter
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
                            <Icon name="ios-home" color={'#078'} size={30} />
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
        btnScondary: {
            width: '80%',
            height: 45,
            backgroundColor: '#ccc',
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
            height: 110,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 20,

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
        btnTitles: {
            fontSize: 20,
            color: "#087",
            fontWeight: 'bold',
            alignItems: 'center',
            justifyContent: 'center'

        },
        containerTow: {

            backgroundColor: '#fff',
            margin: 10,

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
        containerRow: {
            flexDirection: 'row',
            width: '100%',
            height: 60,
            justifyContent: "space-between",
            padding: 10,
            alignItems: 'center',
            marginVertical: 10
        },
        containerH: {
            alignItems: "center",
            justifyContent: "center",

        },
        containerMsg: {

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
    export default Impression;
