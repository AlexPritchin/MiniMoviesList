import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MainStackParamList } from '../../routes/types';

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'Main'>;

const MainScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <View style={{ marginTop: 50, gap: 10 }}>
      <Text>Main Screen</Text>
      <Pressable onPress={() => navigation.popToTop()}>
        <Text>Log Out</Text>
      </Pressable>
    </View>
  );
}

export default MainScreen;
