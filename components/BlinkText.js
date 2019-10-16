import React, {Component} from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';

export default class BlinkText extends Component {

    constructor(props){
        super(props);
        this.state = {
            showText: true,
        };

        //Muda a todo segundo
        setInterval(() => {
            this.setState( previousState => {
                return { showText: !previousState.showText }
            });
        }, 1000);
    }

    render(){
        let display = this.state.showText ? this.props.text : '';
        return(
            <Text style={{ textAlign: 'center', marginTop: 10 }}>{display}</Text>
        )
    }
}