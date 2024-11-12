import React, {useState, useEffect} from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

const ContactListScreen = () => {
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fecthContactData = async () => {
    try {
      const response = await fetch(
        'https://mocki.io/v1/0a3ebc57-4588-470a-b8ce-481511ca696c',
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      setContactList(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthContactData();
  }, []);

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
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={contactList}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </SafeAreaView>
  );
};

export default ContactListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'lightgrey',
    padding: 5,
  },
  item: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

// [
//   {title: 'A', data: ['Ajay', 'Amit', 'Aman']},
//   {title: 'B', data: ['Billy', 'Bread', 'Ben']},
//   {title: 'C', data: ['Charlie', 'Chris', 'Catherine']},
//   {title: 'D', data: ['David', 'Diana', 'Derek']},
//   {title: 'E', data: ['Eve', 'Elena', 'Edward']},
//   {title: 'F', data: ['Frank', 'Fiona', 'Faith']},
// ];
