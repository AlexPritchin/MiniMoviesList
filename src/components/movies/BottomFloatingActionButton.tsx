import React from 'react';
import { Platform, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const BottomFloatingActionButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 40 : 30,
        right: 30,
        height: 64,
        width: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
      }}
      {...props}
    >
      <Entypo name='plus' size={43} color='white'/>
    </TouchableOpacity>
  );
};

export default BottomFloatingActionButton;
