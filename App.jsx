import React, { Component } from "react";
import { StyleSheet, View, Image, StatusBar, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage";

import Auth from './Components/Connexion'
import Intro from './Components/Intro'
import Main from './Components/Main'

export default class App extends Component {

    state = {
        firstLaunch: null,
        log: null
    }

    async AlreadyLaunched() {
        let launched = await AsyncStorage.getItem('isAlreadyLaunched')
        if(launched == null) {
            await AsyncStorage.setItem('isAlreadyLaunched', "true")
            this.setState({firstLaunch: true})
        } else {
            this.setState({firstLaunch: false})
        }
    }
    
    async LoggedIn() {
        let request = await AsyncStorage.getItem('Login')
        request = JSON.parse(request)
        if(request == null || !request.login) {
            this.setState({log: false})
        } else {
            this.setState({log: true})
        }
    }

    async componentDidMount() {
        this.LoggedIn()
        this.AlreadyLaunched()
    }

    render() {
        let {firstLaunch, log} = this.state
        return (
           <View style={{flex: 1}}>
                <NavigationContainer>
                    {
                        firstLaunch == null ? null:
                        firstLaunch == true ? <Intro />:
                        firstLaunch == false && !log ? <Auth />:
                        <Main />
                    }
                </NavigationContainer>
           </View>
        )
    }
}