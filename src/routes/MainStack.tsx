import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainStackParamList } from './types';

import LogInScreen from '../screens/auth/LogInScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MainScreen from '../screens/auth/MainScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='AuthLogIn'
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AuthRegister'
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Main'
        component={MainScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
