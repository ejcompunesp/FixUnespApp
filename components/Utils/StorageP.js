import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';


const StorageP = {

    //armazenar itens
    async storeItem(key, item)  {
        try{
            //stringify usado para converter o json em data string
            var jsonItem = await AsyncStorage.setItem(key, JSON.stringify(item));
            return jsonItem;
        }catch (error){
            console.log(error.message);
        }
    },

    //recuperar dados
    async retrieveItem(key) {
        try {
            const retrievedItem  = await AsyncStorage.getItem(key);
            const item = JSON.parse(retrievedItem);
            return item;
        }catch (error) {
            console.log(error.message);
        }
        return;
    }

}

export {
    StorageP
}