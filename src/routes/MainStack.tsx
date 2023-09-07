import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import { MainStackParamList } from './types';

import LogInScreen from '../screens/auth/LogInScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MoviesListScreen from '../screens/movies/ListScreen';
import AddMovieScreen from '../screens/movies/AddMovieScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'aliceblue',
        },
        headerTitleStyle: {
          fontSize: 24,
        },
        headerBackTitleVisible: false,
      }}
    >
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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.popToTop()}>
              <MaterialIcons name='logout' size={26}/>
            </TouchableOpacity>
          ),
          headerTitle: 'Movies List',
        })}
      />
      <Stack.Screen
        name='MoviesAddMovie'
        component={AddMovieScreen}
        options={{
          headerTitle: 'Add new movie',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
