import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './ModelContainer';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';


const Ouverture = ({ navigation }) => {
    const [Switched, setSwitch] = useState(false)
    const [visible, setVisible] = useState(false)
    const [ferme, setFerme] = useState(true)
    const [btn, setBtn] = useState(true)
    const [msg, setMsg] = useState('Votre restaurant est fermé')
    const [heur, setHeur] = useState("N'oublier pas d'ouvrir a 11:00")
    const [order, setOrder] = useState(' Orders Comes when Restaurant Is Open')
    const [isEnabled, setIsEnabled] = useState(false);





    const [horaireData, setHoraireData] = React.useState({

        day1: {
            jour: 'dimanche',
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            debuts: '22:00',

        },
        day2: {
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            debuts: '22:00',

        },
        day3: {
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            debuts: '22:00',

        },
        day4: {
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            debuts: '22:00',

        },
        day5: {
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            debuts: '22:00',

        },
        day6: {
            debutj: '08:00',
            finj: '12:00',
            debuts: '15:00',
            debuts: '22:00',

        },


    });



    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <View style={styles.container1}>
                    <Text style={styles.titleH1}>Horaires D'ouverture</Text>
                    <Text style={styles.titleH3}>Pour modifier vos horaires d'ouverture , aller dans les paramertres de votre portail Restaurant
                    </Text>

                </View>


            </View>


            <ModelContainer
                transparent
                visible={visible}
            >
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Image
                                source={require('../assets/x.jpg')}
                                style={{ height: 30, width: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../assets/sucees.png')}
                        style={{ height: 150, width: 160, marginVertical: 10 }}
                    />
                </View>
                <Text mode={true} style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                    {msg}
                </Text>
            </ModelContainer>

            <ModelContainer
                transparent
                visible={ferme}
            >
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setFerme(false)}>
                            <Image
                                source={require('../assets/x.jpg')}
                                style={{ height: 30, width: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../assets/x.jpg')}
                        style={{ height: 150, width: 150, marginVertical: 10 }}
                    />
                </View>
                <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                    {msg}

                </Text>
            </ModelContainer>

            <View style={styles.containerTow}>
                <View style={styles.containerLineOne}>
                    <View style={styles.containerDay}>
                        <Text style={styles.titleH5}> Days</Text>
                    </View>
                    <View style={styles.containerhours}>
                        <Text style={styles.titleH5}> Debut  | Fin </Text>
                    </View>
                </View>

                <View style={styles.containerLine}>

                    <View style={styles.containerDay}>
                        <Text style={styles.titleH2}> {horaireData.day1.jour}</Text>
                    </View>
                    <View style={styles.containerhours}>
                        <Text style={styles.titleH2}> {horaireData.day1.debutj} To {horaireData.day1.finj} </Text>
                        <Text style={styles.titleH2}>  To  </Text>
                    </View>
                </View>
                <View style={styles.containerLine}>
                    <View style={styles.containerDay}>
                        <Text style={styles.titleH2}> Lundi</Text>
                    </View>
                    <View style={styles.containerhours}>
                        <Text style={styles.titleH2}> 10:00 -- 17:00 </Text>
                    </View>
                </View>
                <View style={styles.containerLine}>
                    <View style={styles.containerDay}>
                        <Text style={styles.titleH2}> Mardi </Text>
                    </View>
                    <View style={styles.containerhours}>
                        <Text style={styles.titleH2}> 10:00 -- 17:00 </Text>
                    </View>
                </View>
                <View style={styles.containerLine}>
                    <View style={styles.containerDay}>
                        <Text style={styles.titleH2}> Mercredi </Text>
                    </View>
                    <View style={styles.containerhours}>
                        <Text style={styles.titleH2}> 10:00 -- 17:00 </Text>
                    </View>
                </View>
                <View style={styles.containerLine}>
                    <View style={styles.containerDay}>
                        <Text style={styles.titleH2}> Jeudi</Text>
                    </View>
                    <View style={styles.containerhours}>
                        <Text style={styles.titleH2}> 10:00 -- 17:00 </Text>
                    </View>
                </View>
                <View style={styles.containerLine}>
                    <View style={styles.containerDay}>
                        <Text style={styles.titleH2}> Vendredi</Text>
                    </View>
                    <View style={styles.containerhours}>
                        <Text style={styles.titleH2}> 10:00 -- 17:00 </Text>
                    </View>
                </View>

            </View>

            {btn ? (
                <View style={styles.containerMsg}>
                    <View style={styles.containerM} >

                        <Icon name="ios-close-circle" color={'#087'} size={32} style={{ marginTop: 9 }} />

                        <View>
                            <Text style={styles.titleH4}>{msg}</Text>
                            <Text style={styles.titleH2}>{heur} </Text>
                        </View>

                    </View>

                    <TouchableOpacity style={styles.btn}
                        onPress={() => {
                            setVisible(true)
                            setFerme(false)
                            setBtn(false)
                            setMsg(' Live Resto est ouvert')
                            setHeur('fermé a 21:00')
                            setOrder('Waiting For Orders .....')
                        }
                        }
                        name='false'
                    >
                        <View>
                            <Text style={styles.titleH4}> Open Maintenent</Text>
                        </View>

                    </TouchableOpacity>

                </View>) : null}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",


    },


    titleH1: {
        fontSize: 30,
        color: "#fff",
        fontWeight: 'bold',
        marginLeft: 10,

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
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 10,
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
        width: "110%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: -8,
        justifyContent: 'center',
        alignItems: 'center'


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
        width: 380,
        padding: 10,
    },
    btnTitle: {
        fontSize: 19,
        color: "#087",
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerTow: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000989',
        padding: 10,
        marginHorizontal: 15,
        height: 400
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

    }
});
export default Ouverture;
