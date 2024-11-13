import {
  StyleSheet,
  Text,
  View,
  Image,
  Share,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypocons from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import CustomNavBar from './CustomNavBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const {item} = route.params || {};
  const insets = useSafeAreaInsets();
  const [avatarUri, setAvatarUri] = useState(
    'https://bootdey.com/img/Content/avatar/avatar3.png',
  );

  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out ${item.name}'s Followers are ${item.Follower} profile on our app!`,
        url: avatarUri,
        name: `${item.name}}`,
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

  const captureImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const capturedImage = response.assets[0].uri;
        setAvatarUri(capturedImage);
      }
    });
  };

  const selectImageFromGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Gallery Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setAvatarUri(selectedImage);
      }
    });
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('Selected document:', result);
      // Handle the document as needed
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User canceled document picker');
      } else {
        console.error('Document picker error:', error);
      }
    }
  };

  function StatusBarPlaceHolder() {
    return (
      <View
        style={{
          width: '100%',
          height: STATUS_BAR_HEIGHT,
          backgroundColor: '#00CED1',
        }}>
        <StatusBar barStyle="light-content" />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No profile data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBarPlaceHolder />
      <CustomNavBar
        title={'Profile'}
        rightIcon={'share-alt'}
        midrightIcon={'camera'}
        leftBtn={() => navigation.pop()}
        rightBtn={onShare}
        midrightBtn={captureImage}
      />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: avatarUri,
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
      <View style={styles.cameraOption}>
        <TouchableOpacity style={styles.detailContent} onPress={captureImage}>
          <FontAwesome name="camera" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailContent}
          onPress={selectImageFromGallery}>
          <MaterialIcons name="photo-library" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailContent} onPress={pickDocument}>
          <Entypocons name="text-document-inverted" size={25} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
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
    height: 230,
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
  cameraOption: {
    marginTop: 20,
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
