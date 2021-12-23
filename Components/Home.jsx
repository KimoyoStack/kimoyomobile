import React, { Component } from 'react'
import {View, ScrollView, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native'
import moment from 'moment'

import {Components, apiSource} from '../Config'

export default class Main extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            refresh: false
        }
    }

    wait(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }


    Onrefresh() {
        this.setState({
            refresh: true
        })
        this.wait(1500).then(() => this.setState({refresh: false}))
        this.getVoyages()
    }

    componentDidMount() {
        this.getVoyages()
    }

    async getVoyages() {
        await fetch(apiSource + '/voyages/all')
        .then(res => res.json())
        .then((response) => {
            this.setState({
                data: response
            })
        })
    }

    naivgateTo(voyage) {
        this.props.navigation.navigate("About", {voyage: voyage})
    }
 
    render() {
        let {data} = this.state
        data = Object.values(data)
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{width: '100%',height: '100%'}}
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refresh}
                            onRefresh={() => this.Onrefresh()}
                        />
                    }
                >
                    <View style={{flex: 1, width: '100%', height: '100%', alignItems: 'center'}}>
                        {
                            data.map(voyage => (
                                <Components.Voyage
                                    source={voyage.users.logo} 
                                    heureDepart={moment(voyage.depart).format('HH:mm')}
                                    localite={voyage.origine}
                                    parcouru={moment(voyage.difference).format('HH:mm')}
                                    heureArrive={moment(voyage.arrive).format('HH:mm')}
                                    destination={voyage.destination}
                                    price={voyage.price}
                                    date={moment(voyage.date).format('YYYY-MM-DD')}
                                    event={() => this.naivgateTo(voyage)}
                                    name={voyage.users.nom}
                                    present={true}
                                    key={voyage.id}
                                />
                            ))
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}