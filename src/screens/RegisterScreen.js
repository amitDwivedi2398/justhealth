import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import RegistrationSVG from '../assets/images/misc/registration.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import OtpInputs from 'react-native-otp-inputs';
import RNRestart from 'react-native-restart';


const RegisterScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [fullName, setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [storeddata, setStoreddata] = useState('');
  const [cityList, setCityList] = useState([]);
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  const [confirm, setConfirm] = useState(null);
  const [otp, setOTP] = useState('');
  const [cityId,setCityId]=useState('');

  const [language] = useState(
    [
      'Student',
      'Teacher',
      'Both',
    ].sort()
  );
  const getCity = async () => {
    axios
      .get(
        `http://hospitalmitra.in/newadmin/api/ApiCommonController/getcitylist`,
      )
      .then(response => {
        console.log(" city name list <<<<<??", response.data.data);
        const cityList = response.data.data;
        setCityList(cityList)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCity();
  }, []);

  const sendCity=()=>{
    console.log('data=>>>>>>>>>>>>>',storeddata,city,cityId)
    axios.post(
        `http://hospitalmitra.in/newadmin/api/ApiCommonController/cityupdatelist`,
        {
            id: storeddata,
            city:city,
            city_id:cityId
        },
    )
    .then(response => {
        console.log("???", response.data);
        })
        
    .catch(error => {
        console.log(error);
    })
}

  const _storeData = async id => {
    try {
      await AsyncStorage.setItem('user_id', JSON.stringify(id));
      console.log('id Saved');
      getData()
    } catch (error) {
      console.log('Some error in setting id');
    }
  };
  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        console.log('success');
        console.log('user_id ???????', user_id);
        setStoreddata(user_id);
        await sendCity()
     console.log('send city>>>>>>>>>>>>>>>>?');
        navigation.replace('CityScreen');
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  // useEffect(() => {
  //   getData();
  // }, [storeddata]);

  const postDataUsingSimplePostCall = async () => {
    if (!fullName.trim() || !number.trim() || !city.trim() || !otp.trim() || !password.trim())  {
      alert("Enter Details");
      return;
    }
    axios
      .post('http://hospitalmitra.in/newadmin/api/ApiCommonController/userRegister', {
        username: fullName,
        mobile_no: number,
        city: city,
        dob: date,
        password:password,
        otp:otp,
        email:email,
      })
      .then(function (response) {
        // handle success
        // alert(JSON.stringify(response.data));
        // save user Id
        if (response.data !== null) {
          _storeData(response.data.data.id);
        } else {
          console.log('no id!');
        }
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
  };

  const signInWithPhoneNumber = async () => {
    const confirmation = await auth().signInWithPhoneNumber('+91' + number);
    setConfirm(confirmation);
    console.log(confirmation, "confirmation kya aya?");
  }
  const confirmCode = async () => {
    try {
      const res = await confirm.confirm(otp);
      postDataUsingSimplePostCall();
    } catch (error) {
      console.log('Invalid code.');
    }
  }
console.log(city,'????');
console.log(cityId,'????');
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      {confirm ? (<ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <RegistrationSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: '-5deg' }] }}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        <View style={{ height: 100, alignSelf: 'center' }}>
          <OtpInputs
            textAlign="center"
            inputStyles={styles.otp}
            inputContainerStyles={styles.otpContainer}
            handleChange={code => {
              console.log(`code is ${code},you are good to go`);
              setOTP(code);
            }}
            numberOfInputs={6}
            autoFocusOnLoad
          />
        </View>
        <CustomButton label={"SUBMIT"} onPress={() => confirmCode()} />
      </ScrollView>)
        : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: 25 }}>
            <View style={{ alignItems: 'center' }}>
              <RegistrationSVG
                height={300}
                width={300}
                style={{ transform: [{ rotate: '-5deg' }] }}
              />
            </View>

            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 28,
                fontWeight: '500',
                color: '#333',
                marginBottom: 30,
              }}>
              Register
            </Text>

            <InputField
              value={fullName}
              color={'#333'}
              pcolor={'#333'}
              onChangeText={setfullName}
              label={'Full Name'}
              icon={
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
              }
            />

            <InputField
              value={number}
              color={'#333'}
              pcolor={'#333'}
              onChangeText={setNumber}
              label={'Enter your Phone No. '}
              icon={
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
              }
            />
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
            <InputField
              value={password}
              color={'#333'}
              pcolor={'#333'}
              onChangeText={setPassword}
              label={'Password'}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
              }
            />
            <View style={{
              flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ccc',
              borderBottomWidth: 1, marginBottom: 30
            }} >
              <EvilIcons
                name="location"
                size={20}
                color="#666"
                style={{}}
              />
              <Picker
                style={{ width: '80%', }}
                selectedValue={city}
                onValueChange={(itemVal) => {
                  let data=cityList.filter(element =>element.cityname===itemVal );
                 setCityId(data[0]?.id)
                  setCity(data[0]?.cityname);
                }}
              >
                {
                  cityList.map((l) => (
                     <Picker.Item label={l.cityname} value={l.cityname} style={{ color: '#222' }} />
                  ))
                }

              </Picker>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 30,
              }}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={{ color: '#666', marginLeft: 5, marginTop: 5 }}>
                  {dobLabel}
                </Text>
              </TouchableOpacity>
            </View>

            <DatePicker
              modal
              open={open}
              date={date}
              mode={'date'}
              maximumDate={new Date('2023-01-01')}
              minimumDate={new Date('1950-01-01')}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setDobLabel(date.toDateString());
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            {!confirm ? (<CustomButton label={"Register"} onPress={() => signInWithPhoneNumber()} />
            ) : (<Text>Amit</Text>)}

            {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View> */}
          </ScrollView>
        )
      }

    </SafeAreaView>
  );
};

export default RegisterScreen;
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
