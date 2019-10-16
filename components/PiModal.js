import React, { Component } from 'react';

import { 
  View, 
  StyleSheet, 
  Modal, 
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';

export default class PiModal extends Component{
  
  render (){
    return(
      <Modal animationType="fade" transparent={true} visible={this.props.visible} onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxTitle}>Enviado!</Text>
            <Text style={styles.boxDescription}>Seu relatório foi enviado. Caso você não esteja na Unesp no momento em que fez o relatório, ele não será reconhecido como válido pelo sistema. Em breve alguém será designado para o conserto. Agradecemos sua colaboração!</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={this.props.onCancel}
                >
                  <Text style={styles.buttonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>
      );
  }
}

const styles = StyleSheet.create({
  modalContainer:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    width: 280,
  },

  boxTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  boxInput: {
    alignSelf: 'stretch',
    marginTop: 10,
    paddingVertical: 0,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    height: 40,
    borderRadius: 3,
  },

  buttonContainer: {
    marginTop: 10,
    height: 40,
    flexDirection: 'row',
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    height: 40,
    width: 200,
  },

  cancelButton: {
    backgroundColor: '#E25F5F',
    marginRight: 5,
  },

  submitButton: {
    backgroundColor: 'black',
    marginRight: 5,
  },

  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 12,
  },

  boxDescription: {
    fontSize: 12,
  }

});