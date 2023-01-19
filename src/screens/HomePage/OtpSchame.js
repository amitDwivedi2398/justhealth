import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, FlatList, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-ratings';
import Carousel from 'react-native-snap-carousel';
import { sliderData } from '../../model/data';
import { windowWidth } from '../../utils/Dimensions';
import BannerSlider from '../../components/BannerSlider';
import axios from 'axios';
import { SliderBox } from 'react-native-image-slider-box';





const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
};
const OtpSchame = ({ navigation,route }) => {
    const {id} = route.params;
    const {centerName} = route.params;
    console.log("ID ??",id);
    console.log("centerName ??",centerName);
    const [doctor, setDoctor] = useState([])
    const [slider, setSlider] = useState([]);

    const image = [
        { uri: `${slider.image1}` },
        { uri: `${slider.image2}` },
        { uri: `${slider.image3}` },
    ]
    const sliderBanner = async () => {
        axios
            .get(
                `http://hospitalmitra.in/newadmin/api/ApiCommonController/topbanner`,
            )
            .then(response => {
                console.log("sliderBanner image list <<<<<", response.data.data);
                setSlider(response.data.data[0])
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        sliderBanner()
    }, []);
    
    const getDocter = async () => {
        axios
            .get(
                `http://hospitalmitra.in/newadmin/api/ApiCommonController/opdschedulebyhospital1/${id}`,
            )
            .then(response => {
                console.log("Docter list  <<<<<", response.data.data);
                const res = response.data.data
                setDoctor(res)
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getDocter();
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            <CustomHeader />
            <View>
            <SliderBox
                    images={image}
                    dotColor="#4582FF"
                    inactiveDotColor='black'
                    dotStyle={{ height: 20, width: 20, borderRadius: 50 }}
                    imageLoadingColor="black"
                    autoplay={true}
                    autoplayInterval={2000}
                    circleLoop={true}
                />
            </View>
            <View style={{flex:1}} >
                <FlatList
                    data={doctor}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 }}>
                            <View style={styles.mainView} >
                                <View style={styles.mainRow} >
                                    <TouchableOpacity style={styles.btn}
                                        onPress={() => navigation.navigate('DoctorAbout',{id:item.id,centerName:centerName})}
                                    >
                                        <Image
                                            source={{ uri: `${item.image}` }}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                alignSelf: 'center',
                                                marginHorizontal: 10,
                                                borderRadius:30
                                            }}
                                        />
                                        <View style={{ alignSelf: 'center' }} >
                                            <Text style={{ width: 200, fontFamily: 'Inter-Bold', color: '#4584FF' }} >{item.doctor_name}</Text>
                                            <View style={styles.addresh}>
                                                <TouchableOpacity  >
                                                    <Text style={{ width: 200,color:'#333' }} >{item.days_checkbox}</Text>
                                                    <Text style={{ width: 200, marginTop: 5, color: '#6A6A6A', fontFamily: 'Inter-Bold' }} >{item.time}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

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
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchWrapperStyle: {
        backgroundColor: "#4584FF",
        flexDirection: "row",
    },
    iconStyle: {
        marginTop: 12,
        marginHorizontal: 8,
    },
    mainView: {
        marginTop: 20
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
        alignSelf: 'center'
    },
    btn: {
        flexDirection: 'row'
    },
    addresh: {
        marginTop: 5
    },
    title: {
        color: '#4584FF',
        fontSize: 18,
        fontWeight: '700',
        padding: 20
    }
})

export default OtpSchame;
