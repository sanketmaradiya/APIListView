import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen';
import ProfileScreen from '../components/ProfileScreen';
import ContactListScreen from '../components/ContactListScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerStack({ navigation }) {
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', (e) => {
      navigation.setOptions({ drawerEnabled: false });
    });
    
    const unsubscribeBlur = navigation.addListener('blur', (e) => {
      navigation.setOptions({ drawerEnabled: true });
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          headerShown: true,
          gestureEnabled: false,
        }} 
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Contacts" 
        component={ContactListScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={DrawerStack} />
        <Drawer.Screen name="Contacts" component={ProfileStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
