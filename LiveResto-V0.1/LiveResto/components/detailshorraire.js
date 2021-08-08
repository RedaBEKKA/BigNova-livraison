import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
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
    TextInput,
    ScrollView,
    Modal
} from 'react-native';


const DetailsSetTime = ({ navigation, route }) => {
    const days = route.params
    const [isVisible,setIsVisible] = useState (false)
    const [textItem,setTextItem] = useState()
    const[editItem,setEditItem]= useState()
    const [data , setData] = useState(days)
    const onPresseSave = () => {
        handelEditiItem(editItem)
        setIsVisible(false)
    }

    const handelEditiItem=(editItem)=>{
          if (days.id == editItem){
                days.debutj = textItem   
            }
        
        setData(data)

    }
    const editTime = ( ) => {
        setIsVisible(true)
        setTextItem(days.debutj)
        setEditItem(days.id)
    }
    return (
        <View style={styles.container}>
            <View>

                <View style={[styles.containerTitle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }]}>
                    <Text style={[styles.titleH1, { fontSize: 22 }]}> Paramètre Horaires D'ouverture</Text>
                    <Icon name="settings" color={'#fff'} size={36} />
                </View>



                <View style={{ justifyContent: 'center', alignItems: 'center', width: '90%', height: 50, backgroundColor: '#eee', marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{days.jour}</Text>
                </View>

                <View style={{ padding: 10, alignItems: 'center' }}>


                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Le Matin </Text>

                        <View style={{ marginTop: 10, padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Modifier votre temps de rentrer :
                                <TouchableOpacity onPress={()=> {editTime()}}>
                                    <Text>
                                        {days.debutj}
                                    </Text>

                                </TouchableOpacity>

                            </Text>
                        </View>
                        <View style={{ marginTop: 10, padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Modifier votre temps de sortir :
                                <TouchableOpacity>
                                    <Text>{days.finj}</Text>

                                </TouchableOpacity>

                            </Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Le Soir</Text>
                        <View style={{ marginTop: 10, padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Modifier votre temps de rentrer :
                                <TouchableOpacity>
                                    <Text>{days.debuts}</Text>


                                </TouchableOpacity>

                            </Text>
                        </View>
                        <View style={{ marginTop: 10, padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Modifier votre temps de sortir :

                                <TouchableOpacity>
                                    <Text>{days.fins}</Text>

                                </TouchableOpacity>
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity>
                    <View style={{ width: '90%', backgroundColor: '#087', height: 45, borderRadius: 10, justifyContent: "center", alignItems: 'center', alignSelf: 'center', marginTop: 30 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
                            Sauvgarder
                        </Text>
                    </View>

                </TouchableOpacity>




            </View>

            <Modal
                animationType='fade'
                visible={isVisible}
                onRequestClose={()=>setIsVisible(false)}
            >
                <View>
                    <Text> change time :</Text>
                     <TextInput
                        placeholder='enter time '
                        onChangeText={(text)=> setTextItem(text)}
                        defaultValue={textItem}
                        editable={true}
                        multiline={false}
                        maxLength={5}
                     
                     />

                     <TouchableOpacity
                        onPress={()=> onPresseSave()}
                     >
                         <Text>
                             Ajouter
                         </Text>
                     </TouchableOpacity>
                </View>
                

            </Modal>








        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",


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
    containerMsg: {
        padding: 3,
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center'
    },

    containerM: {
        padding: 16,
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

    },
});
export default DetailsSetTime