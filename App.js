import React from 'react';
import { createStackNavigator} from 'react-navigation';
import { YellowBox, Button, Image, TouchableOpacity } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import SplashScreen from './views/Splashscreen';
import HomeScreen from './views/Homescreen';
import CameraScreen from './views/Camerascreen';
import ImageScreen from './views/Imagescreen';
import HistoryScreen from './views/Historyscreen';
import InfoScreen from './views/Infoscreen';
import UserScreen from './views/Userscreen';
import NoImageScreen from './views/NoImageScreen';


export default App = createStackNavigator({ 
  SplashScreen: SplashScreen,
  HomeScreen: HomeScreen,
  CameraScreen: CameraScreen,
  ImageScreen: ImageScreen,
  HistoryScreen: HistoryScreen,
  InfoScreen: InfoScreen,
  UserScreen: UserScreen,
  NoImageScreen: NoImageScreen,
}, {  
	navigationOptions: {
    title: 'Fix Unesp',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#009FE0',
      borderBottomWidth: 1,
      borderBottomColor: 'white',
    },
	}
});