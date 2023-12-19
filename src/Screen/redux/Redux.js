import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import actions from '../../redux/actions';

const Redux = () => {
  const number = useSelector(state => state.counterReducer.num);

  const onAdd = () => {
    actions.increment(number);
  };

  const onDes = () => {
    actions.decrement(number);
  };

  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center'}}>{number}</Text>
      <Button title="ADD" onPress={onAdd} />
      <Button title="DES" onPress={onDes} />
    </View>
  );
};

export default Redux;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
