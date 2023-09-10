import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const BottomFloatingActionButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity style={styles.touchable} {...props}>
      <Entypo name="plus" size={43} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 30,
    right: 30,
    height: 64,
    width: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
  },
});

export default BottomFloatingActionButton;
