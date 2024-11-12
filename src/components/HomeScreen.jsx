import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://mocki.io/v1/7d252096-3dd5-4a87-8a27-6df736365a70',
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => {
      setRefreshing(false);
    });
  };

  const handlePress = item => {
    navigation.navigate('Profile', {item});
  };

  const Item = ({item}) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

// [
//   {
//     Follower: 123,
//     Following: 56,
//     body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
//     id: 1,
//     name: 'John Doe',
//     numberPhotos: 15,
//     title:
//       'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
//     userId: 1,
//   },
//   {
//     Follower: 200,
//     Following: 89,
//     body: 'doloribus ad provident suscipit at debitis est atque occaecati iure iste atque',
//     id: 2,
//     name: 'Jane Smith',
//     numberPhotos: 25,
//     title: 'qui est esse quos ratione ipsum velit',
//     userId: 2,
//   },
//   {
//     Follower: 340,
//     Following: 120,
//     body: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque',
//     id: 3,
//     name: 'Alice Johnson',
//     numberPhotos: 8,
//     title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
//     userId: 3,
//   },
//   {
//     Follower: 512,
//     Following: 67,
//     body: 'nihil at amet non consequatur aut provident quia pariatur nisi in',
//     id: 4,
//     name: 'Robert Brown',
//     numberPhotos: 32,
//     title: 'eum et est occaecati',
//     userId: 4,
//   },
//   {
//     Follower: 432,
//     Following: 134,
//     body: 'ullam et saepe reiciendis voluptatem adipisci',
//     id: 5,
//     name: 'Emily Clark',
//     numberPhotos: 20,
//     title: 'nesciunt quas odio',
//     userId: 5,
//   },
//   {
//     Follower: 289,
//     Following: 94,
//     body: 'distinctio vitae autem nihil ut molestias quo molestiae omnis',
//     id: 6,
//     name: 'David Miller',
//     numberPhotos: 27,
//     title: 'dolorem eum magni eos aperiam quia',
//     userId: 6,
//   },
//   {
//     Follower: 679,
//     Following: 87,
//     body: 'quia veritatis quasi id rerum est saepe cumque et',
//     id: 7,
//     name: 'Olivia Martinez',
//     numberPhotos: 18,
//     title: 'magnam facilis autem',
//     userId: 7,
//   },
//   {
//     Follower: 176,
//     Following: 64,
//     body: 'accusantium quos tempora officia qui quaerat velit',
//     id: 8,
//     name: 'Liam Wilson',
//     numberPhotos: 14,
//     title: 'dolore placeat quibusdam ea quo vitae',
//     userId: 8,
//   },
//   {
//     Follower: 910,
//     Following: 140,
//     body: 'aspernatur aut odit aut fugit ipsam',
//     id: 9,
//     name: 'Sophia Lee',
//     numberPhotos: 22,
//     title: 'illo est ratione doloremque quia maiores aut',
//     userId: 9,
//   },
//   {
//     Follower: 230,
//     Following: 85,
//     body: 'consequatur necessitatibus eligendi molestias ea aut',
//     id: 10,
//     name: 'William Taylor',
//     numberPhotos: 19,
//     title: 'vero rerum temporibus dolor',
//     userId: 10,
//   },
//   {
//     Follower: 345,
//     Following: 102,
//     body: 'eveniet eligendi necessitatibus velit deserunt atque et',
//     id: 11,
//     name: 'Amelia Anderson',
//     numberPhotos: 12,
//     title: 'ipsa dolores vel facilis',
//     userId: 11,
//   },
// ];
