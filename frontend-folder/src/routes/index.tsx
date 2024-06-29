import React from 'react'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

import Alarms from '../screens/Alarms';
import CreateAlarm from '../screens/CreateAlarm';
import User from '../screens/User';

export type PropsNavigationStack = {
  Alarms: {
    newAlarm?: boolean;
  };
  CreateAlarm: undefined;
  User: undefined;
}

const Stack = createNativeStackNavigator<PropsNavigationStack>();

export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>;

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none"
        }}
      >
        <Stack.Screen name="Alarms" component={Alarms} />
        <Stack.Screen name="CreateAlarm" component={CreateAlarm} />
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes