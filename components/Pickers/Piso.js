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

import Sala from './Sala';


export default class Piso extends Component {

    constructor(props){
        super(props);
        this.state={
            modalVisible: false,
            listaPisos: [],
            selected: "",
            message: "Selecione o Piso"
        }
    }

    componentWillMount() {
		
        this._getPisos('@UNESPapp:item', this.props.bloco);
    }

    async _getPisos(tag, bloco){
        let item = JSON.parse(await AsyncStorage.getItem(tag));
        for(i = 0; item.length > i; i++){
            if(item[i].pk == bloco){
                for(j = 0; item[i].floors.length > j; j++){
                    this.state.listaPisos[j] = item[i].floors[j];
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
                            <Text style={ styles.txtContainer }>Pisos</Text>
                        </View>
					    <ScrollView style={styles.scroll}>
                            <View style={styles.listContainer}>
						    { this.state.listaPisos.map(piso => (

                                    <TouchableHighlight
                                        key={piso.pk}
                                        onPress={() => this.setState({ selected: piso.pk, modalVisible: false, message: piso.name})}
                                       style={styles.innerBtn}
                                    >
                                        <Text style={styles.txtBtn}>{piso.name}</Text>
                                    </TouchableHighlight>

                            ))}
                            </View>
					    </ScrollView>
			        </View>
                </Modal>
                {
                    this.state.selected === ""
                    ? null
                    : <Sala bloco={this.props.bloco} piso={this.state.selected}/>
                }
            </View>   
        );
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