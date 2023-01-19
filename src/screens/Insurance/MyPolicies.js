import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';

const MyPolicies = ({navigation}) => {
    const [data, setData] = useState([
        {
            id: '1',
            title: 'Car',
            subTitle: 'Figo ford',
            emi: 'Due On',
            emiDate: '2 jan 2023',
            premium: 'premium',
            rate: '₹ 120',
            status: 'Active',
            image: require('../../assets/insurensh/life.png'),
            btnStatus:'Pay now',
        },
        {
            id: '2',
            title: 'Health',
            subTitle: 'Optima Restore',
            emi: 'Due On',
            emiDate: '2 jan 2023',
            premium: 'premium',
            rate: '₹ 280',
            status: 'Inactive',
            image: require('../../assets/insurensh/life.png'),
            btnStatus:'Active Now',
        },
    ]);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.sunConatainer}>
                        <View style={styles.mainView}>
                            <View style={styles.firstSection}>
                            <Text style={styles.titleStyle}>Safe</Text>
                            <Text style={styles.subTitleStyle}>Justhealth Advantage + Justhealth Shield + Room Rent Modification + No Claim Bonus Super </Text>
                            <View style={styles.premiumSectionStyle}>
                                <View>
                                <Text style={{color:'#93968F',fontFamily: 'Roboto-Medium',marginTop:4}}>Premium</Text>
                                <Text style={{fontFamily: 'Roboto-Bold',fontSize:17,color:'#333',marginTop:4}}>₹ 20,223</Text>
                                <Text style={{color:'#93968F',fontFamily: 'Roboto-Medium',}}>(including 18% GST)</Text>
                                </View>
                                <View>
                                <Text style={{color:'#93968F',fontFamily: 'Roboto-Medium',}}>Sum Insured</Text>
                                <Text style={{fontFamily: 'Roboto-Bold',fontSize:17,color:'#333',marginTop:4}}>₹ 1 Cr</Text>
                                </View>
                            </View>
                            </View>
                            <View style={[styles.premiumSectionStyle,{  borderBottomWidth:1,height:100,marginBottom:1,borderColor:'#93968F',}]}>
                                <View style={{width:'50%'}}>
                                <Text style={{color:'#333',fontFamily: 'Roboto-Medium',marginTop:4}}>Sum Insured</Text>
                                </View>
                                <View style={{width:'50%'}}>
                                <Text style={{color:'#333',fontFamily: 'Roboto-Medium',}}>25 Lacs / 50 Lacs / 1 Crore </Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                                <View style={{flex:1,justifyContent:'center',alignItems:'center',  borderRightWidth:1}} >
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={styles.btnTxtStyle} >COMPARE</Text>
                                </TouchableOpacity>
                                </View>
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Details')}>
                                    <Text style={styles.btnTxtStyle}>SEE DETAILS</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />
            <View>
                <TouchableOpacity style={styles.priceBtn}>
                    <Text style={styles.priceTxt}>BUY FOR ₹ 20.236</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    sunConatainer: {
        flex: 1,
    },
    mainView: {
        backgroundColor: '#fff',
        elevation: 10,
        shadowColor: 'black',
        width: '95%',
        marginVertical: 10,
        alignSelf: 'center',
        borderRadius: 15,
        borderWidth:2,
        borderColor:'#4582FF',
    },
    titleStyle:{
        fontSize:20,fontFamily: 'Roboto-Medium',color:'#333'

    },
    subTitleStyle:{
        color:'#333',
        marginVertical:5,
        fontSize:15
    },
    firstSection:{
        borderBottomWidth:1,
        height:180,
        marginBottom:10,
        padding:10,
        borderColor:'#93968F',
    },
    premiumSectionStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10
    },
    btn:{
        width:110,
        height:50,
        justifyContent:'center',
        alignItems:'center',
    },
    btnTxtStyle:{
        fontSize:18,fontFamily: 'Roboto-Medium',color:'#4582FF'
    },
    priceTxt:{
        fontSize:18,fontFamily: 'Roboto-Medium',color:'#fff'
    },
    priceBtn:{
        backgroundColor:'#4582FF',
        justifyContent:'center',
        alignItems:'center',
        width:'95%',
        height:50,
        alignSelf:'center',
        borderRadius:10
    }
})

export default MyPolicies;
