import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackRouter from './src/StackRouter';
export default function App() {
  return (
    <NavigationContainer>
      <StackRouter></StackRouter>
    </NavigationContainer>
  );
}