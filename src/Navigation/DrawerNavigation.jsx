import {StyleSheet, Text, View} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import ContactListScreen from '../components/ContactListScreen';
import HomeScreen from '../components/HomeScreen';

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator({
    screens: {
      Home: HomeScreen,
      ContactList : ContactListScreen
    },
  });

  const Navigation = createStaticNavigation(Drawer);
};

export default DrawerNavigation;
