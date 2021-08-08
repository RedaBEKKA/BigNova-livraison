/**
 * Created by januslo on 2018/12/27.
 */


import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState, useContext, useEffect } from 'react';

import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    DeviceEventEmitter,
    NativeEventEmitter,
    Switch,
    TouchableOpacity,
    Dimensions,
    ToastAndroid,
    StatusBar
} from 'react-native';
import { BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter } from "react-native-bluetooth-escpos-printer";


var { height, width } = Dimensions.get('window');

const imprission = ({ navigation: { goBack }, route, navigation }) => {


    const _listeners = [];

    const [devices, setDevices] = useState(null)
    const [pairedDs, setPairedDs] = useState([])
    const [foundDs, setFoundDs] = useState([])
    const [bleOpend, setBleOpend] = useState(false)
    const [loading, setLoading] = useState(true)
    const [boundAddress, setBoundAddress] = useState('')
    const [debugMsg, setDebugMsg] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        componentDidMount()
    }, [])
    const componentDidMount = () => {
        BluetoothManager.isBluetoothEnabled().then((enabled) => {
            setBleOpend(Boolean(enabled))
            setLoading(false)

        }, (err) => {
            err
        });

        if (Platform.OS === 'ios') {
            let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
            _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
                (rsp) => {
                    _deviceAlreadPaired(rsp)
                }));
            _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
                _deviceFoundEvent(rsp)
            }));
            _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
                setName('')
                setBoundAddress('')

            }));
        } else if (Platform.OS === 'android') {
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) => {
                    _deviceAlreadPaired(rsp)
                }));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
                    _deviceFoundEvent(rsp)
                }));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_CONNECTION_LOST, () => {
                    setName('')
                    setBoundAddress('')
                }
            ));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
                    ToastAndroid.show("Device Not Support Bluetooth !", ToastAndroid.LONG);
                }
            ))
        }
    }

    const componentWillUnmount = () => {
        //for (let ls in this._listeners) {
        //    this._listeners[ls].remove();
        //}
    }

    const _deviceAlreadPaired = (rsp) => {
        var ds = null;
        if (typeof (rsp.devices) == 'object') {
            ds = rsp.devices;
        } else {
            try {
                ds = JSON.parse(rsp.devices);
            } catch (e) {
            }
        }
        if (ds && ds.length) {
            let pared = pairedDs;
            pared = pared.concat(ds || []);
            setPairedDs(pared)

        }
    }

    const _deviceFoundEvent = (rsp) => {//alert(JSON.stringify(rsp))
        var r = null;
        try {
            if (typeof (rsp.device) == "object") {
                r = rsp.device;
            } else {
                r = JSON.parse(rsp.device);
            }
        } catch (e) {//alert(e.message);
            //ignore
        }
        //alert('f')
        if (r) {
            let found = foundDs || [];
            if (found.findIndex) {
                let duplicated = found.findIndex(function (x) {
                    return x.address == r.address
                });
                //CHECK DEPLICATED HERE...
                if (duplicated == -1) {
                    found.push(r);
                    setFoundDs(found)

                }
            }
        }
    }

    const _selfTest = () => {
        (
            setLoading(true)
            , () => {
                BluetoothEscposPrinter.selfTest(() => {
                });

                setLoading(false)

            })
    }

    const _scan = () => {
        (
            setLoading(true)
        )
        BluetoothManager.scanDevices()
            .then((s) => {
                var ss = s;
                var found = ss.found;
                try {
                    found = JSON.parse(found);//@FIX_it: the parse action too weired..
                } catch (e) {
                    //ignore
                }
                var fds = foundDs;
                if (found && found.length) {
                    fds = found;
                }
                setFoundDs(fds)
                setLoading(false)

            }, (er) => {
                setLoading(false)
                alert('error' + JSON.stringify(er));
            });
    }
    const _renderRow = (rows) => {
        let items = [];
        for (let i in rows) {
            let row = rows[i];
            if (row.address) {
                items.push(
                    <TouchableOpacity key={new Date().getTime() + i} style={{ backgroundColor: '#087' }} onPress={() => {
                        setLoading(true)


                        BluetoothManager.connect(row.address)
                            .then((s) => {

                                setLoading(false)
                                setBoundAddress(row.address)
                                setName(row.name) || "UNKNOWN"

                            }, (e) => {
                                setLoading(false)
                                alert(e);
                            })

                    }}>
                        <View style={{ padding: 5, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Icon name="bluetooth" color={'#087'} size={17} style={{ marginTop: 2, marginLeft: 5 }} />

                                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>{row.name || "UNKNOWN"}</Text>

                            </View>

                            <Text style={styles.address}>{row.address}</Text>
                        </View>



                    </TouchableOpacity>
                );  
            }
        }
        return items;
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#087' barStyle="dark-content" />

            {/* Header */}

            <View style={{ flexDirection: 'row', paddingHorizontal: 15, backgroundColor: '#f4f4f4', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <TouchableOpacity onPress={() => { navigation.toggleDrawer() }}>
                            <Icon name="md-menu-sharp" color={'#087'} size={35} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',

                        height: height * .085,
                        
                    }}>
                        <View style={{}}>
                            <Text style={{ color: '#000', fontSize: 22, fontWeight: 'bold',marginLeft:10 }}>Paramètre Imprimante</Text>
                            <Text style={{ color: '#ccc', fontSize: 15,marginLeft:12 }}>Choisissez Votre Imprimante !  </Text>
                        </View>
                    </View>
                </View>


                <Icon name="print" color={'#087'} size={35} style={{ marginLeft: 10 }} />

            </View>
            {/* bluetoth button */}
            <View style={{


                alignItems: 'center',
                width: "100%",
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 20,
                paddingHorizontal: 30,
                alignSelf: 'center'

            }}>

                {/* <Text style={{ color: '#000' }}>{debugMsg}</Text> */}

                <View style={{}}>

                    <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Activer Blutooth  </Text>
                    {/* Opended:{this.state.bleOpend ? "true" : "false"}  */}

                </View>

                <Switch

                    value={bleOpend} onValueChange={(v) => {
                        setLoading(true)


                        if (!v) {
                            BluetoothManager.disableBluetooth().then(() => {
                                setBleOpend(false)
                                setLoading(false)
                                setFoundDs([])
                                setPairedDs([])


                            }, (err) => { alert(err) });

                        } else {
                            BluetoothManager.enableBluetooth().then((r) => {
                                var paired = [];
                                if (r && r.length > 0) {
                                    for (var i = 0; i < r.length; i++) {
                                        try {
                                            paired.push(JSON.parse(r[i]));
                                        } catch (e) {
                                            //ignore
                                        }
                                    }
                                }

                                setBleOpend(true)
                                setLoading(false)
                                setPairedDs(paired)

                            }, (err) => {
                                setLoading(false)
                                alert(err)
                            });
                        }
                    }}


                />

            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 20,
                alignSelf: "center",
                paddingVertical: 20,
                backgroundColor: '#fff',
            }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Imprimante connectée:</Text>
                <Text style={{ color: "#ccc", fontSize: 18,marginLeft:5 }}>{!name ? "Pas d'appareils" : name}</Text>

            </View>


            <View style={{ height: .8, width: '90%', backgroundColor: '#ccc', alignSelf: 'center', marginVertical: 10 }}>

            </View>


            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                alignSelf: 'center',
                paddingVertical: 10,
                backgroundColor: '#fff'
            }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: "#000" }}>Appareils Disponible :</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: "#c0c0c0" }}> (appuyez pour vous connecter)</Text>
            </View>

            {loading ? (<ActivityIndicator animating={true} />) : null}
            <View style={{ flex: 1, flexDirection: "column", width: "90%", alignSelf: 'center' }}>
