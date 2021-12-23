import React, { Component, useState } from 'react'
import  { View, Dimensions, SafeAreaView, ScrollView, TextInput } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

let heights = Dimensions.get('window').height

import {Components} from '../Config'
// let screenHeight = Dimensions.get('window').height;

export default function Search() {

    let [depart, setDepart] = useState("depart")
    let [arrive, setArrive] = useState("arrive")
    let [date, setDate] = useState("date")
    let [height, setHeight] = useState(heights/2)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'}
    ]);

    let focus = () => {
        setHeight(0)
    }

    let blur = () => {
        setHeight(heights/2)
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <View style={{width: '100%', height: height }}>
                    <Components.Background source={require('./icons/destination.png')} text="Votre destination" />
                </View>
                <View style={{height: '50%', paddingVertical: 20, alignItems: 'center'}}>
                    <Components.Input p="Ville de depart" s={require('./icons/button.png')} v={depart} o={(depart) => setDepart(depart)} focus={() => focus()} blur={() => blur()} />
                    <Components.Input p="Ville d'arrivée" s={require('./icons/pin.png')} v={arrive} o={(arrive) => setArrive(arrive)} focus={() => focus()} blur={() => blur()}  />
                    <Components.Input p="Date et heure de depart" s={require('./icons/calendar.png')} v={date} o={(date) => setDate(date)} focus={() => focus()} blur={() => blur()}  />
                    <Components.Btn text="Rechercher" />
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

