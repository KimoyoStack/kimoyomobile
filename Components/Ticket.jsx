import React, { Component } from 'react'
import { Text, View, Pressable, SafeAreaView, ScrollView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Reservations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Billet: null
        }
        this.getBillet()
    }

    componentDidMount() {
        this.getBillet()
    }

    async getBillet() {
        let Billet = await AsyncStorage.getItem('Reservation')
        if(Billet != null) {
            this.setState({
                Billet: true
            })
        } else {
            this.setState({
                Billet: false
            })
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <View style={{marginHorizontal: 10, flex: 1, justifyContent: 'space-between', marginBottom: '35%'}}>
                        {
                            this.state.Billet ? (
                                <View style={{flex: 2, backgroundColor: 'white', padding: 10, marginVertical: 10}}>
                                    <Text style={{fontSize: 20, color: '#33385B', margin: 10}}>Dernier Ticket</Text>
                                    <Text style={{marginHorizontal: 10, color: '#33385B'}}>Le ticket de votre derniere reservation se trouve ici. Cliquez 👇 pour l'ouvrir.</Text>
                                    <Pressable style={{backgroundColor: '#F06B6B', width: '98%', paddingVertical: 10, marginVertical: 10, alignSelf: 'center', borderRadius: 5}} onPress={() => {this.props.navigation.navigate("Billet")}}>
                                        <Text style={{textAlign: 'center', color: 'white'}}>Ouvrir le Ticket</Text>
                                    </Pressable>
                                </View>
                            ) : (
                                <Text></Text>
                            )
                        }
                        <View style={{flex: 1, backgroundColor: 'white', padding: 8}}>
                            <Text style={{fontSize: 20, color: '#33385B', margin: 10}}>Reservations</Text>
                            <Pressable style={{margin: 7}}>
                                <Text style={{fontSize: 17, color: '#F06B6B'}}> Gerer mes reservations</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}