import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Header from './components/header';
import BranchItem from './components/branchItem';
import AddBranch from './components/addBranch';

export default function App() {
  const [branches, setBranches] = useState([
    {text: 'Education', key: '1'},
    {text: 'Health $ Fitness', key: '2'},
    {text: 'Business', key: '3'},
  ]);

  const pressHandler = key => {
    setBranches(prevBranches => {
      return prevBranches.filter(branch => branch.key !== key);
    });
  };

  const submitHandler = text => {
    if (text.length < 3) {
      setBranches(prevBranches => {
        return [{text, key: Math.random().toString()}, ...prevBranches];
      });
    } else {
      Alert.alert('OOPS', 'Branch must be over 3 characters long', [
        {
          text: 'Understood',
          onPress: () => console.log('alert closed'),
        },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log('dismissed');
      }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddBranch submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={branches}
              renderItem={({item}) => (
                <BranchItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});
