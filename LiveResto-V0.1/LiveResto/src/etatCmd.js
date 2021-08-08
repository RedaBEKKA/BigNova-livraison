import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './../components/ModelContainer';
import { AuthContext, DataContext, CommandContext, ShowDataOpen, DataStatusContext } from './../components/context'


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    ScrollView
} from 'react-native';

const EtatCommande = ({ navigation: { goBack }, route, navigation }) => {

    const [result, setResult] = React.useState('')
    const { item, token, id } = route.params
   
    const valider = () => {

        try {
            fetch('https://dev500.live-resto.fr/apiv2e/orders/update', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    "orderId": item.id,
                    "action": "kitchenstate_id",
                    "kitchenstate_id": 40

                })
            })
                .then(res => res.json())
                .then((response) => {
                    console.log('Token ||||', token)
                    console.log('item.id|||', id)
                    console.log('response||||', response)
                    setResult(response.result)

                })
        } catch (error) {

        }




    }



    // useEffect(async () => {
    //     await valider()

    // }, [])


    // useEffect(()=>{
    //         setTimeout( () => {
    //            navigation.navigate('Home')
    //         },100000);
    // })


    // const [kitchenStateId, setkitchenStateId] = useState('');

    // useEffect(() => {
    //     {

    //         setkitchenStateId(30)
    //     }
    // }, [])


    



    const [active, setActive] = React.useState({
        check_ActiveCuisine: true,
        check_ActiveLivreur: false,
        btn2: true,
        btn3: false,
    });









    const method = async () => {
        await fetch('https://dev500.live-resto.fr/apiv2e/orders/update', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "orderId": id,
                "action": "kitchenstate_id",
                "kitchenstate_id": 30

            })
        })
            .then(res => res.json())
            .then((response) => {
                console.log('Token ||||', token)
                console.log('item.id|||', id)
                console.log('response||||', response)


            })

    }







    const colorActive = active.check_ActiveCuisine ? '#087' : '#ccc'
    const colorTextActive = active.check_ActiveCuisine ? '#000' : '#ccc'
    const colorActiveLivreur = active.check_ActiveLivreur ? '#087' : '#ccc'
    const colorTextActiveLivreur = active.check_ActiveLivreur ? '#000' : '#ccc'

    return (

        <View>
            <View >
                <View style={styles.containerTitle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Icon name="arrow-undo-outline" color={'#fff'} size={35} />
                        </TouchableOpacity>
                        <Text style={[styles.titleH1, { fontSize: 24 }]}>  Commande N : {item.id} </Text>
                        <Icon name="ios-information-circle-outline" color={'#fff'} size={35} />
                    </View>
                    <View style={[{ width: "100%" }]}>
                        <Text style={[styles.titleH3, { fontSize: 21, color: '#fff' }]}> Récupération : {item.for_when} </Text>
                    </View>
                </View>

                <View style={[{ backgroundColor: '#fff', marginTop: 13, paddingVertical: 5, marginHorizontal: 2, paddingHorizontal: 5 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ justifyContent: 'center', alignItems: "center", }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", height: 55, backgroundColor: '#eee', padding: 5, borderRadius: 5 }}>
                                <Icon name="md-person" color={'#078'} size={30} />
                                <Text style={{ fontSize: 20, color: "#000", fontWeight: 'bold', }}>{item.delivery.full_name}</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ alignItems: "center", backgroundColor: '#eee', borderRadius: 5, height: 55 }}>
                                <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold', }}>Appler le Client</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                                    <Icon name="ios-call" color={'#078'} size={19} style={{ margin: 2 }} />

                                    <TouchableOpacity>
                                        <Text style={{ fontSize: 16, marginVertical: 2, }}>{item.delivery.phone}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    </View>


                </View>


                <View>
                    <View style={{ marginTop: 20 }}>
                        <View style={{
                            padding: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: colorActive,
                            margin: 5

                        }}>
                            <View style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                justifyContent: "space-between",
                                marginVertical: 10

                            }}
                            >
                                <View>
                                    <Icon name="ios-restaurant-outline" color={colorActive} size={80} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                        width: '80%',
                                        color: colorTextActive,
                                        marginHorizontal: 5
                                    }}>La commande est en Prépartion</Text>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: '#ccc',
                                        fontSize: 16,
                                        width: '70%'
                                    }}>Appoyer sur le button pour met la commande comme prète</Text>
                                </View>
                            </View>
                            <View>

                                {active.btn2 ? <TouchableOpacity
                                    style={{
                                        backgroundColor: colorActive,
                                        height: 45,
                                        width: '70%',
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 10,
                                        alignSelf: 'center'


                                    }}
                                    onPress={() => {
                                        if (id ) {
                                            method()
                                            setActive({
                                            check_ActiveCuisine: false,
                                            check_ActiveLivreur: true,
                                            btn2: false,
                                            btn3: true,
                                        })


                                        }
                                       

                                    }}>

                                    <View >
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>

                                            <Text style={{
                                                color: '#fff',
                                                fontSize: 21, fontWeight: 'bold',
                                                marginHorizontal: 15
                                            }}>
                                                Prête

                                            </Text>
                                            <Icon name="ios-checkmark-circle-outline" color='#fff' size={25} />
                                        </View>
                                    </View>

                                </TouchableOpacity> : null}


                            </View>
                        </View>
                    </View>



                    <View>
                        <View style={{
                            padding: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: colorActive,
                            margin: 5

                        }}>
                            <View style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                justifyContent: "space-between",
                                marginVertical: 10
                            }}
                            >
                                <View>
                                    <Icon name="ios-checkmark-circle" color={colorActiveLivreur} size={80} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                        width: '75%',
                                        color: colorTextActiveLivreur,
                                        marginHorizontal: 5
                                    }}>Votre commande est prête a livrer</Text>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: '#ccc',
                                        fontSize: 16,
                                        width: '70%'
                                    }}>Appoyer sur le button pour passer a un livreur</Text>
                                </View>
                            </View>

                            <View>


                                {active.btn3 ? <TouchableOpacity
                                    style={{
                                        backgroundColor: colorActiveLivreur,
                                        height: 45,
                                        width: '70%',
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 10,
                                        alignSelf: 'center'


                                    }}
                                    onPress={() => {

                                        {
                                            navigation.push('Home')

                                        }
                                    }

                                    }>

                                    <View >
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>

                                            <Text style={{
                                                color: '#fff',
                                                fontSize: 21, fontWeight: 'bold',
                                                marginHorizontal: 15
                                            }}>
                                                Livrer

                                            </Text>
                                            <Icon name="ios-send-outline" color='#fff' size={25} />
                                        </View>
                                    </View>

                                </TouchableOpacity> : null}

                            </View>
                        </View>
                    </View>




                </View>
            </View>

            <View style={{ marginVertical: 60 }}>
                
                <TouchableOpacity style={{ position: 'absolute', right: -11, bottom: 1, marginHorizontal: 20, height: 50, width: 50, backgroundColor: '#fff', borderColor: '#078', borderWidth: 1, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <View >
                        <Icon name="ios-home" color={'#078'} size={32} />
                    </View>
                </TouchableOpacity>

            </View>


        </View >


    )
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#087',
        height: 80,
        paddingHorizontal: 10

    },
    containerTitle: {
        backgroundColor: '#087',
        width: "100%",
        height: 120,
        paddingHorizontal: 10,
        justifyContent: 'center',

    }, titleH1: {
        fontSize: 26,
        color: "#fff",
        fontWeight: 'bold',
        marginLeft: 1,

    }, titleH3s: {
        fontSize: 24,
        color: "#fff",
        padding: 5,
        fontWeight: '700'
    },
});
export default EtatCommande;










