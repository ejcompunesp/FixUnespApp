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
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import InputContainer from '../components/InputContainer';

export default class Userscreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      user:{
        email: null,
        nome: null,
      }
    }
  };


  componentDidMount(){
    this._getUser();
  }

  _getUser = async() => {

    try{
      let user = JSON.parse(await AsyncStorage.getItem('@UNESPapp:user'));

      if(user !== null){
        this.setState({
          user: user
        });
      }
    }catch (error){
      console.log("Error: ", error);
    }
    
  }

  _saveUser = async() => {
    let user = this.state.user;

    console.log("USER SAVE:")
    console.log(user);
    try{
      await AsyncStorage.setItem('@UNESPapp:user',JSON.stringify(user));
    } catch(error){
      console.log("Error: ", error);
      alert("Erro ao salvar dados.");
    }
    


    Alert.alert(
      'Dados Salvos',
      'Dados Salvos com Sucesso!',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }



  // static navigationOptions = {
  //   title: 'FCT-UNESP',
  //   // headerStyle: { backgroundColor: 'black'},
  //   // headerTitleStyle: { color: 'white'},
  // };

  render() {

    return (
      <View style={styles.container}>

      <ScrollView style={styles.scroll}>
          <Text style={styles.titulo}>USUÁRIO</Text>

          <View style={styles.inputsubcontainer}>
          <InputContainer 
            label={"Email"}
            _state={"Email"}
            _value={this.state.user.email}
            _onChangeText={this._changeEmail}
            placeholder={"example@dominio.com"}
            _multiline={false}
            _lines={1}
          />

          <InputContainer 
            label={"Nome"}
            _state={"Nome"}
            _value={this.state.user.nome}
            _onChangeText={this._changeNome}
            placeholder={"Nome completo"}
            _multiline={false}
            _lines={1}
          />
          </View>
        
        <View style={styles.subcontainer}>
          <Text style={styles.title}>OBS: Não é necessário fornecer as informações para utilizar o aplicativo. </Text>
          <Text style={styles.descricao}>Essas informações serão utilizadas apenas para relatórios e feedbacks, de forma alguma serão utilizadas para identificação do usuario.</Text>

          <TouchableOpacity
          style={styles.save}
          onPress={this._saveUser}
          >
            <Text style={styles.textSave}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      

      </View>
      );
  }   

  _changeEmail = (email) => {
    this.setState({
      user:{
        email: email,
        nome: this.state.user.nome
      }
    });
  };

  _changeNome = (nome) => {
    this.setState({
      user:{
        nome: nome,
        email: this.state.user.email
      }
    });
  };



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  scroll: {
    height: '100%',
    width: '100%',
  },

  subcontainer: {
    height: '100%',
    width: '90%',
    margin: 20,
  },

  inputsubcontainer: {
  },

  title:{
    fontSize: 14,
    fontWeight: 'bold',
  },

  titulo:{
    marginLeft: '5%',
    marginTop: '1%',
    fontFamily: 'Metropolis Regular',
    fontSize: 45,
    fontWeight: 'bold',
    color:'black',
  },

  descricao: {
    fontSize: 12,
  },

  save:{
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#009FE0',
    margin: 30,
  },

  textSave: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

});
