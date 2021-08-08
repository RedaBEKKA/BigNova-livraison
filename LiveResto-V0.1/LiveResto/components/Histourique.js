import React, { useState, useContext, useEffect } from 'react';
import { AuthContext, DataContext, ShowDataOpen } from './context'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './ModelContainer';
import moment from 'moment';
import 'moment/locale/fr'
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


const Historique = ({ navigation: { goBack }, route, navigation }) => {
    const [Switched, setSwitch] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ferme, setFerme] = useState(true)
  const [btn, setBtn] = useState(true)
  const [msg, setMsg] = useState('Votre restaurant est fermé')
  const [heur, setHeur] = useState("N'oublier pas d'ouvrir a 11:00")
  const [order, setOrder] = useState(' Orders Comes when Restaurant Is Open')
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const openData = useContext(ShowDataOpen)
  const { toggleOpen } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#087', paddingVertical: 20 }}>
        
        <TouchableOpacity onPress={() => goBack()}>
            <Icon name="arrow-undo-outline" color={'#fff'} size={45} />
          </TouchableOpacity>

        <View style={{ width: '70%' ,marginLeft:15}}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Toutes les commandes </Text>
          <Text style={{ color: '#ccc', fontSize: 14 }}>
            Consulter les commandes et effectuer des opérations si besion
          </Text>

        </View>
        <Icon name="save" color={'#fff'} size={30} />

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
      
      <View>
        <View style={styles.containerTow}>
          <View style={styles.containerV}>
            <Icon name="md-warning" color={'#087'} size={32} style={{ marginVertical: 10 }} />
            <Text style={styles.titleH4}> Aucune Commande </Text>
          </View>

          <Text style={[styles.titleH2,{color:'#ccc',fontSize:16}]}> les commandes s'affficheront ici . </Text>
          <TouchableOpacity style={styles.btnScondary} >
            <View >
              <Text style={styles.btnTitle}> Voir les commandes  </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {openData.btn ? (

        <View style={styles.containerMsg}>
          <View style={[styles.containerM, { marginHorizontal: 5 }]} >
            <Icon name="md-information-circle" color={'#087'} size={45} style={{ marginTop: 8, marginLeft: -25 }} />
            <View>
              <Text style={[styles.titleH3, { fontWeight: 'bold', }]}>{openData.msg}</Text>
              <Text style={[styles.titleH3, { fontSize: 17, marginVertical: 3, color: '#ccc' }]}>{openData.heur} </Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.btn, { marginVertical: 10, borderRadius: 25 }]} onPress={() => { toggleOpen() }}>
            <View>
              <Text style={[styles.titleH3, { fontSize: 23, textAlign: 'center', fontWeight: 'bold', }]}> Ouvrir Maintenent </Text>
            </View>
          </TouchableOpacity>


        </View>

      ) :
        

          <TouchableOpacity style={{ position: 'absolute', right: -11, bottom: 0, marginHorizontal: 20, height: 50, width: 50, backgroundColor: '#fff', borderColor: '#078', borderWidth: 1, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}
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




const styles = StyleSheet.create({
  container: {
    flex: 1,


    backgroundColor: '#000',

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
    fontSize: 30,
    color: "#fff",
    fontWeight: 'bold',
    marginLeft: 20,

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
    marginVertical: 20,
    borderRadius:5
  },
  containerTimer: {
    marginTop: 20,

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


  titleH3: {
    fontSize: 18,
    color: "#fff",


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
  icon: {
    fontSize: 20,
    color: "#fff",
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 11,
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
    marginTop:50
  },

  containerM: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    borderColor: '#fff',
    marginBottom: 5,
    padding: 10,
    width: '100%'


  },
  containerMsg: {

    position: "absolute",
    bottom: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 15

  },
});

export default Historique;