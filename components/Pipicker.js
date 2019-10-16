import React, { Component } from 'react';
import {
	View,
	Picker,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native';


export default class Pipicker extends React.Component  {

	state = { 
		locais : [
		{
			id: 1,
			label:'bloco 1',
			value:'b1',
		},
		{
			id: 2,
			label:'bloco 2',
			value:'b2',
		},
		{
			id: 3,
			label:'bloco 3',
			value:'b3',
		},
		],
		lista: []
	}

	/*componentWillMount() {

		//request HTTP dos itens
		axios.get(url).then( response => { this.setState({ lista: respose.data}); })
			.catch(() => { console.log( 'Erro ao recuperar os dados'); });

	}*/ // necessita da API para ser implementado

	render() {
		return(
			<View style={styles.pickerContainer}>

			<Text style={styles.boxTitle}>{this.props.label}</Text>
			<Picker 
			selectedValue={ this.state.PickerValue } 
			onValueChange={( itemValue, itemIndex ) => this.setState({ PickerValue: itemValue })}
			style={styles.boxInput}
			>

			{this.state.locais.map(local => <Picker.Item key={local.id} label={local.label} value={local.value} /> ) }

			</Picker>
			</View>
			);
	}

}

const styles = StyleSheet.create({
	pickerContainer: {
		paddingHorizontal: 20,
		paddingVertical: 5,
		alignItems: 'center',
		width: Dimensions.get('screen').width,
	},


	boxTitle: {
		fontWeight: 'bold',
		fontSize: 16,
		alignSelf: 'flex-start',
	},

	boxInput: {
		alignSelf: 'stretch',
		marginTop: 10,
		paddingBottom: 10,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderColor: '#DDD',
		borderRadius: 3,
	},
});