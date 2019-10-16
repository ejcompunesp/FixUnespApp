import React, { Component } from 'react';
import {
    View,
    Picker,
    Button,
    Modal,
    TouchableOpacity,
    Alert,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';

import axios from 'axios';


export default class Sala extends Component {

    constructor(props){
        super(props);
        this.state={
            modalVisible: false,
            listaSalas: [],
            selected: "",
            message: "Selecione a Sala"
        }
    }

    componentWillMount() {
		
        this._getSalas('@UNESPapp:item', this.props.bloco, this.props.piso);
    }

    async _getSalas(tag, bloco, piso){
        let item = JSON.parse(await AsyncStorage.getItem(tag));
        console.log('-------------AQUI---------------');
        console.log(item[0].floors[0].rooms[0]);
        console.log(piso);
        console.log(bloco);
        for(i = 0; item.length > i; i++){
            if(item[i].pk == bloco){
                for(j = 0; item[i].floors.length > j; j++){
                    if(item[i].floors[j].pk == piso){
                        for(k = 0; item[i].floors[j].rooms.length > k; k++){
                            this.state.listaSalas[k] = item[i].floors[j].rooms[k];
                        }
                        return;
                    }
                }
                return;
            }
        }
    }

    render() {
        return(
            <View>
                <TouchableOpacity
                    onPress={ () => {this.setState({modalVisible: true})} }
                    style={styles.button}
                >
                    <Text style={styles.txtBtn}>{this.state.message}</Text>
                </TouchableOpacity>
                <Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose = {() => {
                        this.setState({ modalVisible: false });
                    }}
		        >   
                    <View style={styles.container}>
                        <View style={ styles.containerTop } >
                            <Text style={ styles.txtContainer }>Salas</Text>
                        </View>
					    <ScrollView style={styles.scroll}>
                            <View style={styles.listContainer}>
						    { this.state.listaSalas.map(sala => (

                                    <TouchableHighlight
                                        key={sala.pk}
                                        onPress={() => this.storageChoice( this.props.bloco , this.props.piso, sala.pk, sala.name)}
                                        style={styles.innerBtn}
                                    >
                                        <Text style={styles.txtBtn}>{sala.name}</Text>
                                    </TouchableHighlight>

                            ))}
                            </View>
					    </ScrollView>
			        </View>
                </Modal>
            </View>   
        );
    }

    async storageChoice(bloco, piso, sala, message) {

        this.setState({ selected: sala, modalVisible: false, message});
        
        let newChoice = {
            bloco: bloco.toString(),
            piso: piso.toString(),
            sala: sala.toString(),
        }

        try{
            await AsyncStorage.setItem('@UNESPapp:Choice', JSON.stringify(newChoice));
        }catch (error){
            console.log(error);
        }
    }

}

const styles = StyleSheet.create({
    container:{
        margin: 45,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        flex: 1,
        height: 200
    },

    containerTop:{
        height: 60,
        width: '100%',
        //backgroundColor: 'rgba(8, 18, 114, 1)',
        backgroundColor: '#003948',
        alignItems: 'center',
        justifyContent: 'center'
    },

    txtContainer:{
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },

    scroll: {
        width: '100%',

    },
    listContainer:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    txtBtn: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Metropolis Bold',
    },

    txtInner: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Metropolis Bold',
    },

    button: {
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#1850B0',
        width: 300,
        height: 50,
        marginTop: 5,
        marginBottom: 5,
    },

    innerBtn:{

        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: 50,
        backgroundColor: '#1850B0',

        marginTop: 5
    }

});