import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Pressable, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'

export default class Me extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {} 
        }
    }

    componentDidMount() {
        this.getUserConnected()
    }

    async getUserConnected() {
        let request = await AsyncStorage.getItem('Login')
        request = JSON.parse(request)
        this.setState({
            user: request.store
        })
    }

    Rend = ({text, size}) => (
        <View style={{marginVertical: 5}}>
            <Text style={{fontSize: size ? size :22}}>{text}</Text>
        </View>
    )

    render() {
        let {user} = this.state
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{flex: 1}}>
                        <View style={{alignItems: 'center', marginVertical: 15, paddingBottom: 110}}>
                            <Image
                                source={require('./icons/utilisateur.png')} 
                                style={{width:85,height: 85}}
                            />
                            <this.Rend text={user.nom + " " + user.prenom} />
                            <this.Rend text={"+228 "+user.telephone} size={16} />
                            <this.Rend text={user.email} size={16} />
                            <View style={{marginVertical: 7}}>
                                <TouchableOpacity style={{backgroundColor: '#F06B6B', paddingVertical: 7, paddingHorizontal: 20, borderRadius: 10}}>
                                    <Text style={{color: 'white', fontSize: 16}}>Plus</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}