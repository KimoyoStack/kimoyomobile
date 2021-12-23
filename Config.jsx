import React, {useState} from 'react'
import {Text, ImageBackground, Pressable, View, Image, TextInput, TouchableOpacity} from 'react-native'

let colors = {
    0: '#28a745',
    1: '#007bff',
    2: '#ffc107'
}

let StyleSheetCreate = {
    inputView: {
        width: '85%', 
        backgroundColor: '#EEF2FE',
        paddingHorizontal: 10, 
        borderColor: '#777F97', 
        borderWidth: 0.3, 
        marginVertical: 10,
        borderRadius: 50,
    },
    input: {
        width: '90%',
        height: '100%',
        padding: 11,
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.7)'
    },
    inputICon: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    // Button
    button: {
        backgroundColor: '#F06B6B',
        width: '85%',
        padding: 8.5,
        borderRadius: 20,
        marginVertical: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
    // EndButton
    textLogin: {
        color: '#F06B6B',
        marginVertical: 7
    },
    Background: {
        width: '100%', 
        height: '100%'
    },
    BackgroundText: {
        position: 'absolute',
        bottom: 3,
        fontSize: 25,
        paddingHorizontal: 10
    },
    socialAll: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    social: {
        width: 50,
        height: 50,
        borderColor: 'tomato',
        borderWidth: 0.3,
        borderRadius: 25,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 35,
        color: '#F06B6B',
        marginVertical: 20
    },
    slides: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    introImage: {
        backgroundColor: 'white',
        padding: 10,
        width: "75%",
        height: "40%",
        marginVertical: 30
    },
    introText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
    introTitle: {
        fontSize: 30,
        color: 'white',
    },
    voyageImage: {
        width: 60,
        height: 60
    },
    voyageInfoViewGlob: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingRight: 40
    }, 
    voyageButton: {
        alignSelf: 'flex-start', 
        height: 30, 
        width: 100, 
        backgroundColor: '#F06B6B', 
        borderRadius: 7, 
        padding: 5
    },
    voyage: {
        width: '92%',
        height: 205,
        borderWidth: 0.25,
        borderColor: 'rgba(0,0,0,0.3)',
        marginVertical: 10,
        borderRadius: 8,
        padding: 15,
        backgroundColor: 'white'
    }
}
exports.Styles = StyleSheetCreate

let Social = ({source}) => (
    <Pressable style={StyleSheetCreate.social}>
        <Image 
            source={source}
        />
    </Pressable>
)

let TextVoyage = ({texte1, texte2, texte3, color}) => (
    <View>
        <Text>{texte1}</Text>
        <Text style={{fontSize: 20, color: '#F06B6B', fontWeight: 'bold', marginVertical: 5}}>{texte2}</Text>
        <Text style={{color: color}}>{texte3}</Text>
    </View>
)

let Components = {
    Background: ({source, text}) => (
        <ImageBackground style={StyleSheetCreate.Background} source={source} resizeMode="cover" >
            <Text style={StyleSheetCreate.BackgroundText}>{text}</Text>
        </ImageBackground>
    ),

    Btn: ({text, event}) => (
        <Pressable style={[StyleSheetCreate.button, {width: '60%'}]} onPress={() => {event ? event(): ""}}>
            <Text style={StyleSheetCreate.buttonText}>{text}</Text>
        </Pressable>
    ),

    Input: ({v, s, p, se, o, blur, focus}) => {
        let [value, setValue] = useState(v)
        return (
            <View style={StyleSheetCreate.inputView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={s}
                        style={StyleSheetCreate.inputICon}
                    />
                    <TextInput 
                        onBlur={() => blur ? blur(): null}
                        onFocus={() => focus ? focus("Focus") : null}
                        placeholder={p}
                        style={StyleSheetCreate.input}
                        value={value}
                        secureTextEntry={se}
                        onChangeText={(value) => {setValue(value), o(value)}}
                    />
                </View>
            </View>
        )
    },
    TextWith: ({text, event}) => {
        return (
            <Pressable onPress={() => {event ? event() : ""}}>
                <Text style={StyleSheetCreate.textLogin}>{text}</Text>
            </Pressable>
        )
    },

    Social: () => (
        <View style={StyleSheetCreate.socialAll}>
            <Social source={require('./Components/icons/facebook.png')} />
            <Social source={require('./Components/icons/google-plus.png')} />
            <Social source={require('./Components/icons/twitter.png')} />
        </View>
    ),

    Title: ({text}) => (
        <Text style={StyleSheetCreate.title}>{text}</Text>
    ),

    Introduction: ({item}) => (
        <View key={item.id} style={StyleSheetCreate.slides}>
            <Text style={StyleSheetCreate.introTitle} key={item.id+'3'}>{item.title}</Text>
            <View style={StyleSheetCreate.introImage} key={item.id +'1'}></View>
            <Text style={StyleSheetCreate.introText} key={item.id+'2'}>{item.text}</Text>
        </View>
    ),

    Voyage: ({source, heureDepart, localite, parcouru, heureArrive, destination, price, event, date, name, present, valide}) => {
        
        let color = Math.floor(Math.random() * 3)
        color = colors[color]

        return (
            <TouchableOpacity style={[StyleSheetCreate.voyage]} onPress={() => event ? event() : ""} >
                <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    {
                        source == "" || source == "null" ? (
                            <View style={{height: 60, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: color}}> {name} </Text>
                            </View>
                        ) : (
                            <Image source={{uri: "data:image/png;base64," +source}} style={StyleSheetCreate.voyageImage}/>
                        )
                    }
                    <Text style={{fontSize: 16}}> {date} </Text>
                </View>
                <View style={StyleSheetCreate.voyageInfoViewGlob}>
                    <TextVoyage texte1="Depart" texte2={heureDepart} texte3={localite} color="#9AA1C2" />
                    <TextVoyage texte1="Temps" texte2="" texte3={parcouru} color="#9AA1C2" />
                    <TextVoyage texte1="Destination" texte2={heureArrive} texte3={destination} color="#9AA1C2" />
                </View>
                <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                    {
                        present ? (
                            <Pressable style={StyleSheetCreate.voyageButton} onPress={() => event ? event() : ""}>
                                <Text style={{textAlign: 'center', color: 'white'}}>Plus d'infos</Text>
                            </Pressable>
                        ) : 
                        !present && valide == false ? (
                            <Text style={{color: 'red', fontSize: 16}}> Non valide </Text>
                        ) :
                        !present && valide == true ? (
                            <Text style={{color: 'green', fontSize: 17}}> Valide </Text>
                        ): (
                            <Text></Text>
                        )

                    }
                    <Text style={{fontSize: 20, color: '#F06B6B', fontWeight: 'bold'}}>{price} FCFA</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
exports.Components = Components

let apiSource = "https://app-lonie-reservation.herokuapp.com"
exports.apiSource = apiSource

let screenOptions = {
    tabBarStyle:{
        borderTopWidth: 1
    },
    tabBarIndicatorStyle: {
        backgroundColor: '#F06B6B'
    }
}
exports.ScreenOptions = screenOptions

let options = {
    tabBarLabelStyle: {
        textTransform: 'capitalize',
        color: "red"
    }
}
exports.Options = options

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