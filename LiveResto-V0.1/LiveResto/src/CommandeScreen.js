import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './../components/ModelContainer';
import { AuthContext, DataContext, ShowDataOpen } from './../components/context'

import TimerLine from './../components/timerLine';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  FlatList,
} from 'react-native';



const CommandeEcrScreen = ({ navigation: { goBack }, navigation }) => {
  const donne = useContext(DataContext)
    const myHeaders = new Headers();
    const token = donne.establishment.token
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
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
  const [result, setResult] = React.useState('')
  const [count, setCount] = useState(0)
  const [confirm, setConfirm] = useState([]);
  const [etat, setEtat] = useState([]);
  const [isComfime, setIsComfime] = useState(false)
  const [kId, setKid] = useState('')





  // Methodes
  const commandeListe = async () => {
    try {
      await fetch('https://dev500.live-resto.fr/apiv2e/orders', {
        method: 'GET',
        headers: myHeaders,
      })
        .then((res) => res.json())
        .then(dataCmd => {
          //setDataCmd(dataCmd.orders.others)
          setEtat(dataCmd.orders.others)

          console.log('token ', token)
          console.log('token ', token)



        })

    } catch (error) {
      console.log(error)
    }
  }

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


  useEffect(async () => {

    await commandeListe()


  }, [count, count == 0])


  const ContainerOrders = ({ item, id }) => {
    const colorT = item.kitchenstate_id == 30 ? '#ff851b' : '#078'
    return (
      <View>
        <View style={{ marginHorizontal: 10, marginTop: 25, marginBottom: 15 }}>

          {isComfime && item.kitchenstate_id == 30 ?

            <View style={{
              width: '100%',
              padding: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#087',
              backgroundColor: '#0d0101'
            }}>

              <View style={{ width: 90, height: 30, zIndex: 2, backgroundColor: '#087', justifyContent: 'center', borderRadius: 5, position: 'absolute', top: -16, left: 15, borderColor: '#000', borderWidth: 3 }}>
                <Text style={[{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', color: '#fff' }]}> # {item.id}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }} >

                <View style={{ marginVertical: 10 }}>

                  <View style={{ marginLeft: 5 }}>
                    <Text style={[{ marginTop: 0, color: '#fff', fontSize: 15 }]}> <Text style={{ marginTop: 0, color: '#fff', fontSize: 18, fontWeight: 'bold' }}> 2 Article </Text></Text>
                    <Text style={[{ marginTop: 0, color: '#fff', fontSize: 15 }]}> <Text style={{ marginTop: 0, color: '#fff', fontSize: 18, fontWeight: 'bold' }}> Totale </Text>: {item.total} €</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                    <Icon name="ios-navigate" color={'#078'} size={19} style={{ marginTop: 3 }} />
                    <Text style={{ color: '#fff', fontSize: 15, paddingHorizontal: 3, marginTop: 3 }}> Aucun livreur n'a encore été trouver</Text>
                  </View>
                </View>

                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => {

                      navigation.navigate("InfoScreen", { item, token: token })

                    }
                    }
                  >


                    <View>
                      <Icon name="chevron-down-circle-sharp" color={'#087'} size={30} style={{ marginBottom: 15, marginLeft: 5 }} />
                    </View>


                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {



                      setCount(count + 1)
                      console.log(count)
                      valider(id) //send to cuisine 30 kitchen state id = 40||30

                      {
                        result &&
                          setIsComfime(true)
                        console.log('id ffffff', id, item.kitchenstate_id)
                      }

                    }
                    }
                  >


                    <View style={{ backgroundColor: '#087', height: 35, width: 35, borderRadius: 5, justifyContent: 'center', borderWidth: 0.4, borderColor: '#fff', alignItems: 'center' }}>
                      <Icon name="md-checkmark-circle-outline" color={'#fff'} size={30} />
                    </View>


                  </TouchableOpacity>

                </View>

              </View>
            </View>
            :
            <View style={{
              width: '100%',
              padding: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#ff851b',
              backgroundColor: '#0d0101'
            }}>

              <View style={{ width: 90, height: 30, zIndex: 2, backgroundColor: '#ff851b', justifyContent: 'center', borderRadius: 5, position: 'absolute', top: -16, left: 15, borderColor: '#000', borderWidth: 3 }}>
                <Text style={[{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', color: '#fff' }]}> # {item.id}</Text>
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }} >

                <View style={{ marginVertical: 10 }}>
                  {/* <Text style={[styles.titleH4s, { marginTop: 3 }]}> Date  : {item.for_when}</Text> */}
                  <View style={{ marginLeft: 5 }}>
                    <Text style={[{ marginTop: 0, color: '#fff', fontSize: 15 }]}> <Text style={{ marginTop: 0, color: '#fff', fontSize: 18, fontWeight: 'bold' }}> 2 Article </Text></Text>

                    <Text style={[{ marginTop: 0, color: '#fff', fontSize: 15 }]}> <Text style={{ marginTop: 0, color: '#fff', fontSize: 18, fontWeight: 'bold' }}> Totale </Text>: {item.total} €</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                    <Icon name="ios-navigate" color={'#078'} size={19} style={{ marginTop: 3 }} />
                    <Text style={{ color: '#fff', fontSize: 15, paddingHorizontal: 3, marginTop: 3 }}> Aucun livreur n'a encore été trouver</Text>
                  </View>
                </View>

                <View style={{}}>

                  <TouchableOpacity
                    onPress={() => {

                      navigation.navigate("InfoScreen", { item, token: token })

                    }
                    }
                  >


                    <View>
                      <Icon name="chevron-down-circle-sharp" color={'#087'} size={30} style={{ marginBottom: 30, marginLeft: 5 }} />
                    </View>

                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{}}
                    onPress={() => {

                      setCount(count + 1)
                      console.log(count)
                      setKid(item.kitchenstate_id)
                      console.log('item.kitchenstate_id ************* ', kId)
                      valider(id) //send to cuisine 30 kitchen state id = 40||30

                      {
                        result &&
                          setIsComfime(true)
                        console.log('id ffffff', id, item.kitchenstate_id)

                      }

                    }
                    }
                  >
                    <View style={{ backgroundColor: '#ff851b', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5, height: 35, width: 35, borderColor: '#fff', borderWidth: 0.4 }}>
                      <Icon name="md-checkmark-circle-outline" color={'#fff'} size={28} style={{ marginTop: 0, }} />
                    </View>

                  </TouchableOpacity>

                </View>

              </View>
            </View>
          }



        </View >

      </View>
    )
  }




  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#087', paddingVertical: 20 }}>

        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="arrow-undo-outline" color={'#fff'} size={40} />
        </TouchableOpacity>

        <View style={{ width: '70%', marginLeft: 8 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Commande En Prépartion</Text>
          <Text style={{ color: '#ccc', fontSize: 14 }}>
            Consulter les commandes et effectuer des opérations si besion
          </Text>

        </View>
        <Icon name="md-stopwatch" color={'#fff'} size={35} />

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
          <FlatList
            style={{ height: 578, bottom: 0, marginHorizontal: 3, marginBottom: 5, width: '98%', backgroundColor: '#000' }}
            data={etat}
            keyExtractor={item => item.id}
            renderItem={({ item, id }) => {
              return (
                <ContainerOrders item={item} id={item.id} />
              )
            }} />



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

export default CommandeEcrScreen;


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