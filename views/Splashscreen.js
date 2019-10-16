import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    AsyncStorage,
    TouchableWithoutFeedback,
    StatusBar
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import  Immersive  from 'react-native-immersive';

import { createStackNavigator, NavigationActions, StackActions } from 'react-navigation';


import axios from 'axios';

var url = 'http://deadpyxel.pythonanywhere.com/api/v1/universities/1/';


export default class Splashscreen extends React.Component {
    
    constructor() {
        super();
        this.state = {
            show: false,
            listaTeste: []
        }
    }

    //salvar dados
    async _saveData(received) {
        let data = received;
        try {
            await AsyncStorage.setItem('@UNESPapp:item', JSON.stringify(data));

        } catch (error) {
            console.log(error)
        }
    }
    //recuperar dados
    async _getData(tag){
        let item = JSON.parse(await AsyncStorage.getItem(tag));
        let item2 = item.floors;
        
        var teste = item[0].floors;
        
        return item;
    }

    //recuperar dados
    async retrieveItem(key) {
        try {
            const retrievedItem  = await AsyncStorage.getItem(key);
            const item = JSON.parse(retrievedItem);
           
            return item;
        }catch (error) {
            console.log(error.message);
        }
        return;
    }

    componentDidMount() {
        StatusBar.setHidden(true, "fade");
    }

    componentWillMount() {
        Immersive.on()
        Immersive.setImmersive(true)
        var received;
        //recebendo as informações do servidor
        try {
            axios.get(url).then(function (response) {
                console.log(response.data.buildings);
                received = response.data.buildings;
            }).catch(function (error) {
                console.log(error);
            });
        }
        finally {
            setTimeout(() => {
                this._saveData(received);
                var itemR;
                //não funcionando
                itemR = this._getData('@UNESPapp:item');
                
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
                });
                this.props.navigation.dispatch(resetAction);
            }, 10000);

        }
    }


    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#16316F', '#0093DD']} style={styles.linearGradient} >
                    <View style={styles.containerImage}>
                        <Image style={styles.logo} resizeMode={'contain'} source={require('../assets/logo.png')} />
                    </View>
                </LinearGradient>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: '100%',
        paddingRight: '100%',
        borderRadius: 5
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        marginVertical: 20,
        height: 250,
        alignSelf: 'center',
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerImage: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});