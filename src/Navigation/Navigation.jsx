import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen';
import ProfileScreen from '../components/ProfileScreen';
import ContactListScreen from '../components/ContactListScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerScreens() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
      />
      <Drawer.Screen 
        name="Contacts" 
        component={ContactListScreen}
      />
    </Drawer.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={DrawerScreens} 
          options={{ drawerLabel: 'Home' , headerShown : false}}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ drawerLabel: 'Profile', headerShown : false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
