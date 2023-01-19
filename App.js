import React, { useEffect } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationListener, requestUserPermission } from './src/utils/notificationHelper';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';


function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, [])
  return (
    <NavigationContainer>
    <AppStack /> 
     {/* <AuthStack /> */}
    </NavigationContainer>
  );
}

export default App;
