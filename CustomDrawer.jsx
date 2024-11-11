import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = () => {
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.drawerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Contacts')}>
          <Text style={styles.drawerText}>ContactList</Text>
        </TouchableOpacity>
      </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    backgroundColor: '#f0f0f0',
  },
  drawerItem: {
    paddingVertical: 15,
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})