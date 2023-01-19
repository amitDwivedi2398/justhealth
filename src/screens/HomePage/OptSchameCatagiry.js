import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import BannerSlider from '../../components/BannerSlider';
import CustomHeader from '../../components/CustomHeader';
import { sliderData } from '../../model/data';
import { windowWidth } from '../../utils/Dimensions';
import { SliderBox } from 'react-native-image-slider-box';


const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
};
const OptSchameCatagiry = ({navigation,route}) => {
    const {id} = route.params;
    const [schedule, setSchedule] = useState([])
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
    const getSchedule = async () => {
        axios
            .get(
                `http://hospitalmitra.in/newadmin/api/ApiCommonController/opdschedulebyhospital/${id}`,
            )
            .then(response => {
                console.log("Schedule name list id <<<<<", response.data.data);
                const res = response.data.data
                setSchedule(res)
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getSchedule();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView>
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
                <View  >
                    <FlatList
                        numColumns={2}
                        data={schedule}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1 }}>
                                <View style={styles.mainView} >
                                    <View style={styles.mainRow} >
                                        <TouchableOpacity style={styles.btn}  onPress={() => navigation.navigate('OtpSchame',{id:item.id,centerName:item.title})}>
                                            <Image
                                                source={{ uri: `${item.image}` }}
                                                style={{
                                                    width: 60,
                                                    height: 50,
                                                    alignSelf: 'center',
                                                }}
                                            />
                                            <Text style={styles.txt} >{item.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <View style={{ padding: 5,  }} >
                    <View style={styles.sliderImg}>
                        <Image style={styles.baner} source={require('../../assets/images/departmentHospital.png')} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    mainRow: {
        width: '90%',
        height: 110,
        backgroundColor: '#F3F3F3',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'blue',
        elevation: 7,
        shadowRadius: 10,
    },
    btn: {
        flex: 1,
        justifyContent: 'center'
    },
    txt: {
        alignSelf: 'center', 
        marginTop: 5, 
        textAlign: 'center', 
        color: 'black', 
        fontFamily: 'Roboto-Medium'
    },
    sliderImg: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 5,
        width: '100%',
    },
    baner: {
        width: '95%',
        height: 100,
        marginHorizontal: 5,
        borderRadius: 10,
    },
})

export default OptSchameCatagiry;
