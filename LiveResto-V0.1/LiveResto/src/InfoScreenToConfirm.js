import React, { useState, useContext, useEffect } from 'react';
import { AuthContext, DataContext, ShowDataOpen } from './../components/context'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './../components/ModelContainer';
import moment from 'moment';
import 'moment/locale/fr'
import { styles } from './HomeScreen/styleInfoScreen'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView, StatusBar, Dimensions
} from 'react-native';



const InfoScreenToConfirm = ({ navigation: { goBack }, route, navigation }) => {
    const { height, width } = Dimensions.get('window');
    const { item, token } = route.params
    const [ordersMap, setOrder] = React.useState([]);
    const [numberArticle, setNumberArticle] = React.useState([]);
    const num = item.delivery_lat.toFixed(2)
    const day = item.for_when

    moment.locale('fr')
    var dateMoment = moment(day).calendar()

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
                    setNumberArticle((dataStatus.order.products).length)
                    console.log('NumberArticle', numberArticle)
                    
                    console.log('ordersMap', ordersMap, item.id)

                })

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(async () => {

        idData()

    }, [item.id, item.kitchenstate_id])




    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#087' barStyle="light-content" />

            <View style={styles.containerHeader}>

                    <TouchableOpacity onPress={() => { goBack() }}
                        style={{
                            backgroundColor: '#fff',
                            height: 60,
                            width: 60,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: .5,
                            borderColor: '#087',
                            shadowColor: '#000',
                            elevation: 12,
                            shadowRadius: 25,
                            shadowOffset: { width: 56, height: 13 },
                        }}

                    >
                        <Icon name="arrow-undo-outline" color={'#087'} size={35} />
                    </TouchableOpacity>
            </View>


            <View style={{ alignSelf: 'center',  backgroundColor: '#fff',width:width*1 ,marginTop:height*0.07 }}>

                <Text style={[styles.titleH1, { fontSize: 40, color: '#000', textAlign: 'center' }]}> # {item.id} </Text>

                <Text style={[styles.titleH3, { fontSize: width*.06, color: '#000', width: '100%',textAlign:'center' }]}> Récupération : {dateMoment} </Text>
            </View>

            <TouchableOpacity style={[styles.ButtonScondary]}
                onPress={() => {

                    navigation.navigate("infoImpression", { item, token: token, id: item.id })


                }}

            >
                <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                    <Text style={[styles.ButtonText]}> Imprimer </Text>
                    <Icon name="ios-print-outline" color={'#078'} size={30} style={{ margin: 0 }} />
                </View>

            </TouchableOpacity>



            <View style={{}}>

                <View style={[{
                    backgroundColor: '#fff',
                    paddingVertical: 10,
                    borderRadius: 5,
                    margin: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: width * 1,
                    alignSelf: 'center',
                    paddingHorizontal: 5
                }]}>


                    <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', paddingHorizontal: 10, alignItems: "center", width: width * .49, backgroundColor: '#fff' }}>
                        <Icon name="md-person" color={'#078'} size={35} />
                        <Text style={{ fontSize: width*.06, color: "#000", fontWeight: 'bold', }}>{item.delivery.full_name}</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', width: width * .49, backgroundColor: '#fff' }}>

                        <Text style={{ fontSize: width*.06, color: '#087', fontWeight: 'bold', }}>Appler le Client</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                            <Icon name="ios-call" color={'#000'} size={20} style={{ margin: 5 }} />
                            <TouchableOpacity>
                                <Text style={{ fontSize: 22, marginVertical: 5, fontWeight: 'bold' }}>{item.delivery.phone}</Text>
                            </TouchableOpacity>
                        </View>


                    </View>


                </View>

                <View style={{ zIndex: 3, paddingVertical: 5 }}>

                    <View style={{ width: width*.99, justifyContent: 'center', alignSelf: 'center', borderRadius: 10, height: height *.42 ,backgroundColor:'#fff'}}>

                        <ScrollView >
                            {ordersMap.map((i) => {

                                return (
                                    <View key={i.id} style={{ height:70,
                                     backgroundColor: '#fff',
                                      marginBottom: 4,paddingLeft:10, 
                                       flexDirection: 'row', alignItems: 'center',
                                        borderRadius: 5,  alignSelf: 'center',width:width*.99,justifyContent:'space-between' }}>
                                        
                                        <View style={{ flexDirection: 'row', alignItems: 'center',backgroundColor: '#fff',width:width*.8 }}>
                                            <View style={{  }}>
                                                <Icon name="restaurant-outline" color={'#087'} size={width*.05} style={{  }} />
                                            </View>

                                            <View style={{ }}>
                                                <Text style={{ fontSize: width*.04, fontWeight: 'bold',width:width*.6,backgroundColor:'#fff',marginLeft:10 }}> {i.title} </Text>
                                                {i._joinData.extras ? <Text style={{ fontSize: width*.03, marginLeft: 5,width:width*.6,marginLeft:10 }}>{i._joinData.extras}</Text> : null}
                                            </View>

                                            <View>
                                                 <Text style={{ fontSize: width*.04, fontWeight: 'bold' }}> × {i._joinData.quantity} </Text> 
                                            </View>

                                        </View>


                                        <View style={{ flexDirection: 'row', alignItems: 'center',width:width*.15,backgroundColor:'#fff',justifyContent:'center',alignItems:'center' }}>

                                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#078' }}>{i._joinData.price} </Text>
                                        </View>
                                    </View>
                                )
                            })
                            }


                        </ScrollView>
                    </View>
                </View>

            </View>
            <View style={{ width: "100%",zIndex:100, justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 5, alignSelf: 'center', backgroundColor: '#eee', borderTopColor: '#087', borderTopWidth: .5, position: 'absolute', bottom: 0 }}>
                <View style={{}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, }}>Sous totale : </Text>

                        <Text style={{ fontSize: 20 }}> {num} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, }}>Remise : </Text>
                        <Text style={{ fontSize: 20 }}> {item.delivery_price} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Totale : </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}> {item.total} € </Text>
                    </View>
                </View>
            </View>






        </View>
    )
}
export default InfoScreenToConfirm;
