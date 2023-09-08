import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import { MainStackParamList } from './types';

import HeaderButton from '../components/HeaderButton';
import LogInScreen from '../screens/auth/LogInScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MoviesListScreen from '../screens/movies/ListScreen';
import AddMovieScreen from '../screens/movies/AddMovieScreen';
import MovieDetailsScreen from '../screens/movies/MovieDetailsScreen';
import SearchMoviesScreen from '../screens/movies/SearchMoviesScreen';

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
            <HeaderButton
              onPress={() => {
                SecureStore.deleteItemAsync('token');
                navigation.popToTop();
              }}
              iconName='logout'
            />
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
      <Stack.Screen
        name='MoviesDetails'
        component={MovieDetailsScreen}
        options={({route}) => ({
          headerTitle: route.params?.title,
        })}
      />
      <Stack.Screen
        name='MoviesSearch'
        component={SearchMoviesScreen}
        options={{
          headerTitle: 'Search movies',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