<ScrollView>
                {
                    _renderRow(foundDs)
                }
</ScrollView>
            </View>



            <View style={{ height: 1, width: '90%', backgroundColor: '#ccc', alignSelf: 'center', marginVertical: 10 }}>
                {/* line 2 */}
            </View>


            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                alignSelf: 'center',
                paddingVertical: 10

            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#000" }}>Appareils Associés :</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: "#c0c0c0" }}> (appuyez pour vous reconnecter)</Text>
            </View>


            {loading ? (<ActivityIndicator animating={true} />) : null}
            <View style={{ flex: 1, flexDirection: "column", width: "90%", alignSelf: 'center', marginVertical: 10 }}>

<ScrollView>
                {
                    _renderRow(pairedDs)
                }

</ScrollView>

            </View>

            {loading || bleOpend ?

                <TouchableOpacity
                    onPress={() => {
                        _scan();
                    }}

                    style={{
                       
                        alignSelf: 'center',
                        marginVertical: 15,
                        
                        justifyContent: 'center',
                        backgroundColor: '#087',
                        alignItems:'center',
                        paddingVertical:14,
                        paddingHorizontal:10,
                        width:width*.85,
                        borderRadius:20,
                        borderWidth:1,
                        borderColor:'#fff',
                        shadowColor: '#087',
                        elevation: 17,
                        shadowRadius: 25,
                        shadowOffset: { width: 16, height: 13 },
                    }}>

                    <Text style={{ color: '#fff', fontSize:20,fontWeight:'bold' }}>recherche des imprimante</Text>


                
                </TouchableOpacity>

                : null

            }


        </View>
    );





}
export default imprission

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    title: {

        backgroundColor: "#eee",
        color: "#232323",
        paddingLeft: 8,
        paddingVertical: 4,
        textAlign: "left"
    },
    wtf: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    name: {

    },
    address: {


    }
});