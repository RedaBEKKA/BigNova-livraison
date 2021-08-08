import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Swiper from "react-native-swiper"

const {width, height} = Dimensions.get('screen')

const SupportScreen = ({ navigation: { goBack }, navigation }) => {
  const list = [
    {
      title: 'Retarder la commande',
      icon: 'calendar-times-o'
    },
    {
      title: 'Ajustement du prix',
      icon: 'eur'
    },
    {
      title: 'Contacter le client',
      icon: 'user'
    },
    {
      title: 'Annuler la commande',
      icon: 'angle-right'
    },

  ]
  return (

    <View>


      <View style={{height:height*.9,backgroundColor:'#fff'}}>

        <View style={styles.containerTitle}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 120, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => { goBack() }}>
              <Icon name="arrow-undo-outline" color={'#fff'} size={39} />
            </TouchableOpacity>
            <View><Text style={styles.titleH1}> Aide</Text></View>

          </View>

          <View><Icon name="md-help-circle" color={'#fff'} size={36} /></View>

        </View>


        <View style={styles.sliderContainer}>

          <Swiper autoplay horizental={false} height={200} activeDotColor="#5dbca3" >
            <View style={styles.slide}>
              <Image
                source={require('../assets/banners/food-banner1.jpg')}
                resizeMode='cover'
                style={styles.sliderImage}
              />

            </View>
            <View style={styles.slide}>
              <Image
                source={require('../assets/banners/food-banner2.jpg')}
                resizeMode='cover'
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require('../assets/banners/food-banner3.jpg')}
                resizeMode='cover'
                style={styles.sliderImage}
              />
            </View>

          </Swiper>


        </View>
      


        <View>
          <TouchableOpacity style={styles.containerRowTitle}>
            <Icon name="md-restaurant" color={'#087'} size={34} />
            <Text style={styles.bigtitre}>Live Resto</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '98%', marginLeft: 7, padding: 10 }}>
          <Text style={styles.bigtitre}> Conseils et réponses de l'équipe <Text style={{ color: '#087' }}> Live Resto</Text> </Text>
        </View>
        <View
          style={{
            height: 50,
            width: '80%',
            backgroundColor: '#ccc',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            marginTop: 10,

          }}>
          <View style={{ margin: 10, marginLeft: 20 }}>
            <Icon name="md-search" color={'#078'} size={24} />
          </View>

          <TextInput

            placeholder={'recherche des repense'}
            style={styles.textInput}
            placeholderTextColor='#000'


          />
        </View>









      </View>

      <View style={{ alignSelf: 'flex-end', position: 'absolute', bottom: -60 }}>
        <View style={styles.containerRowBig}>
          <TouchableOpacity style={styles.containerRow}>
            <Icon name="ios-open-outline" color={'#078'} size={24} />
            <Text style={styles.titleH3}>Aller sur Resto Live</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>

  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',

  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',


  },
  containerRowBig: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    padding: 10,
  },

  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  head: { height: 40, backgroundColor: '#f1f8ff' },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  containerTitle: {
    backgroundColor: '#087',
    width: "100%",
    height: 100,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 23,

  },

  titleH1: {
    fontSize: 26,
    color: "#fff",
    fontWeight: 'bold',
    marginLeft: 1,

  },
  titleH3: {
    fontSize: 15,
    color: "#000",
    paddingHorizontal: 8,
    fontWeight: '700'

  },
  titleH3s: {
    fontSize: 15,
    color: "#fff",
    padding: 5,
    fontWeight: '700'
  },
  containerRowS: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  bigtitre: {
    fontSize: 30,
    color: '#000',
    margin: 10,
    fontWeight: '700',

  },
  containerRowTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  textInput: {


    width: '80%',
    backgroundColor: '#ccc',
    color: '#000',
  },


});
