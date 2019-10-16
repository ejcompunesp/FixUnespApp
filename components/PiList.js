import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
} from 'react-native';


export default class PiList extends React.Component  {

	render() {
		return(
			<View style={styles.container}>
			<Image
			style={styles.itemImage}
			source={{uri: this.props.uri}}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.itemTitle}>{this.props.title}</Text>
				<Text style={styles.itemDescription}>{this.props.description}</Text>

			</View>
			</View>
			);
	}

}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10,
		marginVertical: 5,
		marginHorizontal: 10,
		width: Dimensions.get('window').width - 20,
		backgroundColor: 'white',
		borderRadius: 5,
	},

	itemImage:{
		width: 80,
		height: 80,
		borderRadius: 40,
	},

	textContainer: {
		flexDirection: 'column',
		marginLeft: 10,
		justifyContent: 'center',
	},

	itemTitle:{
		fontSize: 12,
		fontWeight: 'bold',
	},

	itemDescription:{
		fontSize: 11,
	},
});