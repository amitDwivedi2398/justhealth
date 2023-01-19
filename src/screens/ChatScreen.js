import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ChatScreen({ navigation,route }) {
  const {formid} = route.params;
  const [storeddata, setStoreddata] = useState('');
  const [docterDetails, setDocterDetails] = useState([]);
  // setTimeout(async () => {
  //   const value = await AsyncStorage.getItem('user_id');
  //   if (value !== null) {
  //     received();
  //   } else {
  //     received()
  //   }
  // }, 5000);

  const [chatUser] = useState({
    name: 'Robert Henry',
    profile_image: 'https://randomuser.me/api/portraits/men/0.jpg',
    last_seen: 'online',
  });

  const [currentUser] = useState({
    name: 'John Doe',
  });

  const [messages, setMessages] = useState([
    { sender: 'John Doe', message: 'Hey there!', time: '6:01 PM' },
    {
      sender: 'Robert Henry',
      message: 'Hello, how are you doing?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: 'I am good, how about you?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: `😊😇`,
      time: '6:02 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Can't wait to meet you.`,
      time: '6:03 PM',
    },
    {
      sender: 'John Doe',
      message: `That's great, when are you coming?`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `This weekend.`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Around 4 to 6 PM.`,
      time: '6:04 PM',
    },
    {
      sender: 'John Doe',
      message: `Great, don't forget to bring me some mangoes.`,
      time: '6:05 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Sure!`,
      time: '6:05 PM',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [received, setReceived] = useState([]);
  const [userProfile, setuserProfile] = useState([]);
 

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function sendMessage() {
    if (inputMessage === '') {
      return setInputMessage('');
    }
    let t = getTime(new Date());
    setMessages([
      ...messages,
      {
        sender: currentUser.name,
        message: inputMessage,
        time: t,
      },
    ]);
    setInputMessage('');
  }

  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        console.log('@@@@@@@@', user_id);
        setStoreddata(user_id);
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  const getProfile = async () => {
    axios
      .get(`http://hospitalmitra.in/newadmin/api/ApiCommonController/usersingledata/${storeddata}`)
      .then((response) => {
        // console.log("Profile ??", response.data.data);
        const userProfile = response.data.data
        setuserProfile(userProfile[0].image)
        console.log(userProfile[0].image);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const getRecevied = async () => {
    axios
      .get(
        `http://hospitalmitra.in/newadmin/api/ApiCommonController/chatgetbyuserid/${storeddata}`,
      )
      .then(response => {
        console.log("recevied data list <<<<<", response.data.data);
        const list = response.data.data
        setReceived(list)
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getDocterDetails = async () => {
    axios
      .get(
        `http://hospitalmitra.in/newadmin/api/ApiCommonController/enquiry/${storeddata}`,
      )
      .then(response => {
        console.log("Docter Details list <<<<<", response.data.data);
        const res = response.data.data
        setDocterDetails(res[0])
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProfile();
    getDocterDetails();
    getRecevied();
    getData();
  }, [storeddata]);
  const send = async (id) => {
    axios.post(`http://hospitalmitra.in/newadmin/api/ApiCommonController/chat`,
      {
        message: inputMessage,
        chat_id:formid
      },
      {
        headers: {
          user_id: await AsyncStorage.getItem('user_id'),
        },
      },)
      .then(response => {
        console.log('////////', response.data);
        if (inputMessage === '') {
          return setInputMessage('');
        }
        let t = getTime(new Date());
        setMessages([
          ...messages,
          {
            sender: currentUser.name,
            message: inputMessage,
            time: t,
          },
        ]);
        setInputMessage('');
        getRecevied()
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <AntDesign name="bars" color={'#4584FF'} size={30} />
          </TouchableOpacity>
          {/* <Image
            style={styles.userProfileImage}
            source={{ uri: userProfile[0].image }}
          /> */}
          <View
            style={{
              paddingLeft: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#4584FF', fontWeight: '700', fontSize: 18 }}>
              {/* {userProfile[0].username} */}
            </Text>
            {/* <Text style={{ color: '#4584FF', fontWeight: '300' }}>
              {chatUser.last_seen}
            </Text> */}
          </View>
        </View>
        <View>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
        <Text style={styles.dnameStyle} >{docterDetails.doctor_name}</Text>
        <Text style={styles.dnameStyle} >{docterDetails.center_name}</Text>
        <Text style={styles.dnameStyle} >{docterDetails.fees}</Text>
        </View>
        </View>
        <FlatList
          style={{ backgroundColor: '#f2f2ff' }}
          inverted={true}
          data={JSON.parse(JSON.stringify(received)).reverse()}
          renderItem={({ item }) => (
            <View>
              <TouchableWithoutFeedback>
                <View style={{ marginTop: 6 }}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.9,

                  }}
                >
                <Text
                    style={{
                      color: '#333',
                      fontSize: 16,
                      marginHorizontal:10
                    }}
                  >
                    {item.worker_message}
                  </Text>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 16,
                      justifyContent:'flex-end',
                      alignItems:'flex-end',
                      alignSelf:'flex-end',
                    }}
                  >
                    {item.message}
                  </Text>
                </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        />

        <View style={{ paddingVertical: 10 }}>
          <View style={styles.messageInputView}>
            <TextInput
              defaultValue={inputMessage}
              color={'#333'}
              placeholderTextColor={'#333'}
              style={styles.messageInput}
              placeholder='Message'
              onChangeText={(text) => setInputMessage(text)}
              onSubmitEditing={() => {
                send();
              }}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => send()} >
              <Ionicons size={18} name="send" color="black" style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  userProfileImage: { height: 50, aspectRatio: 1, borderRadius: 100 },
  container: {
    flex: 1,
    backgroundColor: '#f2f2ff',
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  msg:{
    width:150,padding: 10,borderRadius: 8,backgroundColor: '#3a6ee8',justifyContent:'center',alignItems:'center',marginHorizontal:10
  },
  dnameStyle:{
    color:'#4582FF',fontSize:17,fontWeight:'600'
  }
});
