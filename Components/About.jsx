import React, { Component } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import 'moment/locale/fr'
moment.locale('fr')

import {Components, apiSource} from '../Config'

export default class About extends Component {

    constructor(props) {
        super(props)
        this.state = {
            voyage: this.props.route.params.voyage
        }
    }

    async reserver() {
        let request = await AsyncStorage.getItem('Login')
        request = JSON.parse(request)
        fetch(apiSource + '/reservations/create/'+this.state.voyage.id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                "Authorization": "Bearer "+ request.store.token
            },
            body: JSON.stringify({
                nombre: 1
            })
        }).then(res => res.json())
        .then(async response => {
            if(response.error) {
                alert(response.error)
            } else {
                await AsyncStorage.setItem('Reservation', JSON.stringify(response))
                this.props.navigation.navigate('Billet')
            }
        })
    }

    Alerter() {
        Alert.alert(
            'Reserver',
            'Vous voulez continuer ?',
            [
                {
                    text: 'Annuler',
                    onPress: () => {}
                },
                {
                    text: 'Continuer',
                    onPress: () => this.reserver()
                }
            ]
        )
    }

    Inform = ({view, value, color, size}) => (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 3}}>
            <Text style={{fontSize: 18}}>{view}: </Text>
            <Text style={{color: color ? color : 'rgba(0, 0, 0, 0.5)', fontSize: size ? size : 16}}> {value} </Text>
        </View>
    )

    render() {
        let {voyage} = this.state
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{width: '100%', height: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
                    <View style={{flex: 1, width: '100%', height: '100%', alignItems: 'center'}}>
                        <Components.Voyage
                            source={voyage.users.logo} 
                            heureDepart={moment(voyage.depart).format('HH:mm')}
                            localite={voyage.origine}
                            parcouru={moment(voyage.difference).format('HH:mm')}
                            heureArrive={moment(voyage.arrive).format('HH:mm')}
                            destination={voyage.destination}
                            price={voyage.price}
                            date={moment(voyage.date).format('YYYY-MM-DD')}
                            name={voyage.users.nom}
                            key={voyage.id}
                        />
                    </View>
                    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 20,  width: '90%'}}>
                        <this.Inform view="Compagnie" value={voyage.users.nom} />
                        <this.Inform view="Date du voyage" value={moment(voyage.date).format('LL')} />
                        <this.Inform view="Heure de depart" value={moment(voyage.depart).format('HH:mm')} />
                        <this.Inform view="Heure d'arrivé estimé" value={moment(voyage.arrive).format('HH:mm')} />
                        <this.Inform view="Depart de" value={voyage.origine} color="red" size={17} />
                        <this.Inform view="Destination" value={voyage.destination} color="red" size={17} />
                        <this.Inform view="Nombre de places au Total" value={voyage.total} />
                        <this.Inform view="Nombre de places disponible" value={voyage.total - voyage.prise} />
                        <this.Inform view="Prix du voyage en FCFA" value={voyage.price + " FCFA"} color="red" size={17} />
                    </View>

                    <View style={{paddingBottom: '25%'}}>
                        <Components.Btn text="Reserver" event={() => this.Alerter()} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
