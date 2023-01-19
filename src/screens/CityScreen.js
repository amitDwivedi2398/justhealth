import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, FlatList, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNRestart from 'react-native-restart';

const CityScreen = ({ navigation }) => {
    const [hospitalList, setHospitalList] = useState([])
    const [storeddata, setStoreddata] = useState('');
    const [filterData, setfilterData] = useState([]);
    const [search, setSearch] = React.useState('');
    const getData = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            if (user_id !== null) {
                console.log('@@@@@@@@', user_id);
                setStoreddata(user_id);
            }
        } catch (e) {
            console.log('no Value in login');
        }
    };
    const getBrachbyHospital = async () => {
        axios
            .get(
                `http://hospitalmitra.in/newadmin/api/ApiCommonController/getcitylist`,
            )
            .then(response => {
                console.log("city name list id <<<<<", response.data.data);
                const hospitalList = response.data.data
                setHospitalList(hospitalList)
                setfilterData(hospitalList)
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getBrachbyHospital();
        getData();
    }, [storeddata]);

    const searchFilterFuntion = (text) => {
        if (text) {
            const newData = hospitalList.filter(
                function (item) {
                    const itemData = item.cityname
                        ? item.cityname.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            console.log(`new Data =` + JSON.stringify(newData));
            setfilterData(newData);
            setSearch(text);
        } else {
            setfilterData(hospitalList);
            setSearch(text);
        }
    }

    const sendCity=(cityname,id)=>{
        axios.post(
            `http://hospitalmitra.in/newadmin/api/ApiCommonController/cityupdatelist`,
            {
                id: storeddata,
                city:cityname,
                city_id:id
            },
        )
        .then(response => {
            console.log("???", response.data);
            RNRestart.Restart()
            })
            
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.mainView} >
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} >
            <Text style={styles.skipStyle} >Skip</Text>
            </TouchableOpacity>
            <ImageBackground style={{height:150,justifyContent:'space-between'}}  source={require('../assets/images/rajwada.jpg')}>
            <View >
            <Text style={styles.txtCity} >Select your city</Text>
            </View>
            <View style={styles.searchWrapperStyle}>
                <Ionicons size={18} name="search-outline" color="white" style={styles.iconStyle} />
                <TextInput
                    style={{ flex: 1 }}
                    onChangeText={(text) => searchFilterFuntion(text)}
                    value={search}
                    underlineColorAndroid='transparent'
                    placeholder='Search Here'
                    placeholderTextColor={'#fff'}
                    placeholderColor={'#fff'}
                    color={'#fff'}
                />
            </View>
            </ImageBackground>
            </View>
            
            <View style={{ flex: 1 }} >
                <FlatList
                    data={filterData.sort((a, b) => a.cityname.localeCompare(b.cityname))}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 }}>
                                <View style={styles.mainRow} >
                                    <TouchableOpacity style={styles.btn} onPress={()=>sendCity(item.cityname,item.id)} >
                                        <Text style={styles.txtStyles} >{item.cityname}</Text>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    mainView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 10
    },
    mainRow: {
        width: '95%',
        height: 50,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        shadowColor: 'blue',
        elevation: 4,
        shadowRadius: 10,
        alignSelf:'center',
        justifyContent:'center',
        marginVertical:6
    },
    btn: {
        flexDirection: 'row',
    },
    addresh: {
        marginTop: 5
    },
    rightView: {
        justifyContent: 'center',
    },
    searchWrapperStyle: {
        backgroundColor: "#4584FF",
        flexDirection: "row",
        borderRadius: 30,
        width: '95%',
        alignSelf: 'center',
        marginVertical:10
    },
    iconStyle: {
        marginTop: 15,
        marginHorizontal: 8,
    },
    txtStyles:{
        marginLeft:10,
        color:'black',
        fontFamily:'Roboto-Medium',
        fontSize:15
    },
    txtCity:{
        alignSelf:'center',
        fontSize:25,
        fontWeight:'800',
        color:'#333'
    },
    mainView:{
    },
    skipStyle:{
        justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end',marginRight:15,color:'#333',
        fontSize:15,fontWeight:'600',marginTop:5
    }
})

export default CityScreen;
