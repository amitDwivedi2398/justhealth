import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TopSheme from '../screens/TopSheme';
import ChatScreen from '../screens/ChatScreen';
import NoticeScreen from '../screens/NoticeScreen';
import ChatFormScreen from '../screens/ChatFormScreen';
import InsuranceScreen from '../screens/Insurance/InsuranceScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {backgroundColor: '#4584FF'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'yellow',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#4584FF',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        
        })}
      />
      <Tab.Screen
        name="Notice"
        component={NoticeScreen}
        options={{
          // tabBarBadge: 3,
          tabBarBadgeStyle: {backgroundColor: 'yellow'},
          tabBarIcon: ({color, size}) => (
            <SimpleLineIcons name="notebook" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TopSheme"
        component={TopSheme}
        options={{
          // tabBarBadge: 3,
          tabBarBadgeStyle: {backgroundColor: 'yellow'},
          tabBarIcon: ({color, size}) => (
            <AntDesign name="solution1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Insurance"
        component={InsuranceScreen}
        options={{
          // tabBarBadge: 3,
          tabBarBadgeStyle: {backgroundColor: 'yellow'},
          tabBarIcon: ({color, size}) => (
            <Foundation name="clipboard-notes" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatForm"
        component={ChatFormScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbubble-ellipses-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if( routeName == 'GameDetails' ) {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;
