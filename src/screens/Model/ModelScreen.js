import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Image, Text, TextInput, ScrollView } from 'react-native';

const ModelScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const { name } = route.params;
    const { type } = route.params;
    console.log(type, "type id ");
    console.log(id, "model id ");
    console.log(name, "model id ");
    const [isvisible, setIsisible] = useState(true)
    const [note, setNote] = useState('')
    const [defaultRating, setdefaultRating] = useState('')
    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])

    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'

    const sendRating = async () => {
        axios.post(`http://hospitalmitra.in/newadmin/api/ApiCommonController/userratingadd`,
            {
                hospital_id: id,
                rating: defaultRating,
                user_id: await AsyncStorage.getItem('user_id'),
                note: note
            })
            .then(response => {
                console.log('////////', response.data);
                if (response.data) {
                    { type == 'Government' ? (alert('Thanks for feedback')) : (alert(defaultRating)) }
                    navigation.goBack('DoctorDetails')
                    return;
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const CustomRatingBar = () => {
        return (
            <View style={styles.CustomRatingBarStyle} >
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setdefaultRating(item)} >
                                <Image style={styles.startImgStyle}
                                    source={
                                        item <= defaultRating
                                            ? { uri: starImgFilled } : { uri: starImgCorner }
                                    }
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }





    const modelClose = () => {
        setIsisible({ isvisible: !isvisible })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }} >
            <ScrollView>
                <Modal
                    animationType='slide'
                    visible={isvisible}
                    transparent={true}
                >
                    <TouchableOpacity onPress={modelClose} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                        <TouchableWithoutFeedback>
                            <View style={{ height: '50%', width: '90%', backgroundColor: 'white', borderRadius: 20 }} >
                                <Text style={styles.hospitalName} > HOSPITAL NAME : {name}</Text>
                                {type == 'Government' ? (
                                    <View>

                                    </View>
                                ) : (<View>
                                    <CustomRatingBar />
                                    <Text style={styles.textStyle} >{defaultRating + '/' + maxRating.length}</Text>
                                </View>)}

                                <TextInput
                                    style={[styles.inputStyle, { height: 100, paddingVertical: 10, textAlignVertical: 'top', marginVertical: 10 }]}
                                    multiline={true}
                                    placeholder={'Your feedback here'}
                                    value={note}
                                    onChangeText={setNote}
                                />
                                <TouchableOpacity activeOpacity={0.7} style={styles.buttonStyle} onPress={sendRating}>
                                    <Text style={{ color: '#fff' }} >Get Selected Value</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    CustomRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },
    startImgStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23,
        marginVertical: 10
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        padding: 15,
        backgroundColor: '#4584FF',
        margin: 10,
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center'
    },
    inputStyle: {
        width: '100%',
        height: 44,
        backgroundColor: '#f1f3f6',
        borderRadius: 6,
        paddingHorizontal: 10,
    },
    hospitalName: {
        alignSelf: 'center',
        color: '#4584FF',
        fontSize: 18,
        fontWeight: '600', marginTop: 10
    }
})

export default ModelScreen;
