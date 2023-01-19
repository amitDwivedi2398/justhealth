import React from 'react';
import {View, StyleSheet,Text,SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const PlanDetails = () => {
    return (
        <SafeAreaView style={styles.container}> 
            <ScrollView style={{}}>
                <View style={styles.textSection}>
                    <Text style={{marginLeft:20,color:'#333',fontSize:16,fontFamily:'Roboto-Medium',}}>PRODUCT FEATURES</Text>
                </View>
                <View style={{borderBottomWidth:1,borderBottomColor:'#93968F'}}>
                    <View style={styles.section}>
                        <View style={styles.detailScetion}>
                        <Text style={styles.txt}>Sum Insured</Text>
                        <MaterialIcons name="error" size={20} color={'#4582FF'} style={{marginLeft:10}} />
                        </View>
                        <View style={{width:'50%',padding:20}}>
                        <Text style={styles.txt}>25 Lacs / 50 Lacs / 1 Crore</Text>
                        </View>
                    </View>
                </View>
                <View style={{borderBottomWidth:2,borderBottomColor:'#93968F'}}>
                    <View style={styles.section}>
                        <View style={styles.detailScetion}>
                        <Text style={styles.txt}>In-Patient Hospitalization</Text>
                        <MaterialIcons name="error" size={20} color={'#4582FF'} style={{marginLeft:10}} />
                        </View>
                        <View style={{width:'50%',padding:20}}>
                        <Text style={styles.txt}>Up to Sl</Text>
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
        fontSize:15,
        color:'#333',
    },
    detailScetion:{
        width:'50%',padding:20,flexDirection:'row',alignItems:'center'
    },
    
})

export default PlanDetails;
