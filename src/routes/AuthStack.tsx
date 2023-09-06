import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from './types';

import LogInScreen from '../screens/auth/LogInScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MainScreen from '../screens/auth/MainScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='LogIn'
        component={LogInScreen}
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
      />
      <Stack.Screen
        name='Main'
        component={MainScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
