import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/routes/AuthStack';

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
