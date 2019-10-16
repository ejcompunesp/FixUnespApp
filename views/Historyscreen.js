'use strict';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Dimensions,
  ScrollView
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import PiList from '../components/PiList';

import Bloco from '../components/Pickers/Bloco';
import Piso from '../components/Pickers/Piso';

export default class Historyscreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      historico: [],
    };
  };

  _refresh = async() =>{
    let historico = JSON.parse(await AsyncStorage.getItem('@UNESPapp:historico')) || [];

    this.setState({historico: historico})
  }

  _clear = async () => {
    await AsyncStorage.removeItem('@UNESPapp:historico');
    this.setState({ historico: [] });
  }

  componentDidMount(){
    this._refresh();
  }

  // static navigationOptions = {
  //   title: 'FCT-UNESP',
  //   // headerStyle: { backgroundColor: 'black'},
  //   // headerTitleStyle: { color: 'white'},
  // };

  render() {

    return (
      <View style={styles.container}>
      <Text style={styles.titulo}>HISTÓRICO</Text>
      <ScrollView style={styles.scroll}>
      {this.state.historico.map(hist => 
        <PiList
        key={hist.id}
        title={hist.email}
        description={hist.descricao}
        uri={hist.uri}
        />

        )}
      </ScrollView>
      

      <TouchableOpacity
      style={styles.clear}
      onPress={this._clear}
      >
      <Text style={styles.textClear}>Limpar Histórico</Text>
      </TouchableOpacity>

      </View>
      );
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },

  titulo:{
    marginLeft: '5%',
    marginTop: '1%',
    fontFamily: 'Metropolis Regular',
    fontSize: 45,
    fontWeight: 'bold',
    color:'black',
  },

  clear:{
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'red',
    margin: 30,
  },

  textClear: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  scroll: {
    height: Dimensions.get('window').height - 60,
  }

});
