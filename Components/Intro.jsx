import React, { Component } from "react";
import { Text, View } from 'react-native'
import AppIntroSlider from "react-native-app-intro-slider";
import { createStackNavigator } from '@react-navigation/stack'

import {Components} from '../Config'
import { StackActions } from "@react-navigation/routers";
import Auth from "./Connexion";

let slides = [
    {
        id: 1,
        title: 'Titre 1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ullam consequatur doloribus nemo inventore officia ad suscipit ab eum labore accusamus, cupiditate vero id nobis qui'
    },
    {
        id: 2,
        title: 'Titre 2',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ullam consequatur doloribus nemo inventore officia ad suscipit ab eum labore accusamus, cupiditate vero id nobis qui'
    },
    {
        id: 3,
        title: 'Titre 3',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ullam consequatur doloribus nemo inventore officia ad suscipit ab eum labore accusamus, cupiditate vero id nobis qui'
    }
]
let Stack = createStackNavigator()

class Intro extends Component {

    constructor(props) {
        super(props)
    }

    renderItem = ({item}) => (
        <Components.Introduction item={item} key={item.id} />
    )

    onDone() {
        this.props.navigation.navigate('Auth')
    }

    render() {

        return (
            <View style={{flex: 1, backgroundColor: "tomato"}}>
                <AppIntroSlider 
                    data={slides}
                    renderItem={this.renderItem}
                    showSkipButton={true}
                    onDone={() => this.onDone()}
                />
            </View>
        )
    }
}
export default class IntroCon extends Component {

    render () {

        return (
            <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="Auth" component={Auth} />
            </Stack.Navigator>
        )
    }
}