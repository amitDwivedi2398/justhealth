import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../components/CustomHeader';

const InsuranceScreen = ({navigation}) => {
    const [data, setData] = useState([
        {
            id: '1',
            title: 'Health Insurance',
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
            title: 'Youth Health Insurance Plan',
            subTitle: 'Youth Health Insurance Plan',
            emi: 'Due On',
            emiDate: '2 jan 2023',
            premium: 'premium',
            rate: '₹ 280',
            status: 'Inactive',
            image: require('../../assets/insurensh/life.png'),
            btnStatus:'Active Now',
        },
        {
            id: '3',
            title: 'Super Mediclaim Insurance',
            subTitle: 'Youth Health Insurance Plan',
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
        <CustomHeader TitleName={'Buy Policy'} />
        <Text style={[styles.titleStyle,{padding:5,marginLeft:8,color:'#4582FF'}]}>Insure Your Health</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>navigation.navigate('Plans for you')} >
                        <View style={styles.sunConatainer}>
                        <View style={styles.mainView}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../assets/insurensh/life.png')} style={{ width: 50, height: 50 }} />
                            </View>
                            <View>
                                <Text style={styles.titleStyle}>{item.title}</Text>
                            </View>
                            <View>
                            <MaterialIcons name="keyboard-arrow-right" size={25} color={'black'} />
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sunConatainer: {
        flex: 1,
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: 'black',
        width: '95%',
        marginVertical: 5,
        alignSelf: 'center',
        borderRadius: 15,
        height: 80,
        alignItems: 'center',
        padding: 10
    },
    titleStyle:{
        fontSize:18,fontFamily: 'Roboto-Medium',color:'#4582FF'
    }
})

export default InsuranceScreen;
