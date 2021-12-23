import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Aide extends Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Pas de nouvelles notifications</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
