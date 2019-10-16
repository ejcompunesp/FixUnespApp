import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';

import { createStackNavigator, NavigationActions, StackActions  } from 'react-navigation';
navigator.geolocation = require('@react-native-community/geolocation');
import InputContainer from '../components/InputContainer';
import Pipicker from '../components/Pipicker';
import PiModal from '../components/PiModal';
//linhas 41, 42, 43 - como tratar os pickers? 41 - picker bloco, 42 - picker andar, 43 - picker sala

import Bloco from '../components/Pickers/Bloco';

export default class NoImageScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            historico: [],
            email: "",
            descricao: null,
            latitude: null,
            longitude: null,
            error: null,
            position: null
        }
    };

    _getUser = async() => {
        let user = JSON.parse(await AsyncStorage.getItem('@UNESPapp:user'));

        let email = user.email;
        this.setState({
            email: email,
        });
    }
    
    componentDidMount = () => {
        this._getUser();
        navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = JSON.stringify(position.coords.latitude);
              const long = JSON.stringify(position.coords.longitude);
      
              this.setState({ latitude: lat, longitude: long });
            },
            (error) => {alert(error.message)},
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
    }
    

    componentWillUnmount = () => {
        navigator.geolocation.clearWatch()
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>Descrição</Text>
                    <InputContainer 
                        label={"Email"}
                        _state={"Email"}
                        _value={this.state.email}
                        _onChangeText={this._changeEmail}
                        placeholder={"(Opcional)" + this.state.email}
                        _multiline={false}
                        _lines={1}
                    />

                    <InputContainer 
                        label={"Descrição"}
                        _state={"Descricao"}
                        _value={this.state.descricao}
                        _onChangeText={this._changeDescricao}
                        placeholder={"Detalhe bem o problema que está sendo reportado."}
                        _multiline={true}
                        _lines={4}
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                        <Bloco />
                    </View>

                      <TouchableOpacity
                           style={styles.enviar}
                           onPress={this._sendData}
                       >
                          <Text style={styles.textEnviar}>Enviar</Text>
                       </TouchableOpacity>

                </ScrollView>
                <PiModal 
                    onCancel={this._finish}
                    visible={this.state.modalVisible}
                />
            </View>
        );
    }



    _sendData = async () => {

        if(this.state.descricao == null){
            Alert.alert("Por favor, preencha o campo da descrição!");
        }else{
            let historico = JSON.parse(await AsyncStorage.getItem('@UNESPapp:historico')) || [];
            let data = JSON.parse(await AsyncStorage.getItem('@UNESPapp:Choice'));

            let novoHistorico = 
            {
                id: historico.length,
                email: this.state.email,
                descricao: this.state.descricao,
            }

            let novoArray = [
                ...historico,
                novoHistorico
            ];

            this.setState({ 
                historico: novoArray,
            });

            await AsyncStorage.setItem('@UNESPapp:historico',JSON.stringify(this.state.historico));

            const formData = new FormData();

            formData.append('category', 1);
            formData.append('ticket_description', this.state.descricao);
            formData.append('lat', this.state.latitude);
            formData.append('long', this.state.longitude);
            formData.append('building', data.bloco);
            formData.append('floor', data.piso);
            formData.append('room', data.sala);
            formData.append('email', this.state.email);

            console.log("formData", formData);

            fetch('http://deadpyxel.pythonanywhere.com/api/v1/tickets/',{
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }, 
                body:formData,
            }).then((response) => {
                response.json();
                console.log('RESPONSE');
                console.log(response.status);
            }).then((responseData) => {
                console.log("responseData: ");
                console.log(responseData);
            }).catch((error) => {
                console.log("ERRO:");
                console.log(error);
            });

            this.setState({ modalVisible: true })
        }
    }

    _changeEmail = (email) => {
        this.setState({
          email: email,
        });
    };
    
    _changeDescricao = (descricao) => {
        this.setState({
          descricao: descricao,
        });
    };

    _finish = () => {
        this.setState({ 
          modalVisible: false, 
          email: "",
          descricao: "",
          image: null,
        });
        
        const resetAction = StackActions.reset({
                    index: 1,
                    actions: [
                      
                      
                      NavigationActions.navigate({ routeName: 'HomeScreen' }),
                      NavigationActions.navigate({ routeName: 'HistoryScreen' })
                    ],
                  });
        this.props.navigation.dispatch(resetAction);
    }
    
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DDD',
        paddingTop: 30,
    },
  
    title:{
      fontSize: 22,
      fontWeight: 'bold',
      color: 'black',
      alignSelf: 'center',

    },
  
    ImageContainer: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').width,
      alignItems: 'center',
      backgroundColor: '#03A9F4',
    },

    enviar:{
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 5,
      height: 70,
      width: 200,
      backgroundColor: '#003948',
        marginTop: 45,
        marginBottom: 45,
    },
  
    textEnviar: {
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'Metropolis Bold',
      color: 'white',

    }
  
  });