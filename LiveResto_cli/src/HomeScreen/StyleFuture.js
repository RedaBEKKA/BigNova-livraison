import { StyleSheet, Dimensions } from 'react-native';;

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
        
        borderRadius:5,
        marginTop:20
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
        marginTop:50
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
})