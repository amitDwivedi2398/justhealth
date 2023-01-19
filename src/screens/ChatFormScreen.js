import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import BackHeader from '../components/BackHeader';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { log } from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import CustomHeader from '../components/CustomHeader';



const ChatFormScreen = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [cityList, setCityList] = useState([]);
  const [branch, setBranch] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [genderList] = useState(['Male', 'Female'])


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
  };
  useEffect(() => {
    getCity();
  }, []);
  const getBranch = async () => {
    axios
      .get(
        `http://hospitalmitra.in/newadmin/api/ApiCommonController/branchbycity/${city}`,
      )
      .then(response => {
        console.log(" branch list <<<<<??", response.data.data);
        const branch= response.data.data
        setBranch(branch)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getBranch();
  }, [city]);
  const getHospital = async () => {
    axios
      .get(
        `http://hospitalmitra.in/newadmin/api/ApiCommonController/hospitalbybranch/${gender}`,
      )
      .then(response => {
        console.log(" hospital list <<<<<??", response.data.data);
        const hospital = response.data.data
        setHospital(hospital)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getHospital();
  }, [gender]);
  const sendChatDetails = async ()=>{
    axios.post(`http://hospitalmitra.in/newadmin/api/ApiCommonController/submitform`,
    {
        city_id:city,
        branch_id:gender,
        user_id: await AsyncStorage.getItem('user_id'),
        hospital_id:hospitalId,
    })
      .then(response => {
        console.log('////////', response.data);
        const formId = response.data.data.hospital_id
        if(response.data){
            navigation.replace('ChatScreen',{formid:formId})
            return;
        }
        
        
      })
      .catch(error => {
        console.log(error);
      })    
}
  return (
    <SafeAreaView style={styles.container} >
    <CustomHeader TitleName={'Scheme'} />
          <ScrollView showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: 25, }}>
            <View style={{
              flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ccc',
              borderBottomWidth: 1, marginBottom: 30
            }} >
              <MaterialIcons
                name="location-city"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
              <Picker
                style={{ width: '80%', }}
                selectedValue={city}
                onValueChange={(itemVal) => {
                  setCity(itemVal);
                }}
              >
                {
                  cityList.map((l) => (
                    <Picker.Item label={l.cityname} value={l.id} style={{ color: '#222' }}  />
                  ))
                }

              </Picker>
            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ccc',
              borderBottomWidth: 1, marginBottom: 30
            }} >
              <Ionicons
                name="md-transgender-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
              <Picker
                style={{ width: '80%',color:'#333' }}
                selectedValue={gender}
                onValueChange={(itemVal) => {
                  setGender(itemVal);
                }}
              >
                {
                    branch.map((l) => (
                    <Picker.Item label={l.depart_name} value={l.id} style={{ color: '#222' }} />
                  ))
                }

              </Picker>
            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ccc',
              borderBottomWidth: 1, marginBottom: 30
            }} >
              <Ionicons
                name="md-transgender-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
              <Picker
                style={{ width: '80%',color:'#333' }}
                selectedValue={hospitalId}
                onValueChange={(itemVal) => {
                  setHospitalId(itemVal);
                }}
              >
                {
                    hospital.map((l) => (
                    <Picker.Item label={l.name} value={l.id} style={{ color: '#222' }} />
                  ))
                }

              </Picker>
            </View>
            <CustomButton label={'SUBMIT'} onPress={sendChatDetails}  />
          </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 160,
    borderRightWidth: 200,
    borderTopWidth: 150,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4584FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 30
  },
  profileBtn: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 30,
    flexDirection: 'row'
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  headers: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default ChatFormScreen;
