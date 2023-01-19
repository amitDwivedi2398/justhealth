import React from 'react';
import {View, StyleSheet,Text,SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';


const AdditionalCover = () => {
    return (
        <SafeAreaView style={styles.container}> 
            <ScrollView style={{}}>
                <View style={styles.textSection}>
                    <View style={{width:'35%'}}>
                    </View>
                    <View style={{width:'35%'}}>
                        <Text style={styles.txt}>Coverage</Text>
                    </View>
                    <View style={{width:'25%'}}>
                        <Text style={styles.txt}>Charges</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={{width:'35%'}}>
                    <View style={{flexDirection:'row'}}>
                    <AntDesign name="checksquare" size={20} color={'#4582FF'} style={{}} />
                    <Text style={{color:'#4582FF',fontFamily:'Roboto-Medium',fontSize:16,marginLeft:2}}>Care Shield</Text>
                    </View>
                    <Text style={{color:'black',marginTop:5}}>An add-on cover offer 3 benefit claim shield, no claim bonus shield and inflation shield</Text>
                    </View>
                    <View style={{width:'35%'}}>
                        <Text style={{color:'black'}}>₹ 1,000,000,000</Text>
                    </View>
                    <View style={{width:'25%'}}>
                        <Text style={{color:'black'}}>₹ 964</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={{width:'35%'}}>
                    <View style={{flexDirection:'row'}}>
                    <AntDesign name="checksquare" size={20} color={'#4582FF'} style={{}} />
                    <Text style={{color:'#4582FF',fontFamily:'Roboto-Medium',fontSize:16,marginLeft:2}}>Care Shield</Text>
                    </View>
                    <Text style={{color:'black',marginTop:5}}>An add-on cover offer 3 benefit claim shield, no claim bonus shield and inflation shield</Text>
                    </View>
                    <View style={{width:'35%'}}>
                        <Text style={{color:'black'}}>₹ 1,000,000,000</Text>
                    </View>
                    <View style={{width:'25%'}}>
                        <Text style={{color:'black'}}>₹ 964</Text>
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
        width:'100%',backgroundColor:'#f3f3f3',height:30,justifyContent:'center',
        flexDirection:'row',alignItems:'center'
    },
    section:{
        width:'100%',justifyContent:'center',
        flexDirection:'row',borderBottomWidth:1,marginVertical:5,borderBottomColor:'#93968F'
    },
    txt:{
        color:'#333',fontSize:16,fontFamily:'Roboto-Medium',
    }
})

export default AdditionalCover;

