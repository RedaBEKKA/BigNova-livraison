import React, { useState } from 'react';
import { Button } from "native-base"
import * as Animatable from 'react-native-animatable';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from './../components/context'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,

} from 'react-native';



const SignInScreen = () => {

    const [donnee, setDonnee] = useState([])
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loginData, setLoginData] = React.useState({

        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const { signIn, Comamnde } = React.useContext(AuthContext)
    const [message, setMessage] = React.useState("");

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setLoginData({
                ...loginData,
                login: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setLoginData({
                ...loginData,
                login: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    const handlePasswordChange = (val) => {
        if (val.trim().length >= 4) {
            setLoginData({
                ...loginData,
                password: val,
                isValidPassword: true
            });
        } else {
            setLoginData({
                ...loginData,
                password: val,
                isValidPassword: false
            });
        }
    }
    const updateSecureTextEntry = () => {
        setLoginData({
            ...loginData,
            secureTextEntry: !loginData.secureTextEntry
        });
    }
    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setLoginData({
                ...loginData,
                isValidUser: true
            });
        } else {
            setLoginData({
                ...loginData,
                isValidUser: false
            });
        }
    }
    
    const loginHandle = (login, password) => {
       

            if (login.length < 4 && password.length < 4){
                alert('rempli tout les champ !')
            }
            else {
                signIn(login, password);
            }
                
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Bienvenue !</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}>
                <Text style={[styles.text_footer, {
                    color: "#000"
                }]}>Login :</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#000"
                        size={20}
                    />
                    <TextInput
                        placeholder="Votre pseudo"
                        placeholderTextColor="#000"
                        style={[styles.textInput, {
                            color: "#000",
                            fontSize: 18,
                            fontWeight: '600',
                            padding: 10,
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => {
                            textInputChange(val)
                            setLogin(val)
                        }
                        }
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {loginData.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        :
                        null}
                </View>

                {loginData.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }
                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Mot de passe</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20}
                    />

                    <TextInput
                        placeholder="Votre mot de passe"
                        secureTextEntry={loginData.secureTextEntry ? true : false}
                        placeholderTextColor="#000"
                        style={[styles.textInput, {
                            color: "#000",
                            fontSize: 18,
                            padding: 10,
                            fontWeight: '600'
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => {
                            handlePasswordChange(val)
                            setPassword(val)
                        }}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                {loginData.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 4 characters long.</Text>
                    </Animatable.View>}
                <TouchableOpacity
                >
                    <View style={styles.button}>
                        <Button onPress={() => { loginHandle(loginData.login, loginData.password) }} full style={{ backgroundColor: "#08d4c4" }}>
                            <Text style={styles.textSign, { color: '#fff' }}>Se connecter</Text>
                        </Button>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        margin: 10
    },
    action: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingHorizontal: 20,
        marginHorizontal: 21,
        marginVertical: 20


    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});























// const logini = async() => {
    //     if(setLoginData.login!='' && setLoginData.password != ""){
    //         //alert('Azul dina')
    //         await fetch('https://dev500.live-resto.fr/apiv2e/establishments/authenticate',{
    //             method:'POST',
    //             headers:{
    //                 'accept':'application/json',
    //                 'Content-type':'application/json'
    //             },
    //             body:JSON.stringify({
    //                 'login':login,
    //                 'password':password,
    //             })
    //         })  .then(res=>res.json())
    //             .then(resData=>{
    //                 (resData.establishment.token)
    //                  console.log(loginData.login,loginData.password,resData);
    //                 setMessage(resData.establishment.token)


    //         })

    //     }
    //     //setUserToken('fgkj');

    // }









      // if (login.length == 0 || password.length == 0) {
        //     Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        //         { text: 'Ok' }]);


        // } else {

        //     Alert.alert('Wrong Input!', 'Username or password invalid .', [
        //         { text: 'Ok' }]);
        // }