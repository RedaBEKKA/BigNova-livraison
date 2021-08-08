import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

import { Dimensions } from 'react-native';

const SettingsScreen = (props) => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const list = [
    {
      title: "Information sur l'entreprise",
      icon: 'chevron-right'
    },


  ]

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={{ backgroundColor: '#087', flexDirection:'row',justifyContent:'space-between', alignItems:'center',height:120,paddingHorizontal:10 }}>
          <View >
            <Text style={[{ fontSize: 31, color: '#fff', fontWeight: 'bold' }]}>Paramètres</Text>
            <Text style={[{ fontSize: 14, color: '#ccc', width: '90%' }]}>Gérez toutes les Paramètres dans cette page</Text>
          </View>
          <View>
            <Icon name="settings" color={'#fff'} size={35} />
          </View>
        </View>


        <View style={{ padding: 10 }}>
          <ListItem style={{ marginTop: 20, }} onPress={() => { props.navigation.navigate('AllCmd') }} bottomDivider >
            <Icon name="md-cart" color={'#087'} size={34} />
            <Text style={{ fontSize: 16, color: '#000' }}>Paramètre de toutes les commandes </Text>
          </ListItem>
          <ListItem style={{ marginTop: 15, }} onPress={() => { props.navigation.navigate('HoraireSetting') }} bottomDivider >
            <Icon name="alarm" color={'#087'} size={34} />
            <Text style={{ fontSize: 16, color: '#000' }}>Paramètre des Horaires du travaille</Text>
          </ListItem>
          <ListItem style={{ marginTop: 15, }} onPress={() => { props.navigation.navigate('Imprission') }} bottomDivider >
            <Icon name="print" color={'#087'} size={34} />
            <Text style={{ fontSize: 16, color: '#000' }}>Paramètre Imprimante </Text>
          </ListItem>
          <ListItem style={{ marginTop: 15, }} onPress={() => { props.navigation.navigate('ExploreScreen') }} bottomDivider >
            <Icon name="md-information-circle" color={'#087'} size={34} />
            <Text style={{ fontSize: 16, color: '#000' }}>Instruction  !</Text>
          </ListItem>
        </View>

        <View style={{ marginTop: 30, padding: 5 }}>
          {
            list.map((item, i) => (
              <ListItem key={i} bottomDivider >
                <FontAwesome name={item.icon} />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))

          }

        </View>



      </ScrollView>

    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
  card: {
    height: 130,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 25,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
    padding: 1,

  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    padding: 15,
  },
  cardInfo: {
    flex: 2,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  containerTitle: {
    backgroundColor: '#087',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 25,
  },


  titleH1: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 'bold',
    marginLeft: 5,

  },
  titleH3: {
    fontSize: 13,
    color: "#fff",
    marginLeft: 10,
  },
  titleH4: {
    fontSize: 20,
    color: "#000",
    textAlign: 'center',
    fontWeight: 'bold',

  },
});
