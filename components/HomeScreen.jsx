import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, FlatList,StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {

  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to store error messages


  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json); // Check the response format in the console
      setData(json); // Ensure this matches the structure of the response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  type ItemProps = {
    title: string
  };

  const Item = ({title}: ItemProps) => (
    <View >
      <Text >{title}</Text>
    </View>
  );

  // Rendering logic
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <SafeAreaView>
    <FlatList
    data={data}
    renderItem={Item}
    keyExtractor={(item) => item.id.toString()}>
    </FlatList>
  </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})