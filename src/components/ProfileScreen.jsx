import {StyleSheet, Text, View, Image, Share} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import CustomNavBar from './CustomNavBar';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const {item} = route.params || {}; // Fallback if route.params is undefined

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out ${item.name}'s Followers are ${item.Follower} profile on our app!`,
        url: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No profile data available.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <CustomNavBar
          title={'Profile'}
          rightIcon={'share-alt'}
          leftBtn={() => navigation.pop()}
          rightBtn={onShare}
        />
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri:
                  item.avatar ||
                  'https://bootdey.com/img/Content/avatar/avatar3.png',
              }}
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
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#00CED1',
    height: '230',
    paddingBottom: 20,
  },
  headerContent: {
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
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
    marginTop: -40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  detailContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#696969',
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
