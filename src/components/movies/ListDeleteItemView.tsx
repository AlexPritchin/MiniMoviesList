import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

const ListDeleteItemView: React.FC<PressableProps> = props => {
  return (
    <Pressable
      style={{
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'firebrick',
      }}
      {...props}
    >
      <Text style={{ fontSize: 20, color: 'white' }}>Delete</Text>
    </Pressable>
  );
};

export default ListDeleteItemView;
