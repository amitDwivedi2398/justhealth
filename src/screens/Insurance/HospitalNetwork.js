import React from 'react';
import {View, StyleSheet,Text,SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const HospitalNetwork = () => {
    return (
        <SafeAreaView style={styles.container}> 
            <ScrollView style={{}}>
                <View style={styles.textSection}>
                    <Text style={{marginLeft:20,color:'#333',fontSize:16,fontFamily:'Roboto-Medium',}}>7 Cashless Hospital found in Dewas</Text>
                </View>
                <View style={{borderBottomWidth:1,borderBottomColor:'#93968F'}}>
                    <View style={styles.section}>
                        <View style={styles.detailScetion}>
                        <Text style={styles.txt}>Sanker Hospital & Research Center</Text>
                        <Text style={{color:'#333'}}>A-52-53,Kalanibagh,A,B Rode</Text>
                        </View>
                        <View style={{width:'20%',padding:20}}>
                        <TouchableOpacity>
                        <Ionicons name="md-navigate-circle-outline" size={30} color={'#4582FF'} style={{}} />
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    textSection:{
        width:'100%',backgroundColor:'#f3f3f3',height:30,justifyContent:'center'
    },
    section:{
        flexDirection:'row',justifyContent:'space-between',alignItems:'center'
    },
    txt:{
        fontSize:16,
        color:'#4582FF',
        fontFamily:'Roboto-Medium'
    },
    detailScetion:{
        width:'80%',padding:20,
    },
    
})

export default HospitalNetwork;
