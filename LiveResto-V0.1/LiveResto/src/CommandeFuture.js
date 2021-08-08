import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './HomeScreen/StyleFuture'

import { AuthContext, DataContext, ShowDataOpen } from './../components/context'

import {
  View,
  Text,
  
  TouchableOpacity,
  Switch,
  Image
} from 'react-native';



const CommandeFuture = ({ navigation: { goBack } ,navigation }) => {

  
  const [isEnabled, setIsEnabled] = useState(false);
  const openData = useContext(ShowDataOpen)
  const { toggleOpen } = React.useContext(AuthContext)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (

    <View style={styles.container}>
      
      <View style={styles.containerTitle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icon name="arrow-undo-outline" color={'#fff'} size={45} />
          </TouchableOpacity>
          <View style={{width:'75%' ,justifyContent:'center',alignItems:"center"}}>
          <Text style={[ { fontSize: 24, color :'#fff',textAlign:'center',fontWeight:'bold' }]}>Commande Future </Text><Text style={{ color: '#ccc', fontSize: 14 }}>
            Consulter les commandes Terminer
             et effectuer des opérations si besion
          </Text>
          </View>
          <Icon name="ios-information-circle-outline" color={'#fff'} size={30} />
        </View>
      </View>


      

          <View style={styles.containerTow}>
            <View style={styles.containerV}>
              <Icon name="ios-restaurant-outline" color={'#087'} size={32} style={{ marginVertical: 10 }} />
              <Text style={styles.titleH4}> aucune commande terminer</Text>
            </View>

            <Text style={styles.titleH2}> les commandes livrées ou recupérées s'affficheront ici . </Text>
            
            <TouchableOpacity style={styles.btnScondary}  onPress={() => {
              navigation.navigate('Home')
            }}>
              <View >
                <Text style={styles.btnTitle}> voir les commandes en cours </Text>
              </View>
            </TouchableOpacity>
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


export default CommandeFuture;