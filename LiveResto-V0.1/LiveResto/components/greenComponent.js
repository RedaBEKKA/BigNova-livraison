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

  
    const GreenComponente = ({ item, id ,navigation,route }) => {
        const donne = useContext(DataContext)
    const { height, width } = Dimensions.get('window');

        const token = donne.establishment.token
        return (

            <View style={{ bottom:10 }}>
                {item.kitchenstate_id == 40 ?
                    <View style={{

                        borderColor: '#087',
                        
                        paddingVertical: 10,
                        borderRadius: 20,
                        borderWidth: 1,
                        backgroundColor: '#000',
                        paddingHorizontal: 20,
                        width: width*.92,
                        height: height * .16,
                        alignSelf:'center',
    

                    }}>
                        <TouchableOpacity
                            onPress={() => {

                                navigation.navigate("InfoScreen", { item, token: token })

                            }
                            }
                            style={{ position: 'absolute', top: -19, right: 13 }}

                        >


                            <View>
                                <Icon name="chevron-down-circle-sharp" color={'#087'} size={45} style={{ marginBottom: 55, marginLeft: 15 }} />
                            </View>


                        </TouchableOpacity>


                        <View style={{ width: 120, height: 30, zIndex: 2, backgroundColor: '#087', justifyContent: 'center', borderRadius: 5, position: 'absolute', top: -16, left: 15, borderColor: '#000', borderWidth: 3 }}>
                            <Text style={[{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', color: '#fff' }]}> # {item.id}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }} >

                            <View style={{ marginVertical: 10 }}>

                                <View style={{ marginLeft: 5 }}>
                                    <View style={{ height: 40, flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', marginLeft: 15 }}>
                                        <Text style={{ color: '#087', fontSize: 22, fontWeight: 'bold' }}>Commande prête</Text>
                                        <Icon name="checkmark-done" color={'#087'} size={19} style={{ marginTop: 3, marginLeft: 5 }} />

                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                    <Icon name="ios-navigate" color={'#078'} size={19} style={{ marginTop: 3 }} />
                                    <Text style={{ color: '#fff', fontSize: 15, paddingHorizontal: 3, marginTop: 3 }}> Aucun livreur n'a encore été trouver</Text>
                                </View>
                            </View>

                           

                        </View>
                    </View>

                    :
                    null

                }

            </View>

        )
    }
    export default GreenComponente;