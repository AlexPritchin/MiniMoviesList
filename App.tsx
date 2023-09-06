import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/routes/AuthStack';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
