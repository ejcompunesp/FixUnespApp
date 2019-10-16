import React, { Component } from 'react';
import {
	ScrollView,
	StyleSheet,
	View,
	Alert, 
	TouchableHighlight,
	Text,
	TouchableOpacity
} from 'react-native';
import axios from 'axios';


//lista
export default class ListaItens extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			listaItens: [],
			selected: "",
			modalVisible: false
		};

	}

	componentWillMount() {
		//requisção HTTP
		axios.get('http://deadpyxel.pythonanywhere.com/api/v1/universities/1/')
			.then(response => { this.setState({ listaItens: response.data.buildings }); })
			.catch(() => { console.log('Erro ao recuperar os dados'); });
	}

  render() {
    return (
			<View style={styles.container}>
					<ScrollView style={styles.scroll}>
						{ this.state.listaItens.map(item => (
							<TouchableHighlight
								key={item.name}
								onPress={ () => this.setState({ selected: item.name, modalVisible: false }) }
							>
								<Text style={styles.txtTitulo}>{item.name}</Text>
							</TouchableHighlight>  
						))}
					</ScrollView>
			</View>

    );
  }
}



const styles = StyleSheet.create({
	container:{
		margin: 35,
		alignItems: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.8)',
		justifyContent: 'center',
		flex: 1,
	},

	scroll: {
		backgroundColor: 'red',
		width: 50,
		height: 10
	},

	txtTitulo: {
		fontSize: 18,
		color: 'black',
		marginBottom: 5
	},

});
