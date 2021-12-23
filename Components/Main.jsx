import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'

let tab = createMaterialTopTabNavigator()
let stack = createStackNavigator()

import Home from './Home'
import Search from './Search'
import Info from './Info'
import About from './About'
import Billet from './Billet'

class MainX extends Component {
    render() {
        return (
            <tab.Navigator screenOptions={screenOptions} tabBarPosition="bottom">
                <tab.Screen name="Home" component={Home} options={options.home} />
                <tab.Screen name="Search" component={Search} options={options.search} />
                <tab.Screen name="Info" component={Info} options={options.info} />
            </tab.Navigator>
        )
    }
}

export default class Main extends Component {
    render() {
        return (
            <stack.Navigator screenOptions={{}}>
                <stack.Screen name="Accueil" component={MainX} options={options.home}options={{headerLeft: false}} />
                <stack.Screen name="About" component={About} options={options.search} />
                <stack.Screen name="Billet" component={Billet} options={options.search} />
            </stack.Navigator>
        )
    }
}

let styles = StyleSheet.create({
    iconStyle: {
        height: 25,
        width: 25
    }
})

let screenOptions = {
    tabBarIndicatorStyle: {
        height: 0
    },
    tabBarStyle: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)'
    },
    tabBarShowLabel: false,
    tabBarShowIcon: true,
}

let funcOptions = (source) => {
    return {
        tabBarIcon: () => (
            <Image 
                source={source}
                style={styles.iconStyle}
            />
        )
    }
}

let options = {
    home: funcOptions(require('./icons/home.png')),
    search: funcOptions(require('./icons/loupe.png')),
    info: funcOptions(require('./icons/info.png'))
}