import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../routes/types';

type ScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <View style={{ marginTop: 50, gap: 10 }}>
      <Text>Register Screen</Text>
      <Pressable onPress={() => navigation.navigate('Main')}>
        <Text>Sign Up</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('LogIn')}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
}

export default RegisterScreen;
