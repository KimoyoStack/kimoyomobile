import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {createStackNavigator} from '@react-navigation/stack'

import {Options, ScreenOptions} from '../Config'

import Ticket from './Ticket'
import Me from './Me'
import Notification from './Notification'
import {Components} from '../Config'
import Billet from './Billet'


let Tab = createMaterialTopTabNavigator()
let Stack = createStackNavigator()
let height = Dimensions.get('window').height

class InfoAbout extends Component {

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Informations" component={Info} />
                <Stack.Screen name="Billet" component={Billet} />
            </Stack.Navigator>
        )
    }
}

export default class Info extends Component {

    screen(name, component) {
        return (
            <Tab.Screen name={name} component={component} options={Options}/>
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <View style={{height: height}}>
                        <View style={{width: '100%', height: '40%'}}>
                            <Components.Background source={require('./icons/about.png')} text="A propos" />
                        </View>
                        <View style={{flex: 1}}>
                            <Tab.Navigator screenOptions={ScreenOptions}>
                                {this.screen("Compte", Me)}
                                {this.screen("Ticket", Ticket)}
                                {this.screen("Notifications", Notification)}
                            </Tab.Navigator>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}