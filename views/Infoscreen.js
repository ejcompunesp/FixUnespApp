import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

export default class Infoscreen extends React.Component {

  // static navigationOptions = {
  //   title: 'FCT-UNESP',
  //   // headerStyle: { backgroundColor: 'black'},
  //   // headerTitleStyle: { color: 'white'},
  // };

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.imageContainer}>
        <Image style={styles.logo} resizeMode={'contain'} source={require('../assets/logo.png')}/>
        </View>

        <ScrollView>

      <View style={styles.subcontainer}>
        <Text h1 style={styles.title}>SOBRE</Text>
        <Text style={styles.sobre}>
        Esse aplicativo é dedicado a relatar problemas em equipamentos e em instalações físicas existentes no campus. Os problemas serão enviados para um responsável da reitoria, de forma que seja possível tomar todas as medidas necessárias para sua solução
        . Quando solucionado, o usuário será notificado no e-mail inserido.
        </Text>

        <Text h1 style={styles.title}>EJCOMP</Text>

        <Text style={styles.sobre}>
        A EJComp, Empresa Júnior da Computação, fundada em 2006, é uma empresa com sede no campus da UNESP de Presidente Prudente, formada e gerida por alunos do curso de Ciência da Computação que atua na área de desenvolvimento para soluções Web e aplicativos para diversas plataformas 
        
        </Text>
        <Image style={styles.logoEJC} resizeMode={'contain'} source={require('../assets/ejcomp.png')}/>
        <Text h1 style={styles.footer}>Desenvolvido por EJCOMP & Robson</Text>
      </View>
      </ScrollView>
      </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  imageContainer:{
    backgroundColor: '#003948',
    height: 260,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subcontainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  title: {
    marginTop: '1%',
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'black',
  },

  sobre: {
    paddingHorizontal: 20,
  },

  logo:{

    height: 250,

  },

  logoEJC:{
    marginVertical: 20,
    height: 70,
    alignSelf: 'center',
  },

  footer:{
    marginTop: 30,
    fontSize: 11,
    alignSelf: 'center',
  }
});

