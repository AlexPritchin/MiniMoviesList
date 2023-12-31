import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

const ListDeleteItemView: React.FC<PressableProps> = (props) => {
  return (
    <Pressable style={styles.pressable} {...props}>
      <Text style={{ fontSize: 20, color: 'white' }}>Delete</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'firebrick',
  },
});

export default ListDeleteItemView;
