import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Login extends Component {
    render() {
        return (
            <View style={styles.view}>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'green'
    }
})
