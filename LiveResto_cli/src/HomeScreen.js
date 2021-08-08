import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/FontAwesome';
import ModelContainer from './../components/ModelContainer';
import { AuthContext, DataContext, ShowDataOpen } from './../components/context'
import TimerLine from './../components/timerLine';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import RedComponente from './../components/RedComponent'
import OrangeComponente from './../components/orangeComponente'
import GreenComponente from './../components/greenComponent'
import { styles } from './HomeScreen/styleHome'
import SelectDropdown from 'react-native-select-dropdown'
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Switch,
    Image,
    Dimensions, ActivityIndicator,
    TextInput,

} from 'react-native';
const axios = require('axios').default;


const { width, height } = Dimensions.get('screen')
const HomeScreen = ({ navigation, route }) => {
    const donne = useContext(DataContext)
    const myHeaders = new Headers();
    const token = donne.establishment.token
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    //context
    const openData = useContext(ShowDataOpen)
    const { toggleOpen, toggleOffAlert, toggleOpenAlertOpen } = useContext(AuthContext)
    //  states

    const [isEnabled, setIsEnabled] = useState(false);
    const [count, setCount] = useState(0)
    const [othersCount, setOthersCount] = useState(0)
    const [toConfirmeCount, settoConfirmeCount] = useState(0)
    const [others, setOthers] = useState([]);
    const [confirm, setConfirm] = useState([]);
    const [visible, setVisible] = useState(false)
    const [visibleAll, setVisibleAll] = useState(false)
    const [timerOn, setTimerOn] = useState(false);
    const [input, setInput] = useState(secondsLeft)
    const [secondsLeft, setSecondsLeft] = useState(3601);


    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        if (!isEnabled) {
            setVisibleAll(true)
        } else if (isEnabled) {
            setVisibleAll(false)
            setTimerOn(timerOn => !timerOn)
        }

    };


    useEffect(() => {

        const interval = setInterval(() => {

            GetOthers()
            GetToConfirme()

        }, 5000);

        return () => {
            clearInterval(interval);
        };

    }, [count])
    useEffect(() => {

        // const interval = setInterval(() => {

        //setMergedArray([...confirm,...others])
        console.log('.........................', mergedArray)
        // }, 5000);

        // return () => {
        //     clearInterval(interval);
        // };

    }, [count])




    // Methodes


    const GetOthers = async () => {
        try {

            await fetch('https://dev500.live-resto.fr/apiv2e/orders', {
                method: 'GET',
                headers: myHeaders,
            })
                .then((res) => res.json())
                .then(data => {
                    setOthersCount((data.orders.others).length)
                    console.log('othersCount', othersCount)
                    setOthers(data.orders.others)
                })

        } catch (error) {
            console.log(error)
        }
    }


    const GetToConfirme = async () => {
        try {
            await fetch('https://dev500.live-resto.fr/apiv2e/orders', {
                method: 'GET',
                headers: myHeaders,
            })
                .then((res) => res.json())
                .then(data => {

                    settoConfirmeCount((data.orders.toConfirm).length)
                    console.log('toConfirmeCount', toConfirmeCount)
                    setConfirm(data.orders.toConfirm)
                })

        } catch (error) {
            console.log(error)
        }
    }

    const RefreshCommande = async () => {
        await fetch('https://dev500.live-resto.fr/apiv2e/orders', {
            method: 'GET',
            headers: myHeaders,
        })//10029
            .then((res) => res.json())
            .then(data => {
                setConfirm(data.orders.toConfirm)
                setOthers(data.orders.others)
                console.log('REFRESH |||||| ', count)
                setCount(count + 1)
            })
    }

    const getAllData = () => {
        Promise.all([
            axios.get("https://dev500.live-resto.fr/apiv2e/orders"),
            axios.get("https://dev500.live-resto.fr/apiv2e/orders"),
        ])
    }



    const textButtonFiltre = [

        'Tout'


        ,
        'En préparation'
        ,
        'En Cuisine'

        ,
        'prête'

    ]


    //const [dataToshow, setDataToShow] = useState(mergedArray)
    const [isLoading, setIsloading] = useState(false)
    const borderColor = isEnabled ? '#087' : '#700'
    const background = isEnabled ? '#000' : '#ccc'
    // const mergedArray = []


    //const [mergedArray,setMergedArray] = useState([...confirm,...others])

    const mergedArray = [...confirm, ...others]

    // const handlerFiltre = async (f) => {
    //     // let word = f.target.value
    //     console.log('handlerFiltre|||||||||||||||||||||||||||||', status)
    //     if (status == 'En préparation') {
    //         const data = mergedArray.filter(item => item.kitchenstate_id == '20')

    //         //setMergedArray(data)
    //         console.log('data 20', data)




    //     } else if (status == 'En Cuisine') {
    //         const data = mergedArray.filter(item => item.kitchenstate_id == '30')

    //         // setMergedArray(data)
    //         console.log('data 30', data)


    //     } else if (status == 'prête') {
    //         const data = mergedArray.filter(item => item.kitchenstate_id == '40')
    //         //setMergedArray(data)
    //         console.log('data 40', data)

    //     }

    //     if (status == 'Tout') {

    //         //setMergedArray(mergedArray)



    //     }
    // }



    const [status, setStatus] = useState("Toute")




    return (

        <View style={styles.container}>
            <StatusBar backgroundColor='#000' barStyle="light-content" />

            <View style={{ backgroundColor: '#000' }}>
                <View style={{}}>

                    <View style={styles.HeaderContainer}>

                        <View style={{ backgroundColor: '#f4f4f4', borderColor: '#000', borderWidth: .8, borderRadius: 5 }}>
                            {/* <Icon.Button name="menu" color="#087" size={30}  onPress={() => navigation.toggleDrawer()}></Icon.Button> */}
                            <Icon name="menu-outline" color={'#000'} size={35} style={{ paddingHorizontal: 5, paddingVertical: 2 }} onPress={() => navigation.toggleDrawer()} />

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.TitelHeader}> {donne.establishment.title}</Text>
                            <TouchableOpacity onPress={() => {
                                RefreshCommande()
                                setCount(count + 1)
                            }}>
                                <Icon name="restaurant-outline" color={'#000'} size={25} style={{ marginHorizontal: 15 }} />

                            </TouchableOpacity>
                        </View>



                    </View>


                    {/** btn mode avion */}
                    <View style={{ marginBottom: 18, marginTop: 15, }}>
                        {!openData.btn ? (
                            <>

                                <View style={[styles.preferences, { backgroundColor: background, borderColor: borderColor }]}>
                                    {!isEnabled ?
                                        <View style={{}}>
                                            <Text style={styles.ModeOccupe}>Mode Occupé</Text>
                                        </View>

                                        : null}


                                    <View style={{}}>
                                        {isEnabled ? (<TimerLine timerOn={timerOn} input={input} secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} />

                                        ) : null}
                                    </View>
                                    <Switch
                                        trackColor={{ false: "#000", true: "#fff" }}
                                        thumbColor={isEnabled ? "#087" : "#700"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                </View>


                            </>) : null
                        }
                    </View>

                    {/* select type */}

                    {openData.visible ?
                        // <View style={styles.listeBtn}>


                        //     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        //         {
                        //             textButtonFiltre.map((e) => {
                        //                 return (

                        //                     <TouchableOpacity key={e.id}
                        //                         value={e.status}
                        //                         onPress={() => {

                        //                             setStatus(e.status)
                        //                             handlerFiltre()
                        //                         }}
                        //                         style={[styles.btnTab, status === e.status && styles.btnActive]}>
                        //                         {



                        //                             <Text style={[styles.tabTextBtn, status === e.status && styles.tabTextBtnActive]}>{e.status}</Text>



                        //                         }
                        //                     </TouchableOpacity>

                        //                 )
                        //             })

                        //         }
                        //     </ScrollView>

                        // </View>
                        <View style={{flexDirection:'row', alignItems:'center',alignSelf:'center',backgroundColor:'#000',width:"100%",justifyContent:'space-evenly',padding:10,marginBottom:10}}>
                            <View style={{backgroundColor:"#000",height:40,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:20}}>Trié  Par :</Text>
                            </View>
                            <SelectDropdown
                            defaultValue='Tout'
                                dropdownStyle={{ backgroundColor: "#000", marginVertical: 5 }}
                                rowStyle={{ backgroundColor: "#087", borderColor: '#087', borderWidth: 1, borderRadius: 10, marginVertical: 0.5, height: 40, }}
                                rowTextStyle={{ color: "#fff" }}
                                buttonStyle={{ backgroundColor: "#000", height: 40,  borderColor: '#087', borderWidth: 1, borderRadius: 10 }}
                                buttonTextStyle={{ marginLeft: 20, color: "#fff" }}
                                data={textButtonFiltre}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setStatus(selectedItem)
                                    
                                }}

                            />
                        </View>

                        : null}


                    {/* flatList */}
                    {openData.visible ?
                        (<View style={{ backgroundColor: '#0000', marginVertical: 1, }}>
                            <View>
                                {
                                    !isEnabled ?

                                        <FlatList
                                            showsVerticalScrollIndicator={true}
                                            indicatorStyle='black'
                                            style={{ backgroundColor: '#000', height: height * .67, alignSelf: 'center', width: width * .95, }}
                                            data={mergedArray}
                                            keyExtractor={item => item.id}
                                            renderItem={({ item, id }) => {
                                                return (
                                                    <View style={{ marginTop: 15 }} >

                                                        {status == 'Tout' && status !== 'En préparation' && status !== 'En Cuisine' && status !== 'prête' ?
                                                            <>
                                                                <RedComponente item={item} id={item.id} navigation={navigation} route={route} />
                                                                <OrangeComponente item={item} id={item.id} kitchenstateid={item.kitchenstate_id} navigation={navigation} route={route} />
                                                                <GreenComponente item={item} id={item.id} kitchenstateid={item.kitchenstate_id} navigation={navigation} route={route} />
                                                            </>

                                                            : null
                                                        }
                                                        {status == 'En préparation' ? <RedComponente item={item} id={item.id} navigation={navigation} route={route} /> : null}
                                                        {status == 'En Cuisine'? <OrangeComponente item={item} id={item.id} kitchenstateid={item.kitchenstate_id} navigation={navigation} route={route} /> : null}
                                                        {status == 'prête'? <GreenComponente item={item} id={item.id} kitchenstateid={item.kitchenstate_id} navigation={navigation} route={route} /> : null}
                                                    </View>

                                                )
                                            }} />
                                        : <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', paddingVertical: 10 }}>
                                            <ActivityIndicator color="#fff" />
                                        </View>
                                }

                            </View>
                        </View>
                        )
                        : null}
                </View>
            </View>
            <View>
                {openData.btn ? (

                    <View style={styles.containerTowT}>
                        <View style={styles.containerV}>
                            <Icon name="md-warning" color={'#087'} size={32} style={{ marginVertical: 10 }} />
                            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}> Aucune Commande </Text>
                        </View>

                        <Text style={{ color: '#ccc', fontSize: 16 }}> Les Commandes S'affficheront Ici . </Text>

                    </View>

                ) : null}
            </View>
            <View>
                {openData.btn ? (
                    <View style={styles.containerMsg}>
                        <View style={[styles.containerM, { marginHorizontal: 5 }]} >
                            <Icon name="md-information-circle" color={'#087'} size={45} style={{ marginTop: 8, marginLeft: -25 }} />
                            <View>
                                <Text style={[{ fontWeight: 'bold', color: "#fff", fontSize: 20 }]}>{openData.msg}</Text>
                                <Text style={[{ fontSize: 17, marginVertical: 3, color: '#ccc' }]}>{openData.heur} </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.buttonContainer, { marginVertical: 10, borderRadius: 25 }]}
                            onPress={() => {
                                //setDataToShow(mergedArray)

                                toggleOpen()
                                console.log(mergedArray)


                            }}>
                            <View>
                                <Text style={[{ fontSize: 23, color: '#fff', textAlign: 'center', fontWeight: 'bold', }]}> Ouvrir Maintenent </Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                ) : null

                }

            </View>
            <ModelContainer
                transparent
                visible={openData.visiblealr}
            >
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => toggleOpenAlertOpen()}>
                            <Icon name="md-close-circle" color={'#078'} size={40} />

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('./../assets/sucees.png')}
                        style={{ height: width * .250, width: width * .410, }}
                    />
                </View>
                <Text mode={true} style={{ marginVertical: 20, fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
                    Votre restaurant est Ouvert
                </Text>
            </ModelContainer>
            <ModelContainer


                transparent
                visible={openData.ferme}
            >
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => toggleOffAlert(false)}>
                            <Icon name="md-close-circle" color={'#078'} size={40} />

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('./../assets/x.jpg')}
                        style={{ height: width * .25, width: width * .450, }}
                    />
                </View>
                <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
                    {openData.msg}

                </Text>
            </ModelContainer>
            <ModelContainer
                transparent
                visible={visibleAll}

            >
                <View style={{ justifyContent: 'space-between', marginVertical: 20 }}>
                    <View style={{ backgroundColor: '#fff', flexDirection: 'row-reverse', width: '100%', justifyContent: 'space-between', paddingHorizontal: 3, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setVisibleAll(false)}>
                            <Icon name="md-close-circle" color={'#078'} size={35} />
                        </TouchableOpacity>

                        <Text style={[{ fontSize: 25, fontWeight: 'bold', color: '#000' }]}>
                            Choisi votre temps
                        </Text>
                    </View>

                </View>



                <View style={{}}>

                    <View style={{ backgroundColor: '#fff', flexDirection: 'row', height: height * .1, justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={styles.timeChose} onPress={() => {
                                setSecondsLeft(600)
                                setVisibleAll(false)
                                setTimerOn(true)

                            }}>
                                <Text>10 Min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.timeChose} onPress={() => {
                                setSecondsLeft(1200)
                                setVisibleAll(false)
                                setTimerOn(true)


                            }}>
                                <Text>20 Min</Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={styles.timeChose} onPress={() => {
                                setSecondsLeft(1800)
                                setVisibleAll(false)
                                setTimerOn(true)


                            }}>
                                <Text>30 Min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.timeChose} onPress={() => {
                                setSecondsLeft(2400)
                                setVisibleAll(false)
                                setTimerOn(true)


                            }}>
                                <Text>40 Min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.timeChose} onPress={() => {
                                setVisibleAll(false)
                                setVisible(true)
                            }}>
                                <Text>autre ... </Text>
                            </TouchableOpacity>
                        </ScrollView>



                    </View>
                </View>
                <View style={{ backgroundColor: '#fff', flexDirection: 'row', height: height * .06, justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={[{

                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#087',
                        paddingHorizontal: 20,
                        height: height * .05,
                        marginTop: 15


                    }]}
                        onPress={() => {
                            setTimerOn(timerOn => !timerOn)
                            setVisibleAll(false)

                        }


                        }>
                        <Text style={[{ color: '#fff', fontSize: 15, fontWeight: 'bold' }]}>
                            {timerOn ? 'Stop' : 'démmarer'}
                        </Text>
                    </TouchableOpacity>


                </View>

            </ModelContainer>
            <ModelContainer
                transparent
                visible={visible}
            >


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontSize: 22, fontWeight: 'bold' }}>
                            Entrer le temps
                        </Text>

                    </View>
                    <View style={{}}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Icon name="md-close-circle" color={'#078'} size={30} style={{ marginTop: 0 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ alignSelf: 'center', width: width * .9, justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
                    <TextInput
                        placeholder='Entre le temps par second'
                        style={{ height: 45, width: '80%', backgroundColor: '#9cc', borderRadius: 20, paddingLeft: 20, }}
                        onChangeText={text => setInput(text)}
                        value={input}
                        keyboardType="numeric"
                        placeholderTextColor="#000"
                    />
                </View>



                <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 10 }}>
                    <TouchableOpacity style={[{
                        backgroundColor: '#087',
                        alignItems: "center",
                        justifyContent: 'center',

                        marginHorizontal: 15,
                        width: width * .3,
                        borderRadius: 25,
                        height: height * .05


                    }]}
                        onPress={() => {
                            // setTimerOn(timerOn => !timerOn)
                            setTimerOn(true)
                            setVisible(false)

                        }


                        }>
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                            Star
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[{
                        backgroundColor: '#087',
                        alignItems: "center",
                        justifyContent: 'center',
                        marginHorizontal: 15,
                        width: width * .3,
                        borderRadius: 25,
                        height: height * .05

                    }]} onPress={() => setSecondsLeft(input)}>
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                            Ajouter
                        </Text>
                    </TouchableOpacity>
                </View>

            </ModelContainer>


        </View >

    )
}

export default HomeScreen;
