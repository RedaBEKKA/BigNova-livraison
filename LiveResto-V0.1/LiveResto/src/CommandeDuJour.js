import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import RedComponente from './../components/RedComponent'
import OrangeComponente from './../components/orangeComponente'
import GreenComponente from './../components/greenComponent'
import { AuthContext, DataContext, ShowDataOpen } from '../components/context'


import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  FlatList,
} from 'react-native';



const CommandeDuJour = ({ navigation: { goBack }, navigation }) => {
  const donne = useContext(DataContext)
  const myHeaders = new Headers();
  const token = donne.establishment.token
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + token);



  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const openData = useContext(ShowDataOpen)
  const { toggleOpen } = React.useContext(AuthContext)
  const [result, setResult] = React.useState('')
  const [count, setCount] = useState(0)

  const [etat, setEtat] = useState([]);
  const [isComfime, setIsComfime] = useState(false)
  const [kId, setKid] = useState('')














  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#087', paddingVertical: 20 }}>

        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="arrow-undo-outline" color={'#fff'} size={40} />
        </TouchableOpacity>

        <View style={{ width: '70%', marginLeft: 8 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Commande D'Aujourd'hui</Text>
          <Text style={{ color: '#ccc', fontSize: 14 }}>
            Consulter les commandes et effectuer des opérations si besion
          </Text>

        </View>
        <TouchableOpacity onPress={() => {
          setCount(count + 1)

        }}
        >
          <Icon name="md-stopwatch" color={'#fff'} size={35} />

        </TouchableOpacity>

      </View>






      {openData.btn ? (

        <View >
          <View style={styles.containerTow}>
            <View style={styles.containerV}>
              <Icon name="md-warning" color={'#087'} size={32} style={{ marginVertical: 10 }} />
              <Text style={styles.titleH4}> Aucune Commande </Text>
            </View>

            <Text style={[styles.titleH2, { color: '#ccc', fontSize: 16 }]}> les commandes s'affficheront ici . </Text>
            <TouchableOpacity style={styles.btnScondary} >
              <View >
                <Text style={styles.btnTitle}> Voir les commandes  </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      ) :

        <View>
          <Text style={{ color: '#fff' }}>hello world</Text>


        </View>



      }


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

        </View>) : null}


      {!openData.btn ? (

        <TouchableOpacity style={{ position: 'absolute', right: -11, bottom: 20, marginHorizontal: 20, height: 50, width: 50, backgroundColor: '#fff', borderColor: '#078', borderWidth: 1, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => { navigation.navigate('Home') }}
        >
          <View >
            <Icon name="ios-home" color={'#078'} size={32} />
          </View>
        </TouchableOpacity>
      )

        : null}
    </View>
  )
}

export default CommandeDuJour;


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
    borderRadius: 5
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
    marginTop: 50
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