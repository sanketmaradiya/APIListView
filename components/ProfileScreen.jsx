import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const ProfileScreen = ({route}) => {
  const {item} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{uri: 'https://bootdey.com/img/Content/avatar/avatar2.png'}}
          />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>

      <View style={styles.profileDetail}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Photos</Text>
          <Text style={styles.count}>{item.numberPhotos}</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Followers</Text>
          <Text style={styles.count}>{item.Follower}</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Following</Text>
          <Text style={styles.count}>{item.Following}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00CED1',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 200,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  count: {
    fontSize: 18,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },
});
