import React, { useEffect, useState, useContext } from "react"


import { View, StyleSheet } from "react-native"
import {
    DrawerContentScrollView,
    DrawerItem
} from "@react-navigation/drawer"
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    ActivityIndicator
} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext, DataContext, ShowDataOpen } from "../components/context"
import { TouchableOpacity } from "react-native";


export function DrawerContent(props) {
    const donne = useContext(DataContext)
    const paperTheme = useTheme();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch =  openData ? toggleOpen : toggleOff ;
    const { signOut, toggleOff, toggleOpen } = useContext(AuthContext)
    const openData = useContext(ShowDataOpen)

    // const [data , setData] = useState([]);
    // const [isLoading , setIsLoading] = useState(true);

    // const dataUrl ='https://dev500.live-resto.fr/apiv2e/establishments/authenticate'
    // useEffect(() => {
    //     fetch (dataUrl)
    //     .then((res) => res.json())
    //     .then((json) => setData(json.establishment))

    //     .catch((error) =>alert(error))
    //     .finally(setIsLoading(false))
    // },[])

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 ,alignItems:'center' }}>
                            <Avatar.Image
                                source={{
                                     uri: donne.establishment.img
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                 <Title style={styles.title}>{donne.establishment.title}</Title>
                                <Caption style={[styles.caption,{width:'80%',lineHeight:18}]}>{donne.establishment.subtitle}</Caption> 
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>

                    <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="av-timer"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Commande Du Jour "
                            onPress={() => { props.navigation.navigate('HomeScreen') }}
                        />
                        
                    
                      
                   
                        
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="app-registration"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Future Commandes "
                            onPress={() => { props.navigation.navigate('CommandeFuture') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="assignment-turned-in"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Commandes Terminées"
                            onPress={() => { props.navigation.navigate('CommandeEcrTScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="folder-special"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Toutes Les Commandes "
                            onPress={() => { props.navigation.navigate('Historique') }}
                        />


                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="watch-later"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Horraire D'ouvertures"
                            onPress={() => { props.navigation.navigate('HoraireScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="calendar-today"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Fermetures Exceptionelles"
                            onPress={() => { props.navigation.navigate('FermetureScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="settings"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Paramétres"
                            onPress={() => { props.navigation.navigate('SettingsScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="help"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Aide"
                            onPress={() => { props.navigation.navigate('SupportScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section name="Preferences">
                        <View style={styles.preferences}>
                            <Text style={styles.titleH1}>Fermé Le Restaurent Maintenent </Text>
                            <Switch
                                trackColor={{ false: "#ccc", true: "#000" }}
                                thumbColor={isEnabled ? "#087" : "#000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => {toggleOff()}}
                                value={isEnabled}
                            />
                        </View>
                    </Drawer.Section>
                    <View style={{marginLeft:10}}>
                    <Text style={{ paddingVertical: 2, fontWeight: 'bold' ,fontSize:17}}>
                        Besoin D'aide Appellez Nous Sur :
                        
                        
                    </Text>
                    <TouchableOpacity>
                    <View style={{ marginLeft:10}}>
                        <Text style={{color:'#087' , fontSize:16, fontWeight: 'bold',textDecorationStyle:"solid",textDecorationLine: 'underline'}}>0782205066</Text>
                    </View>

                    </TouchableOpacity>
                   

                    </View>
                    

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size} />
                    )}
                    label="Se deconnecter"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: '#000'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 10,
    },
    bottomDrawerSection: {
        marginBottom: 10,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 16,
    },
    preferences: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 7,
        backgroundColor: '#087',
        alignItems:'center'

    },
    titleH1:{
        color:'#fff',
        fontWeight:'bold'
    }
});
