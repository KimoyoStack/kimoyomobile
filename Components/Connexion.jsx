import React, { Component, useEffect, useState } from 'react'
import { View, SafeAreaView, ScrollView, Image, Dimensions, ActivityIndicator} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Components, apiSource } from '../Config'
import Inscription from './Inscription'
import Main from './Main'

let Stack = createStackNavigator()
let height = Dimensions.get("window").height

function Connexion({navigation}) {
    let [email, setEmail] = useState("moisekumavi7@gmail.com")
    let [password, setPassword] = useState("moise10")

    let login = async () => {
        if(!(email && password)) {
            alert('Veuillez renseigner toutes les informations')
        } else {
            await fetch(apiSource + '/users/login',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(res => res.json())
            .then(response => {
                if(response.error) {
                    alert(response.error)
                } else {
                    AsyncStorage.setItem('Login', JSON.stringify({
                        login: true,
                        store: response
                    }))
                    storeCollector()
                }
            })

        }
    }

    let storeCollector = async () => {
        let items = await AsyncStorage.getItem('Login')
        items = JSON.parse(items)
        if(items && items.login) {
            navigation.navigate('Main')
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: 'center', height: height, justifyContent: 'center'}}>
                    <Image source={require('./icons/lockCon.png')} style={{width: 40,height: 40}} />
                    <Components.Title text="Connection" />
                    <Components.Input p="Adresse mail" s={require('./icons/email.png')} v={email} o={(email) => {setEmail(email)}} />
                    <Components.Input p="Mot de passe" s={require('./icons/lock.png')}  v={password} o={(password) => {setPassword(password)}} se={true} />
                    <Components.Btn text="Se connecter" event={() => login()} />
                    <Components.TextWith text="Se Connecter avec" />
                    <Components.Social />
                    <Components.TextWith text="Mot de passe oublié ?" />
                    <Components.TextWith text="Créer un compte" event={() => {navigation.navigate('Inscription')}} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default class Auth extends Component {

    render() {

        return (
            <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false, headerLeft: false}}>
                <Stack.Screen name="Connexion" component={Connexion} />
                <Stack.Screen name="Inscription" component={Inscription} />
                <Stack.Screen name="Main" component={Main} options={{
                    headerLeft: false
                }} />
            </Stack.Navigator>
        )
    }
} 