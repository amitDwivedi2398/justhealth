import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet,Text, SafeAreaView,Image} from 'react-native';
import CustomHeader from '../../components/CustomHeader';

const ToDoOpd = ({route}) => {
    const {id} = route.params;
    console.log("what ??",id);
    const [whatOpd, setWhatOpd] = useState([])
    const getWhatOpd = async () => {
        axios
            .get(
                `http://hospitalmitra.in/newadmin/api/ApiCommonController/genralinfo/${id}`,
            )
            .then(response => {
                console.log("getWhatOpd ??", response.data.data);
                const todoOpd= response.data.data
                setWhatOpd(todoOpd[0])
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getWhatOpd();
    }, [])
    return (
        <SafeAreaView style={{flex:1}} >
        <CustomHeader/>
        <View style={{flex:1}} >
                <Image
                resizeMode="cover"
                 style={{position: "absolute",width: "95%",height: "100%",alignSelf:'center',padding:10,marginVertical:5}} source={{ uri: `${whatOpd.image}` }} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default ToDoOpd;
