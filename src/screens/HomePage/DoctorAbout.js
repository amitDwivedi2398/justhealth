import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, } from 'react-native';
import { color } from 'react-native-reanimated';
import BackHeader from '../../components/BackHeader';
import CustomButton from '../../components/CustomButton';

const DoctorAbout = ({ navigation,route }) => {
    const {id} = route.params;
    const {centerName} = route.params;
    console.log("centerName ??",centerName);
    console.log("ID ??",id);
    const [doctor, setDoctor] = useState([])
    
    const getDocter = async () => {
        axios
            .get(
                `http://hospitalmitra.in/newadmin/api/ApiCommonController/doctorlist1/${id}`,
            )
            .then(response => {
                console.log("Docter About  <<<<<", response.data.data);
                const res = response.data.data
                setDoctor(res[0])
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getDocter();
    }, []);
    const SendEnq = async (id)=>{
        axios.post(`http://hospitalmitra.in/newadmin/api/ApiCommonController/enquarityform`,
        {
            user_id:await AsyncStorage.getItem('user_id'),
            doctor_name:doctor.doctor_name,
            center_name:centerName,
            speciality:doctor.speciality,
            fees:doctor.fees,
        },)
          .then(response => {
            console.log('////////', response.data);
            if(response.data){
                alert("successfully send enquiry");
                return;
            }
          })
          .catch(error => {
            console.log(error);
          })    
    }
    return (
        <SafeAreaView style={styles.container} >
            <BackHeader TitleName={'name'} onPress={() => navigation.goBack()} />
            <View style={styles.mainContainer} >
                <Image style={styles.img} source={{ uri: `${doctor.image}` }} />
                <Text style={styles.docName} >{doctor.doctor_name}</Text>
                <Text style={styles.subTitle} >{doctor.speciality}
                </Text>
                <View style={styles.row} >
                <View style={{alignItems:'center'}}>
                <Text style={styles.rowtxt} >Patients</Text>
                <Text style={[styles.txt,,{marginTop:5}]} >{doctor.patients}</Text>
                </View>
                    <View style={{alignItems:'center'}} >
                    <Text style={styles.rowtxt}>Experience</Text>
                    <Text style={[styles.txt]}>{doctor.experiance}</Text>
                    </View>
                    <View style={{alignItems:'center'}} >
                    <Text style={styles.rowtxt}>Fees</Text>
                    <Text style={[styles.txt,{marginTop:5}]}>{doctor.fees}</Text>
                    </View>
                    
                </View>
                <View style={styles.rowTwo}>
                <View style={{marginTop:5}} >
                    <Text style={styles.rowtxt}>Day</Text>
                    <Text style={[styles.txt,{marginTop:0}]}>{doctor.days_checkbox}</Text>
                    </View>
                    <View style={{marginTop:5}}>
                    <Text style={styles.rowtxt}>Time</Text>
                    <Text style={[styles.txt,{marginTop:0}]}>{doctor.time}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.about} >About Doctor</Text>
                    <Text style={{color:'#6A6A6A', marginLeft:10}} >{doctor.about_doctor}</Text>
                </View>
                <View>
                    <Text style={styles.about} >Description</Text>
                    <Text style={{color:'#6A6A6A',marginLeft:10}} >{doctor.description}</Text>
                </View>
            </View>

            <View style={{width:'90%',alignSelf:'center'}} >
            <CustomButton label={'SEND ENQUIRY'} onPress={SendEnq} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
    },
    img: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    docName: {
        color: '#4584FF',
        fontFamily: 'Roboto-Medium',
        fontSize: 25,
        marginTop: 10,
        lineHeight: 25,
        alignSelf: 'center'
    },
    subTitle: {
        color: '#6A6A6A',
        fontFamily: 'Roboto-Medium',
        lineHeight: 20,
        alignSelf: 'center',
        fontSize: 15
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:50,
        width:'95%',
        alignSelf:'center'
    },
    rowtxt:{
        color:'#6A6A6A',
        fontFamily: 'Roboto-Medium',
        fontSize:17,
    },
    txt:{
        color:'#4584FF',
        fontFamily: 'Roboto-Bold',
        fontSize:17,
    },
    rowTwo:{
        marginTop:5,
        marginLeft:10
    },
    about:{
        color:'#4584FF',
        marginTop:20,
        fontFamily: 'Roboto-Bold',
        fontSize:18,
        marginLeft:10
    }
})

export default DoctorAbout;
