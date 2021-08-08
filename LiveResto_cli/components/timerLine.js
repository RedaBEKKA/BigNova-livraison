// App.js
import { Row } from "native-base";
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import BackgroundTimer from "react-native-background-timer"
import { TextInput } from "react-native-paper";
import ModelContainer from './ModelContainer';
import Icon from 'react-native-vector-icons/Ionicons';

import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from "react-native";

const TimerLine = ({timerOn,input,secondsLeft,setSecondsLeft}) => {
  // const [secondsLeft, setSecondsLeft] = useState(3601);

  //const [input, setInput] = useState(secondsLeft)

  // const [timerOn, setTimerOn] = useState(false);

 



  // Runs when timerOn value changes to start or stop timer
  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  // Checks if secondsLeft = 0 and stop timer if so
  useEffect(() => {
    if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer()
  }, [secondsLeft])

  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60)
    let mins = Math.floor((secondsLeft / 60) % 60)
    let seconds = Math.floor(secondsLeft % 60)
    let displayHours = hours < 10 ? `0${hours}` : hours
    let displayMins = mins < 10 ? `0${mins}` : mins
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds
    return {
      displayHours,
      displayMins,
      displaySecs,
    }
  }


  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs - 1
        else return 0
      })
    }, 1000)
  }


  const currentDate = secondsLeft;
  return (

    <View style={styles.containerH}>

      <View  style={styles.time}>
        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>
          {clockify().displayHours} H {clockify().displayMins} Min {" "}
          {clockify().displaySecs} Sec
        </Text>
      </View>

      {/* <TouchableOpacity style={{backgroundColor:'#087',borderBottomRightRadius:26,borderTopRightRadius:26,width:90}}
       onPress={() => setVisibleAll(true)}>
        <View>
          <Text style={[ { fontSize: 17,color:'#fff',paddingVertical:8,textAlign:'center',fontWeight:'bold' }]}> Modifier </Text>
        </View>
      </TouchableOpacity> */}


    



    </View>



  )
}
const styles = StyleSheet.create({
  containerH: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    
    
    alignSelf:'center',
   
   
    
  },
  time: {
    paddingVertical: 8,
    justifyContent:'center',
    alignItems:'center',
  },
  btn: {
    width: '30%',
    height: 45,
    backgroundColor: '#087',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 26,
  },

  titleH3: {
    fontSize: 18,
    color: "#fff",
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleH1: {
    fontSize: 20,
    color: "#fff",
    
  },
  timeChose: {
    margin: 5,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#000'
  }
})
export default TimerLine