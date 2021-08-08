
import React, { useState, useContext ,useEffect} from 'react';

import ModelContainer from './ModelContainer';

import { 
    
  
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    } 
    from 'react-native';

const ModeleClosed =() =>{

    const [ferme,setFerme] = useState(true)
    const [msg ,setMsg] = useState('Votre restaurant est fermé')

    return ( 
        
        
    <ModelContainer
        transparent 
        visible={ferme}
    >
        <View style={{alignItems: 'center'}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setFerme(false)}>
                    <Image
                        source={require('../assets/x.jpg')}
                        style={{height: 30, width: 30}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    <View style={{alignItems: 'center'}}>
        <Image
            source={require('../assets/x.jpg')}
            style={{height: 150, width: 150, marginVertical: 10}}
        />
    </View>
        <Text  style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
        {msg} 
        </Text>
    </ModelContainer>
    )
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})

export default ModeleClosed ;