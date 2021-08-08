
import { ActivityIndicator, View, Alert } from "react-native"

import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper"
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from "./src/MainTabScreen"
import { DrawerContent } from "./src/DrawerContent"
import SupportScreen from "./src/SupportScreen"
import SettingsScreen from "./src/SettingsScreen"
import ExploreScreen from "./src/ExploreScreen"
import RootStackScreen from "./src/RootStackScreen"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext, DataContext, CommandContext, ShowDataOpen, DataStatusContext } from "./components/context"
import CommandeEcrTScreen from "./src/CommandeTScreen";
import CommandeEcrScreen from "./src/CommandeScreen";
import HoraireScreen from "./src/HoraireScreen";
import FermetureScreen from "./src/FermetureScreen";
import AllCmd from "./components/toutLesCommande";
import HoraireSetting from "./components/settignHoraire"
import HomeScreen from './src/HomeScreen'
import EtatCommande from './src/etatCmd'
import DetailsSetTime from './components/detailshorraire'
import InfoScreen from './components/infoScreen';
import infoImpression from "./components/infoImpression";
import Impression from './components/impression'
import Imprission from './components/imprission'
import Historique from "./components/Histourique"
import InfoScreenToConfirm from './src/InfoScreenToConfirm'
import CommandeFuture from './src/CommandeFuture'
import CommandeDuJour from './src/CommandeDuJour'

const Drawer = createDrawerNavigator()


const App = () => {

  const myHeaders = new Headers();
  const token = '8576b257-8e65-4d1b-95c2-47afba421c21'
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + token);



  //const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    login: null,
    password: null,
    userToken: null,
  };
  const [donne, setDonne] = React.useState([]);
  
  const [openData, setOpenData] = React.useState({
    visible: false,
    visiblealr:false,
    ferme: true,
    btn: true,
    heur: "N'oublier pas d'ouvrir a 12:00",
    msg: 'Votre restaurant est fermé',
  });

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.tokenId,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          login: action.id,
          password: action.idPass,
          userToken: action.tokenId,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          login: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          password: action.idPass,
          userToken: action.tokenId,
          isLoading: false,
        };
    }
  };


  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);



  const authContext = React.useMemo(() => ({
    signIn: async (login, password) => {
      let userToken;

      userToken = null;

      if (login != '' && password != "") {
        console.log(login, password, 'nom et password')
        await fetch('https://dev500.live-resto.fr/apiv2e/establishments/authenticate', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            'login': login,
            'password': password
          })
        })
          .then(res => {
            if (!res.ok) {
              alert('Erreur de connection ')
              throw new Error('Network response was not ok')
            }
            return res.json()
          }
          )

          .then(resData => {
            console.log('resData.establishment.title ||||||||||||| ', resData.establishment.id)
            console.log('resData.establishment.token ||||||||||||| ', resData.establishment.token)
            setDonne(resData)
            try {
              userToken = 'fgkj'
               AsyncStorage.setItem('userToken', userToken);
               AsyncStorage.setItem('login', login);
               AsyncStorage.setItem('password', password);
              console.log('user token fcnt', userToken, login, password)


            } catch (e) {
              console.log(e);
            }


            //setItemasync(userToken,login,password)
            dispatch({ type: 'LOGIN', id: login, tokenId: userToken, idPass: password });

          })
      }
    },


    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });

    },
    signUp: () => {
      setUserToken('fgkj');
      setIsLoading(false);
    },

    toggleOpen: () => {
      setOpenData({
        ...openData,
        visible: true,
        ferme: false,
        visiblealr:true,
        btn: false,
        heur: 'fermé a 21:00',
        msg: 'Live Resto est ouvert',

      })
    },
    toggleOff: () =>
      setOpenData({
        ...openData,
        visible: false,
        visiblealr:false,
        ferme: true,
        btn: true,
        heur: "N'oublier pas d'ouvrir a 12:00",
        msg: 'Votre restaurant est fermé',

      }),
      toggleOffAlert:()=>
      setOpenData({
        ...openData,
        ferme:false,
        visiblealr:false,

        visible: false,
        btn: true,
        heur: "N'oublier pas d'ouvrir a 12:00",
        msg: 'Votre restaurant est fermé',
      }), 
       toggleOpenAlertOpen:()=>
      setOpenData({
        ...openData,
        ferme:false,
        visible: true,
        visiblealr:false,
        btn: false,
      })

  }), []);




  useEffect(() => {
    setTimeout(async () => {
     
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userLogin = await AsyncStorage.getItem('login');
        userPassword = await AsyncStorage.getItem('password');
        await fetch('https://dev500.live-resto.fr/apiv2e/establishments/authenticate', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            'login': userLogin,
            'password': userPassword
          })
        })
          .then(res => {
            if (!res.ok) {

              throw new Error('Network response was not ok')
            }
            return res.json()
          }
          )

          .then(resData => {
            console.log('resData.establishment.title |||||||||||||2 ', resData.establishment.id)
            console.log('resData.establishment.token |||||||||||||2 ', resData.establishment.token)
            setDonne(resData)
            setUserToken('fgkj');
          })
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', tokenId: userToken });
    }, 1000);
  }, []);



  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <PaperProvider>
      <AuthContext.Provider value={authContext}>
        <DataContext.Provider value={donne}>

          <ShowDataOpen.Provider value={openData}>
            <NavigationContainer >
              {loginState.userToken !== null ? (
                <Drawer.Navigator drawerContent={props =>
                  <DrawerContent {...props} />}>
                  {/* <Drawer.Screen name="Home" component={MainTabScreen} /> */}
                  <Drawer.Screen name="HomeScreen" component={HomeScreen} />
                  <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                  <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                  <Drawer.Screen name="EtatCommande" component={EtatCommande} />
                  <Drawer.Screen name="ExploreScreen" component={ExploreScreen} />
                  <Drawer.Screen name="CommandeEcrTScreen" component={CommandeEcrTScreen} />
                  <Drawer.Screen name="CommandeEcrScreen" component={CommandeEcrScreen} />
                  <Drawer.Screen name="HoraireScreen" component={HoraireScreen} />
                  <Drawer.Screen name="FermetureScreen" component={FermetureScreen} />
                  <Drawer.Screen name="AllCmd" component={AllCmd} />
                  <Drawer.Screen name="HoraireSetting" component={HoraireSetting} />
                  <Drawer.Screen name="DetailsSetTime" component={DetailsSetTime} />
                  <Drawer.Screen name="InfoScreen" component={InfoScreen} />
                  <Drawer.Screen name="infoImpression" component={infoImpression} />
                  <Drawer.Screen name="Impression" component={Impression} />
                  <Drawer.Screen name="Imprission" component={Imprission} />
                  <Drawer.Screen name="Historique" component={Historique} />
                  <Drawer.Screen name="InfoScreenToConfirm" component={InfoScreenToConfirm} />
                  <Drawer.Screen name="CommandeFuture" component={CommandeFuture} />
                  <Drawer.Screen name="CommandeDuJour" component={CommandeDuJour} />
                  
                </Drawer.Navigator>)
                :
                <RootStackScreen />
              }
            </NavigationContainer>
          </ShowDataOpen.Provider>

        </DataContext.Provider>
      </AuthContext.Provider>
    </PaperProvider>

  );
};

export default App;

