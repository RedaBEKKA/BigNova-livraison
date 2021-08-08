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

const OrangeComponente = ({ item, id, navigation, route }) => {
    const [count, setCount] = useState(0)
    const donne = useContext(DataContext)
    const token = donne.establishment.token
    const [result, setResult] = React.useState('')
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

                //  console.log('nbrarticl', nbrarticl)
                //  console.log('nbrarticl length', nbrarticl.length)
                setNumberArticle(nbrarticl.length)

                // console.log('numberArticle', numberArticle)
                // console.log('(dataStatus.order.products).length', (dataStatus.order.products).length)


            })

    }

    useEffect(() => {
        articleView(id)
    }, [])

    const valider = async (id) => {

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
            console.log(error)
        }
    }


    return (

        <View style={{ marginTop: 5, bottom: 10 }}>

            {item.kitchenstate_id == 30 ?

                <View style={{
                    borderColor: '#ff851b',
                    borderRadius: 20,
                    borderWidth: 1.5,

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

                            navigation.navigate("InfoScreen", { item, token: token })

                        }
                        }
                        style={{ position: 'absolute', top: -19, right: 13 }}

                    >


                        <View>
                            <Icon name="chevron-down-circle-sharp" color={'#087'} size={45} style={{ marginBottom: 15, marginLeft: 5 }} />
                        </View>

                    </TouchableOpacity>

                    <View style={{ width: 120, height: 30, zIndex: 2, backgroundColor: '#ff851b', justifyContent: 'center', borderRadius: 5, position: 'absolute', top: -16, left: 15, borderColor: '#000', borderWidth: 3 }}>
                        <Text style={[{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', color: '#fff' }]}> # {item.id}</Text>
                    </View>

                    {/* command + btn */}

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }} >

                            <View style={{ backgroundColor: '#000', width: width * .735, }}>

                                <View style={{}}>
                                    <Text style={[{ marginVertical: 1, color: '#ff851b', fontSize: 20, fontWeight: 'bold', }]}>En Cuisine</Text>
                                </View>

                                <View style={{ backgroundColor: '#000', width: "50%", marginLeft: 20 }}>
                                    <Text style={{ marginTop: 0, color: '#fff', fontSize: 18, fontWeight: 'bold' }}>  {numberArticle}  Article </Text>
                                    <Text style={[{ marginTop: 0, color: '#fff', fontSize: 15 }]}> <Text style={{ marginTop: 0, color: '#fff', fontSize: 18, fontWeight: 'bold' }}> Totale </Text>: {item.total} €</Text>
                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                    <Icon name="ios-navigate" color={'#078'} size={19} style={{ marginTop: 3 }} />
                                    <Text style={{ color: '#fff', fontSize: 14, paddingHorizontal: 3, marginTop: 3 }}> Aucun livreur n'a encore été trouver</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={{ backgroundColor: '#000' }}>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => {

                                    setCount(count + 1)
                                    console.log(count)


                                    valider(id) //send to cuisine 30 kitchen state id = 40||30

                                    {
                                        result &&
                                            
                                        console.log('id ffffff', id, item.kitchenstate_id)

                                    }

                                }
                                }
                            >
                                <View style={{ backgroundColor: '#ff851b', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5, height: 40, width: 60, borderColor: '#fff', borderWidth: 0.4, marginTop: 30 }}>
                                    <Icon name="md-checkmark-circle-outline" color={'#fff'} size={28} style={{}} />
                                </View>

                            </TouchableOpacity>

                        </View>
                    </View>


                    {/* //btn */}




                </View>

                :
                null

            }

        </View >


    )
}
export default OrangeComponente;