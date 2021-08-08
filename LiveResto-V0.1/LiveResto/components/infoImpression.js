import React, { useState, useContext, useEffect } from 'react';
import { AuthContext, DataContext, ShowDataOpen } from './../components/context'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './ModelContainer';
import {BluetoothManager,BluetoothEscposPrinter,BluetoothTscPrinter} from 'react-native-bluetooth-escpos-printer';


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

const setTime = () => {
    setVisible(true)
}


const infoImpression = ({ navigation: { goBack }, route, navigation }) => {

    const { item, token } = route.params
    const [visible, setVisible] = useState(false)
    const [btn, setBtn] = useState(true)
    const [debut, setDebut] = useState('10:00');
    const [fin, setFin] = useState('20:00');
    const [ordersMap, setOrder] = React.useState([]);




    const idData = async () => {
        try {
            await fetch('https://dev500.live-resto.fr/apiv2e/orders/details', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    "orderId": item.id
                })
            })
                .then(res => res.json())
                .then((dataStatus) => {

                    setOrder(dataStatus.order.products)
                    console.log(item.id)

                })

        } catch (error) {

        }

    }

    useEffect(async () => {

        idData()

    }, [item.id])






    return (
        <View style={styles.container}>
            <View>
                <View style={styles.containerTitle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        <View style={{}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{  alignItems: 'center' }}>
                                    <Text style={[styles.titleH1,{fontSize:25,}]}> Impression du ticket <Text style={{fontSize:20}}>N : {item.id} </Text> </Text>
                                    

                                </View>

                            </View>



                            <View style={[{ width: "100%" }]}>
                                <Text style={[styles.titleH3, { fontSize: 19, color: '#fff', width: '100%' }]}> Récupération : {item.for_when} </Text>
                            </View>
                        </View>
                        <View>
                            <Icon name="print" color={'#fff'} size={40} />
                        </View>
                    </View>

                </View>
                <View style={[{ backgroundColor: '#eee', marginTop: 13, marginHorizontal: 2, paddingHorizontal: 5 ,height:60}]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ justifyContent: 'center', alignItems: "center", }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center", height: 55, backgroundColor: '#eee', padding: 5, borderRadius: 5 }}>
                                <Icon name="md-person" color={'#078'} size={30} />
                                <Text style={{ fontSize: 20, color: "#000", fontWeight: 'bold', }}>{item.delivery.full_name}</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ alignItems: "center", backgroundColor: '#eee', borderRadius: 5, height: 55 }}>
                                <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold', }}>Appler le Client</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                                    <Icon name="ios-call" color={'#078'} size={20} style={{ margin: 2 }} />
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: 16, marginVertical: 2, }}>{item.delivery.phone}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

{/*                 
                <View style={{ zIndex: 3 }}>
                    <View style={{ width: '95%', borderWidth: 1, borderColor: '#078', justifyContent: 'center', alignSelf: 'center', marginTop: 40, borderRadius: 15 }}>
                        <View style={{ marginTop: 20 }}></View>

                        <View style={[styles.btnScondary,
                        {
                            backgroundColor: '#078',
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#078',
                            borderWidth: 1,
                            width: '85%',
                            position: "absolute",
                            top: -30,
                            zIndex: 1
                        }]}
                            onPress={() => { setBtn(false) }}

                        >
                            <View >
                                <Text style={[styles.btnTitles, { fontSize: 22, color: '#fff' }]}> Détails de la commande </Text>
                            </View>
                        </View>
                        {ordersMap.map((i) => {
                            return (
                                <View style={{ height: 45, backgroundColor: '#eee', paddingHorizontal: 5, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, width: '95%', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 13, fontWeight: 'bold', width: '60%' }}> {i.title} </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 100 }}>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}> Qt:{i._joinData.quantity} </Text>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#078' }}>{i._joinData.price} Eur</Text>
                                    </View>
                                </View>
                            )
                        })
                        }
                        <View style={{ marginHorizontal: 30, backgroundColor: '#ccc', padding: 10, borderRadius: 6, width: '90%', alignSelf: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Sous totale : </Text>
                                <Text style={{ fontWeight: 'bold' }}> {item.delivery_lat} Eur</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Remise : </Text>
                                <Text style={{ fontWeight: 'bold' }}> {item.delivery_price} Eur</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Totale : </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}> {item.total} Eur</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 25 }}></View>
                    </View>
                </View>
                
                 */}
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    
             
                </View>
                <TouchableOpacity style={[styles.btnScondary, { width: "70%", marginHorizontal: 10, backgroundColor: '#eee', borderRadius: 12, justifyContent: "space-evenly", alignItems: 'center', borderColor: '#078', borderWidth: 1,marginVertical:15 }]}
                    onPress={() => { setBtn(false) }}

                >
                    <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                        <Text style={[styles.btnTitles, { fontSize: 23 }]}> Imprimer </Text>
                        <Icon name="ios-print-outline" color={'#078'} size={30} style={{ margin: 0 }} />
                    </View>

                </TouchableOpacity>
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

        </View>
    )
}
export default infoImpression;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",


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

        height: 45,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        justifyContent: 'center',

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

    containerTitle: {
        backgroundColor: '#087',
        width: "100%",
        height: 120,
        paddingHorizontal: 5,
        justifyContent: 'center'
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
});

