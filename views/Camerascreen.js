'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Button,
  Platform,
  CameraRoll,
  Image,
  ScrollView,
  PermissionsAndroid
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createStackNavigator, NavigationActions, StackActions } from 'react-navigation';


export default class Camerascreen extends Component {

  constructor(props){
    super(props);
    const { navigate } = this.props.navigation;
    this.state = {
      capturing: false,
    }
  };

  static navigationOptions = ({navigation}) => ({
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 2,
      borderBottomColor: 'white',
    },
    headerRight: 
    <TouchableOpacity onPress={() => navigation.navigate("InfoScreen")}>
      <Image style={{
      height: 30,
      width: 30,
      marginRight: 15}} source={require('../assets/about.png')} />
    </TouchableOpacity>
    
  });


  render() {
    return (    
     <View style={styles.container}>
      <RNCamera
       ref={ref => {
         this.camera = ref;
       }}
       style={styles.preview}
       type={RNCamera.Constants.Type.back}
       flashMode={RNCamera.Constants.FlashMode.off}
       androidCameraPermissionOptions={{
            title: 'Permissão para o uso de câmera',
            message: 'Nós precisamos da sua permissão para usar a câmera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancelar',
          }}
      >
      
      <View style={styles.container}>
      <Text style={styles.fotoText}>Tire uma foto</Text> 
      <View style={styles.buttonContainer}>

      <TouchableOpacity
      onPress={this.takePicture.bind(this)}
      style = {styles.buttonCapture}
      >
      <Text style={styles.textCapture}> Tirar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('NoImageScreen')}
      style = {styles.button}
      >
        <Text style={styles.text}> Reportar sem foto </Text>
      </TouchableOpacity>


      </View>
      </View>
      </RNCamera>
      </View>
      );
  }


  takePicture = async() => {
    console.log('entreeeeeeeeeei')
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.props.navigation.navigate('ImageScreen', { uri: data.uri });
    }else{
      alert("Você não nos forneceu permissão para usar sua camera. Por favor, forneça a permissão para o aplicativo funcionar corretamente.");
    }
  };

  removePicture = () => {
    this.setState({image_uri: null});
  };

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },

  fotoText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Metropolis Regular',
    marginTop: 65,
  },

  preview: {
    flex: 1,
  },

  info: {
		height: 30,
		width: 30,
	},

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',

    justifyContent: 'space-around',
    alignItems: 'center'
  },


  buttonCapture: {
    backgroundColor: 'transparent',
    width:'50%',
    alignItems: 'center',
    borderColor:  '#ffffff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  button:{
    backgroundColor: 'transparent',
    width:'45%',
    alignItems: 'center',
    borderColor:  '#ffffff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
    marginBottom: 20,

  },

  textCapture:{
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'Metropolis Bold',
  },

  text:{
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Metropolis Bold',
  },

  take_photo:{
    width: 50,
    height: 50,
    alignSelf: 'center'
  },




});