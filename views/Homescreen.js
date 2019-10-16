'use strict';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    AsyncStorage,
    Dimensions,
    ScrollView,
    Alert,
    Image,

} from 'react-native';
import { createStackNavigator, NavigationActions, StackActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';


export default class Homescreen extends Component {

    constructor(props){
        super(props);

        const { navigate } = this.props.navigation;

    }

    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    render(){
        return(
            <LinearGradient colors={['#009EE4','#1850B0']} style = {styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.logo} resizeMode={'contain'} source={require('../assets/logo.png')} />
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity
                        style = {styles.button}
                        onPress={() => this.props.navigation.navigate('CameraScreen')}
                    >
                        <View style={styles.iconAux}>
                            <Image style={styles.icon} resizeMode={'contain'} source={require('../assets/icon-tools.png')} />
                        </View>
                        <View style={styles.textAux}>
                            <Text style = {styles.text}>FixUNESP</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.button}
                        onPress={() => this.props.navigation.navigate('HistoryScreen')}
                    >
                        <View style={styles.iconAux}>
                            <Image style={styles.icon} resizeMode={'contain'} source={require('../assets/icon-history.png')} />
                        </View>
                        <View style={styles.textAux}>
                            <Text style = {styles.text}>Histórico</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.button}
                        onPress={() => this.props.navigation.navigate('UserScreen')}
                    >
                        <View style={styles.iconAux}>
                            <Image style={styles.icon} resizeMode={'contain'} source={require('../assets/icon-login.png')} />
                        </View>
                        <View style={styles.textAux}>
                            <Text style = {styles.text}>Login</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.button}
                        onPress={() => this.props.navigation.navigate("InfoScreen")}
                    >
                        <View style={styles.iconAux}>
                            <Image style={styles.icon} resizeMode={'contain'} source={require('../assets/icon-info.png')} />
                        </View>
                        <View style={styles.textAux}>
                            <Text style = {styles.text}>Informações</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({

    container:{
      flex: 1,
      backgroundColor: 'steelblue',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },

    imageContainer:{
        marginTop: 20,
        alignItems: 'center',

    },

    menuContainer:{
        marginTop: 50,
        alignItems: 'center',


    },

    logo:{
        height: 250,
    },

    button: {
       backgroundColor: '#ffffff',
       width:'80%',
       height: 70,
       flexDirection: 'row',
       alignItems: 'center',
       elevation: 5,
       borderColor:  '#ffffff',
       //borderWidth: 2,
       borderRadius: 12,
       margin: 5,

    },

    text:{
        color: '#003948',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Metropolis Bold',

    },

    textAux:{
       alignItems: 'center',
       width: '70%'
    },



    icon:{
        height: 45,
        width: 45,
        margin: 5,

    },

    iconAux:{
        backgroundColor: '#003948',
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
        height: '100%',
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
    }
});