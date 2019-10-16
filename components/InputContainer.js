import React, { Component } from 'react';

import { 
	View, 
	StyleSheet, 
	Text ,
	TextInput,
	Dimensions,
} from 'react-native';

export default class InputContainer extends Component{

	render (){
		return(
			<View style={styles.inputContainer}>
						<Text style={styles.boxTitle}>{this.props.label}</Text>
						<TextInput
							style={styles.boxInput}
							underlineColorAndroid="rgba(70,70,70,0)"
							placeholder={this.props.placeholder}
							value={this.props._value}
							onChangeText={text => this.props._onChangeText(text)}
							multiline={this.props._multiline}
							numberOfLines={this.props._lines}
						/>
			</View>
			);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		paddingHorizontal: 20,
		paddingVertical: 5,
		alignItems: 'center',
		width: '100%',
	},


	boxTitle: {
		color:'black',
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
		borderColor: '#999',
		borderRadius: 3,
	},
});







