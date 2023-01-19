import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const PlanDetails = () => {
    return (
        <View>
            <Text>PlanDetails</Text>
        </View>
    )
}
const AdditionalCover = () => {
    return (
        <View>
            <Text>AdditionalCover</Text>
        </View>
    )
}

const DetailsScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="PlanDetails" component={PlanDetails} />
            <Tab.Screen name="AdditionalCover" component={AdditionalCover} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
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
        width:100,
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

export default DetailsScreen;
