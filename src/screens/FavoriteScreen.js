import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../../components/BackHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FavoriteScreen = ({navigation}) => {
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
                `http://hospitalmitra.in/newadmin/api/ApiCommonController/favoritebasedonuserid/${storeddata}`,
            )
            .then(response => {
                console.log("FavoriteList name list id <<<<<", response.data.data);
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
                    const itemData = item.name
                        ? item.name.toUpperCase() : ''.toUpperCase();
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
    return (
         <SafeAreaView style={styles.container} >
                <BackHeader label={'Favorite List'} onPress={() => navigation.openDrawer()} />
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
                <View style={{flex:1}} >
                <FlatList
                    data={filterData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 }}>
                            <View style={styles.mainView} >
                                <View style={styles.mainRow} >
                                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('DoctorDetails' ,{id:item.id})} >
                                        <Image
                                            source={{ uri: `${item.image}` }}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                alignSelf: 'center',
                                                marginHorizontal: 10,
                                                borderRadius:30
                                            }}
                                        />
                                        <View style={{alignSelf:'center'}} >
                                            <Text style={{width:200}} >{item.name}</Text>
                                            <View style={styles.addresh}>
                                                <TouchableOpacity  >
                                                    <Text style={{width:200}} >{item.address}</Text>
                                                </TouchableOpacity>
                                                <Rating style={{marginTop:5,alignSelf:'flex-start'}}
                                                imageSize={12}
                                                tintColor='#F3F3F3'
                                                    onFinishRating={(rating) => {
                                                        Alert.alert('Star Rating: ' + JSON.stringify(rating));
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.rightView}>
                                        <TouchableOpacity> 
                                            <MaterialIcons size={25} name="highlight-remove" color="#4584FF" style={[styles.leftView,{marginRight:10}]} />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
         </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    mainView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 10
    },
    mainRow: {
        width: '90%',
        height: 100,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        shadowColor: 'blue',
        elevation: 4,
        shadowRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        flexDirection: 'row'
    },
    addresh:{
        marginTop:5
    },
    rightView:{
        justifyContent:'center',
    },
    searchWrapperStyle: {
        backgroundColor: "#4584FF",
        flexDirection: "row",
        borderRadius:30,
        width:'95%',
        alignSelf:'center'
    },
    iconStyle: {
        marginTop: 15,
        marginHorizontal: 8,
    },
})

export default FavoriteScreen;
