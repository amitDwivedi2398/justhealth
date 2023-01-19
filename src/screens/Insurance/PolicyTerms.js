import React from 'react';
import {View, StyleSheet,Text,SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const PolicyTerms = () => {
    return (
        <SafeAreaView style={styles.container}> 
            <ScrollView style={{}}>
                <View style={styles.textSection}>
                    <Text style={{marginLeft:20,color:'#333',fontSize:16,fontFamily:'Roboto-Medium',}}>Policy Terms</Text>
                </View>
                <View style={{borderBottomWidth:1,borderBottomColor:'#93968F'}}>
                    <View style={styles.section}>
                        <View style={styles.detailScetion}>
                        <FontAwesome name="circle" size={15} color={'#4582FF'} style={{marginTop:3}} />
                        <Text style={styles.txt}>Entry age - Minimum Adult - 5 years and Child 91 days (floter policy)</Text>
                        </View>
                    </View>
                </View>
                <View style={{borderBottomWidth:1,borderBottomColor:'#93968F'}}>
                    <View style={styles.section}>
                        <View style={styles.detailScetion}>
                        <FontAwesome name="circle" size={15} color={'#4582FF'} style={{marginTop:3}} />
                        <Text style={styles.txt}>Entry age - Minimum Adult lifelong Child 24 days (floter policy)</Text>
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
        color:'#333',
        fontFamily:'Roboto-Medium',
        marginLeft:5
    },
    detailScetion:{
        width:'100%',padding:20,flexDirection:'row',
    },
    
})

export default PolicyTerms;
