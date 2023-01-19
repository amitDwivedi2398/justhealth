import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PlanDetails from './PlanDetails';
import AdditionalCover from './AdditionalCover';
import PolicyTerms from './PolicyTerms';
import Exclusions from './Exclusions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import HospitalNetwork from './HospitalNetwork';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopColor:'#93968F',
                    borderTopWidth:2
                },
                tabBarItemStyle: {
                    width: 'auto',
                    alignItems: 'flex-start',
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                    fontFamily: 'Satoshi-Black',
                    color: '#333',
                    fontWeight:'800',
                },
            }}
            sceneContainerStyle={{ backgroundColor: '#fff' }}>
            <Tab.Screen name="PLAN DETAILS" component={PlanDetails} />
            <Tab.Screen name="ADDITIONAL COVER" component={AdditionalCover} />
            <Tab.Screen name="HOSPITAL NETWORK" component={HospitalNetwork} />
            <Tab.Screen name="POLICY TERMS" component={PolicyTerms} />
            <Tab.Screen name="EXCLUSIONS" component={Exclusions} />
        </Tab.Navigator>
    )
}
const PoliciesDetails = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.firstSection}>
                <Text style={styles.subTitleStyle}>Justhealth Advantage + Justhealth Shield + Room Rent Modification + No Claim Bonus Super </Text>
                <View style={styles.premiumSectionStyle}>
                    <View>
                        <Text style={{ color: '#93968F', fontFamily: 'Roboto-Medium', marginTop: 4 }}>Premium Amount</Text>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 17, color: '#333', marginTop: 4 }}>₹ 20,223</Text>
                        <Text style={{ color: '#93968F', fontFamily: 'Roboto-Medium', }}>(including 18% GST)</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#93968F', fontFamily: 'Roboto-Medium', }}>Sum Insured</Text>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 17, color: '#333', marginTop: 4 }}>₹ 1 Cr</Text>
                    </View>
                </View>
            </View>
            <TopTab />
            <View>
                <TouchableOpacity style={styles.priceBtn}>
                    <Text style={styles.priceTxt}>BUY FOR</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    firstSection: {
        padding: 10,
    },
    premiumSectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    btn: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxtStyle: {
        fontSize: 18, fontFamily: 'Roboto-Medium', color: '#4582FF'
    },
    priceTxt: {
        fontSize: 18, fontFamily: 'Roboto-Medium', color: '#fff'
    },
    priceBtn: {
        backgroundColor: '#4582FF',
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        height: 50,
        alignSelf: 'center',
        borderRadius: 10
    },
    subTitleStyle: {
        color: '#333',
        marginVertical: 1,
        fontSize: 15,
        width: '70%'
    },

})

export default PoliciesDetails;
