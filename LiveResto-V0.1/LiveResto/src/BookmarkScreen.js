import React,{useState,useEffect} from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView,FlatList,ActivityIndicator,TouchableOpacity,ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Card } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Button} from "native-base"

import { DataTable } from 'react-native-paper';
import HTML from "react-native-render-html"
const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
 
  
  const [Data,setData] = useState([""])
  const [deliv,setDeliv]=useState([])
 const [loading,setLoading]=useState(true)

const myHeaders = new Headers();
const token='8576b257-8e65-4d1b-95c2-47afba421c21'
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer '+token);
 
  useEffect(() => {
    fetch('https://dev500.live-resto.fr/apiv2e/orders',{
      method: 'GET',
      headers: myHeaders,
    })//10029
    .then((res)=>res.json())
    .then(data=>{
      //console.log(data.orders.toConfirm)
      setData(data)  
      data.orders.toConfirm.map((i,key)=>{
      alert(data.orders.toConfirm[key].delivery.full_name)
        
              
      // setDeliv(data.orders.toConfirm[key].delivery.delivery_price)
      })
      
     
      // data.orders.toConfirm.map((i)=>{
      //   alert(data.orders.toConfirm[i].delivery.phone);
      //   alert(data.orders.toConfirm[0].delivery.phone);
      //     setData(data.orders.toConfirm[i])
      //     setDeliv(i.delivery)
        
      //  // 
      // })
    
      
    })
    .catch(err=>console.log(err))
      .finally(
        
        setLoading(false)
        
        )

  }, [])

   const htmlContent = `
   <h1>Nos commandes </h1>
  
   
`;
//const contentWidth = useWindowDimensions().width;
    return (
      <ScrollView>
            <View style={styles.container}>

            
            {/* <Text>Salut{Data.id}</Text> */}

           

        
            <View style={styles.cardsWrapper}>
                
            

            <HTML source={{ html: htmlContent }}  />

               

                <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Les commandes</DataTable.Title>
                      <DataTable.Title numeric>Le prix</DataTable.Title>
                      <DataTable.Title numeric>Le téléphone</DataTable.Title>
                    </DataTable.Header>

                 
                    
                    <DataTable.Row>
                      <DataTable.Cell></DataTable.Cell>
                      <DataTable.Cell numeric></DataTable.Cell>
                      <DataTable.Cell numeric></DataTable.Cell>
                    </DataTable.Row>

                  

                    

                    <DataTable.Pagination
                      page={1}
                      numberOfPages={3}
                      onPageChange={page => {
                        console.log(page);
                      }}
                      label="1-2 of 6"
                    />
                  </DataTable>
                 
                      <Text>{Data[0]}</Text>
                 
                
            </View>


            </View>
      </ScrollView>
      
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#de4f35',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
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
});
