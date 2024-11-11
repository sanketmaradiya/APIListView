import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';

const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Navigation