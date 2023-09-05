import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../routes/types';

type ScreenProps = NativeStackScreenProps<AuthStackParamList, 'LogIn'>;

const LogInScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <View style={{ marginTop: 50, gap: 10 }}>
      <Text>Log In Screen</Text>
      <Pressable onPress={() => navigation.navigate('Main')}>
        <Text>Sign In</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text>Sign Up</Text>
      </Pressable>
    </View>
  );
}

export default LogInScreen;
