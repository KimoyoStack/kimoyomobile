import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Text, View, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native'

import moment from 'moment'

import {Components} from '../Config'

let height = Dimensions.get('window').height

export default class Billet extends Component {

    state = {
        reservation: {},
        voyage: {},
        user: {}
    }

    componentDidMount() {
        this.get()
    }

    async get() {
        let request = await AsyncStorage.getItem('Reservation')
        request = JSON.parse(request)
        if(request != (null && 'undefined')) {
            this.setState({
                reservation: request.reservation,
                voyage: {
                    "destination": request.voyage.destination,
                    "difference": request.voyage.difference,
                    "origine": request.voyage.origine,
                    "arrive": request.voyage.arrive,
                    "depart": request.voyage.depart,
                    "price": request.voyage.price,
                    "date": request.voyage.date,
                    "etat": request.voyage.etat,
                    "id": request.voyage.id
                },
                user: request.voyage.users
            })
        }
    }

    render() {
        let {reservation, voyage, user} = this.state
        let color = reservation.status ? 'green' : 'red'
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <View style={{height: height - 40, alignItems: 'center'}}>
                        <View style={{marginVertical: 10}}>
                            <Text style={{color: '#F06B6B', fontSize: 20, fontWeight: 'bold'}}>Dernière reservation</Text>
                        </View>
                        <Components.Voyage
                            source={user.logo} 
                            heureDepart={moment(voyage.depart).format('HH:mm')}
                            localite={voyage.origine}
                            parcouru={moment(voyage.difference).format('HH:mm')}
                            heureArrive={moment(voyage.arrive).format('HH:mm')}
                            destination={voyage.destination}
                            price={voyage.price}
                            date={moment(voyage.date).format('YYYY-MM-DD')}
                            name={user.nom}
                            key={voyage.id}
                            valide={reservation.status}
                        />
                        <View style={{marginVertical: 10}}>
                            <Text style={{color: '#F06B6B', fontSize: 20, fontWeight: 'bold'}}>Ticket</Text>
                        </View>
                        <View style={{height: 210, width: 210, alignItems: 'center', justifyContent: 'center', backgroundColor: color}}>
                            <Image 
                                source={{uri: reservation.code}}
                                style={{width: '90%', height: '90%'}}
                            />
                        </View>
                        <View style={{flexDirection: 'row', marginVertical: 20, alignItems: 'center'}}>
                            <Text style={{fontSize: 20, color: '#F06B6B', fontWeight: 'bold'}}>NB: </Text>
                            <Text style={{fontSize: 16}}>Ce code est valide pour {reservation.nombre} personne (s) </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
