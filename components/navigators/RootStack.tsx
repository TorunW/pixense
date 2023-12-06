import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../../screens/Welcome';
import Ai from '../../screens/Ai';
import Upload from '../../screens/Upload';

export type RootStackParamList = {
  Welcome: undefined;
  Ai: undefined;
  Upload: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = ({ onReady }: { onReady: () => void }): ReactElement => {
  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen
          name='Welcome'
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Ai'
          component={Ai}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Upload'
          component={Upload}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
