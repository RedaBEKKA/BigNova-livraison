import CountDown from 'react-native-countdown-component';
import React from 'react';

const CountDownTime = () =>{
 
  return (
    <CountDown
      size={25} 
      until={10000}
      onFinish={() => alert('Finished')}
      digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
      digitTxtStyle={{color: '#1CC625'}}
      timeLabelStyle={{color: '#fff', fontWeight: 'bold'}}
      separatorStyle={{color: '#078'}}
      timeToShow={['H', 'M', 'S']}
      timeLabels={{ h:'Hours',  m: 'Minut', s: 'Second'}}
      showSeparator
    />
  )

}
 export default CountDownTime;