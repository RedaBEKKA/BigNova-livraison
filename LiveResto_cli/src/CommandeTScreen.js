import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ModelContainer from './../components/ModelContainer';
import TimerLine from './../components/timerLine';
import { AuthContext, DataContext, ShowDataOpen } from './../components/context'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  FlatList,Dimensions,
} from 'react-native';



const CommandeEcrTScreen = ({ navigation: { goBack }, navigation }) => {
  const donne = useContext(DataContext)
  const myHeaders = new Headers();
  const token = donne.establishment.token
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + token);
  const [Switched, setSwitch] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ferme, setFerme] = useState(true)
  const [btn, setBtn] = useState(true)
  const [dataCmmd, setDataCmd] = useState(['']);

  const [msg, setMsg] = useState('Votre restaurant est fermé')
  const [heur, setHeur] = useState("N'oublier pas d'ouvrir a 11:00")
  const [order, setOrder] = useState(' Orders Comes when Restaurant Is Open')
  const [isEnabled, setIsEnabled] = useState(false);
  const openData = useContext(ShowDataOpen)
  const { toggleOpen } = React.useContext(AuthContext)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [count, setCount] = useState(0)
  const [confirm, setConfirm] = useState([]);
  const [etat, setEtat] = useState([]);
  const [isComfime, setIsComfime] = useState(true)
  const {width, height} = Dimensions.get('screen')





  useEffect(async () => {

    await commandeListe()

  }, [count, count == 0])


  // Methodes
  const commandeListe = async () => {
    try {
      await fetch('https://dev500.live-resto.fr/apiv2e/orders', {
        method: 'GET',
        headers: myHeaders,
      })
        .then((res) => res.json())
        .then(dataCmd => {

          setEtat(dataCmd.orders.others)
          console.log('commandeListe sccreen terminer ', confirm)


        })

    } catch (error) {
      console.log(error)
    }
  }

  const ContainerOrders = ({ item, id }) => {

    return (
      <View>

        <View style={{ marginHorizontal: 10, marginTop: 10, padding: 5 ,}}>


          {isComfime && item.kitchenstate_id == 40 ?

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
                    <View style={{ marginLeft: 5 }}>
                      <View style={{ height: 40, flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', marginLeft: 15 }}>
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Commande prête</Text>
                        <Icon name="checkmark-done" color={'#087'} size={22} style={{ marginTop: 3, marginLeft: 5 }} />

                      </View>
                    </View>

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
                      <Icon name="chevron-down-circle-sharp" color={'#087'} size={35} style={{ marginBottom: 55, marginLeft: 15 }} />
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


                    {/* <View style={{ backgroundColor: '#087', height: 35, width: 35, borderRadius: 5, justifyContent: 'center', borderWidth: 0.4, borderColor: '#fff', alignItems: 'center' }}>
                    <Icon name="md-checkmark-circle-outline" color={'#fff'} size={30} />
                </View> */}


                  </TouchableOpacity>

                </View>

              </View>
            </View>
            :
            null
          }
        </View >
      </View>
    )
  }



  return (

    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icon name="arrow-undo-outline" color={'#fff'} size={45} />
          </TouchableOpacity>
          <View style={{ width: '75%', justifyContent: 'center', alignItems: "center" }}>
            <Text style={[{ fontSize: 24, color: '#fff', textAlign: 'center', fontWeight: 'bold' }]}>Commandes Terminer </Text><Text style={{ color: '#ccc', fontSize: 14 }}>
              Consulter les commandes Terminer
              et effectuer des opérations si besion
            </Text>
          </View>
          <TouchableOpacity onPress={() => {
            setCount(count + 1)

          }}
          >
            <Icon name="ios-information-circle-outline" color={'#fff'} size={30} />

          </TouchableOpacity>

        </View>
      </View>

      {
        !openData.visible ? <View style={styles.containerTow}>
          <View style={styles.containerV}>
            <Icon name="ios-restaurant-outline" color={'#087'} size={32} style={{ marginVertical: 10 }} />
            <Text style={styles.titleH4}> aucune commande terminer</Text>
          </View>

          <Text style={styles.titleH2}> les commandes livrées ou recupérées s'affficheront ici . </Text>

          <TouchableOpacity style={styles.btnScondary} onPress={() => {
            navigation.navigate('Home')
          }}>
            <View >
              <Text style={styles.btnTitle}> voir les commandes en cours </Text>
            </View>
          </TouchableOpacity>
        </View>
          : null
      }


      {openData.visible ?
<View>


        <FlatList
          style={{ marginTop: 9,height:height*.75,backgroundColor:'#000'}}
          data={etat}
          keyExtractor={item => item.id}
          renderItem={({ item, id }) => {
            return (
              <ContainerOrders item={item} id={item.id} />
            )
          }} />
</View>






        : null}


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
    fontSize: 20,
    color: "#000",
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 20,

  }, btn: {
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

    borderRadius: 5,
    marginTop: 20
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

  containerTitle: {
    backgroundColor: '#087',

    height: 120,

    justifyContent: 'center'
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

export default CommandeEcrTScreen;