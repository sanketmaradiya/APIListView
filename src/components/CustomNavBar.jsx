import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomNavBar = ({title, rightIcon, leftBtn, rightBtn}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={leftBtn}>
          <Icon name="chevron-left" size={25} color="#FFF" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: '700', color: '#FFF'}}>
          {title}
        </Text>
        <TouchableOpacity onPress={rightBtn}>
          <Icon name={rightIcon} size={25} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomNavBar;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#00CED1',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  button: {
    padding: 5,
  },
});
