import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../assets/images/misc/login.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { set } from 'react-native-reanimated';
import OtpInputs from 'react-native-otp-inputs';


const ForgotScreen = ({ navigation }) => {
  const [storeddata, setStoreddata] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const [data, setData] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOTP] = useState('');


  const verifyOtp = () => {
    console.log(email);
    axios
      .post(
        `http://hospitalmitra.in/newadmin/api/ApiCommonController/forgotpasswordd`,
        {
          email: email,
        },
      )
      .then(response => {
        console.log('@@@@@', response.data);
        if (response.data != null) {
            navigation.replace('VerifyOtpScreen');
          } else {
            console.log('no id!');
          }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
          <ScrollView>
            <View style={{ paddingHorizontal: 25 }}>
              <View style={{ alignItems: 'center' }}>
                <Image style={{ width: 300, height: 250 }} source={require('../assets/VerifyEmail/midiyam.png')} />

              </View>

              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 28,
                  fontWeight: '500',
                  color: '#333',
                  marginBottom: 30,
                }}>
                Forgot Password
              </Text>

              <InputField
          label={'Email ID'}
          value={email}
          color={'#333'}
              pcolor={'#333'}
          onChangeText={setEmail}
          icon={
            <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
        />

              <CustomButton label={"Get Otp"} onPress={verifyOtp} />

            </View>
          </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotScreen;
const styles = StyleSheet.create({
  otp: {
    borderWidth: 1,
    borderStyle: 'solid',
    color: 'black',
    // padding: '0%',
    height: 50,
    width: 50,
    // justifyContent: 'center',
    // marginRight: 10,
    // alignItems: 'center',
    borderRadius: 10,
    borderColor: '#D2D5DC',
  },
  otpContainer: {
    color: 'black',
    padding: '1%',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
