import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import { MainStackParamList } from './types';

import LogInScreen from '../screens/auth/LogInScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MoviesListScreen from '../screens/movies/ListScreen';

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
        name='MoviesList'
        component={MoviesListScreen}
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: 'aliceblue',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.popToTop()}>
              <MaterialIcons name='logout' size={24}/>
            </TouchableOpacity>
          ),
          headerTitle: 'Movies List',
          headerTitleStyle: {
            fontSize: 24,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
