import React, { useState } from 'react'
import { View, SafeAreaView, ScrollView, Image} from 'react-native'

import {Components } from '../Config'

export default function Inscription({navigation}) {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    // Make request to the backend
    let login = () => {
        if(!(email && password)) {
            alert('Not Logged In')
        } else {
            alert('Logged In')
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: 'center', marginTop: '15%'}}>
                    <Image source={require('./icons/lockCon.png')} style={{width: 40,height: 40}} />
                    <Components.Title text="Inscription" />
                    <Components.Input p="Votre nom" s={require('./icons/name.png')} v={email} o={(email) => {setEmail(email)}} />
                    <Components.Input p="Votre prenom" s={require('./icons/name.png')}  v={password} o={(password) => {setPassword(password)}}  se={true} />
                    <Components.Input p="Votre adresse mail" s={require('./icons/email.png')} v={email} o={(email) => {setEmail(email)}} />
                    <Components.Input p="Votre numero de telephone" s={require('./icons/viber.png')} v={email} o={(email) => {setEmail(email)}} />
                    <Components.Input p="Votre mot de passe" s={require('./icons/lock.png')}  v={password} o={(password) => {setPassword(password)}}  se={true} />
                    <Components.Btn text="S'inscrire" event={() => {login()}} />
                    <Components.TextWith text="Already have account ?" event={() => {navigation.navigate('Connexion')}} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}