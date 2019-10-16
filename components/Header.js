import React, { Component } from 'react';

import { 
	View, 
	StyleSheet, 
	Modal, 
	TextInput,
	TouchableOpacity,
	Dimensions,
	Text,
	Platform,
	Image
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

export default class Header extends Component{

	static navigationOptions = {
		title: 'FCT-UNESP',
		headerStyle: { backgroundColor: 'black'},
		headerTitleStyle: { color: 'white'},
	};

	render (){
		return(
			<View style={styles.header}>
			<Text style={styles.headerText}>UNESPapp</Text>
			{(this.props.showButton) ?
			<TouchableOpacity onPress={this.props.onClick}>
			<Image style={styles.info} source={require('../assets/about.png')} />
			</TouchableOpacity>
			:
			null
			}
			</View>
			);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: 'transparent',
		borderBottomWidth: 2,
		borderBottomColor: 'white',
		height: (Platform.OS === 'ios') ? 70 : 50,
		paddingTop: (Platform.OS === 'ios') ? 20 : 0,
		justifyContent: 'space-between',
		fontFamily: 'Open Sans',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 20,
	},
	headerText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
	},

	headerButton:{
		fontSize: 24,
		fontWeight: 'bold',
		color: 'black',
	},
	info: {
		height: 30,
		width: 30,
	}

});