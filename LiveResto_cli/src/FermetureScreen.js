import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './../components/ModelContainer';
import { AuthContext, DataContext, ShowDataOpen } from './../components/context'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

const FermetureScreen=({ navigation: { goBack }, navigation })=> {

  const [Switched, setSwitch] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ferme, setFerme] = useState(true)
  const [btn, setBtn] = useState(true)
  const [msg, setMsg] = useState('Votre restaurant est fermé')
  const [heur, setHeur] = useState("N'oublier pas d'ouvrir a 11:00")
  const [order, setOrder] = useState(' Orders Comes when Restaurant Is Open')
  const [isEnabled, setIsEnabled] = useState(false);
  const openData = useContext(ShowDataOpen)
  const { toggleOpen } = React.useContext(AuthContext)


  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
 
  return (
    <View style={styles.container}>
        <View>
            <View style={styles.containerTitle}>
                <View style={[styles.container1,{flexDirection:"row",alignItems:'center'}]}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon name="arrow-undo-outline" color={'#fff'} size={45}  />
                    </TouchableOpacity>
                    <View>
                    <Text style={[styles.titleH1,{fontSize:25}]}>Fermeture Exeptionnelles</Text>
                    <Text style={[styles.titleH3,{fontSize:16,color:'#ccc',paddingHorizontal:5}]}>Pour ajouter modifier vos horaires de Fermeture Exeptionnelles , aller dans les paramertres de votre portail Restaurant
                    </Text>
                    </View>
                    
                </View>
            </View>
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
                        <View>
                            <Image
                                source={require('../assets/calender.png')}
                                style={{ height: 120, width: 120, margin: 10, alignSelf: 'center' }}
                            />
                        </View>
                        <Text> Aucun jour de fermeture exceptionelles dans votre calendrier</Text>
                        <TouchableOpacity style={styles.btnScondary}

                        >
                            <View>
                                <Text style={styles.btnTitle}> ajouter une date</Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>

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
                    <Icon name="ios-home" color={'#078'} size={32} />
                </View>
            </TouchableOpacity>

        }

    </View>
)
}

export default FermetureScreen;


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
      fontSize: 27,
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
      backgroundColor: '#000',
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
      paddingVertical: 10,
      paddingHorizontal: 10,
      margin: 0,
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
  container1: {
      width: 380,
      padding: 10,
  },
  btnTitle: {
      fontSize: 19,
      color: "#fff",
      textAlign: 'center',
      fontWeight: 'bold',
  },
  containerTow: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000233',
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

  }, containerMsg: {

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