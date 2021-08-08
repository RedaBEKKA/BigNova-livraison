import React, { useState, useContext, useEffect } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext, DataContext, ShowDataOpen } from './context'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    Dimensions

} from 'react-native';

const RedComponente = ({ item, id, navigation, route, }) => {
    const [result, setResult] = React.useState('')
    const donne = useContext(DataContext)
    const token = donne.establishment.token
    const { height, width } = Dimensions.get('window');

    const [numberArticle, setNumberArticle] = React.useState([]);
    const nbrarticl = []
    const articleView = async (id) => {

        await fetch('https://dev500.live-resto.fr/apiv2e/orders/details', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "orderId": id
            })
        })
            .then(res => res.json())
            .then((dataStatus) => {



                (dataStatus.order.products).map(i => {
                    nbrarticl.push(i)

                })

                //console.log('nbrarticl', nbrarticl)
                //console.log('nbrarticl length', nbrarticl.length)
                setNumberArticle(nbrarticl.length)



            })

    }



    useEffect(() => {
        articleView(id)
    }, [])


    const ToCuisine = async (id) => {

        try {
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
                    console.log('idd from to cuisnie |||||||||||||||||', id)
                    console.log('response||||', response)
                    setResult(response.result)


                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={{ bottom: 10, marginTop: 5 }}>

            {!result && item.kitchenstate_id == 20 && item.kitchenstate_id !== 30 && item.kitchenstate_id !== 40 ?

                <View style={{
                    borderRadius: 20,
                    borderWidth: 1.5,
                    borderColor: '#700',
                    backgroundColor: '#000',
                    justifyContent: 'space-evenly',
                    paddingHorizontal: 20,
                    width: width * .92,
                    height: height * .16,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center'


                }}>


                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("InfoScreenToConfirm", { item, token: token })
                            console.log(item.kitchenstate_id);
                        }
                        }
                        style={{ position: 'absolute', top: -17, right: 13 }}
                    >
                        <View>
                            <Icon name="chevron-down-circle-sharp" color={'#087'} size={43} style={{ marginBottom: 15, marginLeft: 5 }} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ width: 120, height: 30, zIndex: 2, backgroundColor: '#700', justifyContent: 'center', borderRadius: 5, position: 'absolute', top: -16, left: 15, borderColor: '#000', borderWidth: 3 }}>
                        <Text style={[{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', color: '#fff' }]}> # {item.id}</Text>
                    </View>


                    {/* View article */}
                    <View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', }} >

                            <View style={{ backgroundColor: '#000', width: width * .735, }}>

                                <View style={{ backgroundColor: '#000' }}>
                                    <Text style={[{ marginVertical: 1, color: '#f00', fontSize: 20, fontWeight: 'bold', }]}> A Envoyer En Cuisine</Text>
                                </View>

                                <View style={{ backgroundColor: '#000', width: "50%", marginLeft: 20 }}>
                                    <Text style={{ marginTop: 0, color: '#fff', fontSize: 18, fontWeight: 'bold' }}>

                                        {/* {numberArticle.map((nbr) => {
                                            

                                            number = nbr
                                            return (
                                                number
                                            )
                                        })}  */}

                                        {numberArticle} article


                                    </Text>
                                    <Text style={[{ marginTop: 0, color: '#fff', fontSize: 15 }]}> <Text style={{ marginTop: 0, color: '#fff', fontSize: 18, fontWeight: 'bold' }}> Totale </Text>: {item.total} €</Text>
                                </View>

                                <View style={{ flexDirection: 'row', backgroundColor: '#000' }}>
                                    <Icon name="ios-navigate" color={'#078'} size={19} style={{ marginTop: 3 }} />
                                    <Text style={{ color: '#fff', fontSize: 14, paddingHorizontal: 3, marginTop: 3 }}> Aucun livreur n'a encore été trouver</Text>
                                </View>
                            </View>


                        </View>

                    </View>

                    {/* View button */}

                    <View>
                        <View style={{ backgroundColor: '#000', }}>



                            <TouchableOpacity
                                onPress={() => {
                                    //setCount(count + 1)
                                    //console.log(count)
                                    ToCuisine(id) //send to cuisine 30 kitchen state id = 40||30

                                    {

                                        console.log('idd from function', id, item.kitchenstate_id)
                                    }

                                }
                                }
                            >
                                <View style={{ backgroundColor: '#700', height: 40, width: 60, borderRadius: 5, borderWidth: 0.4, borderColor: '#ccc', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                                    <Icon name="arrow-forward-outline" color={'#fff'} size={30} />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>


                </View>

                : null}
        </View>
    )

}
export default RedComponente;