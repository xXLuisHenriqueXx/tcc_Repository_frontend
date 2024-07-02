import React from 'react'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

import Alarms from '../screens/Alarms';
import CreateAlarm from '../screens/CreateAlarm';
import User from '../screens/User';
import useAuth from '../hook/useAuth';
import Welcome from '../screens/Welcome';

export type PropsNavigationStack = {
  Alarms: {
    newAlarm?: boolean;
  };
  CreateAlarm: undefined;
  User: undefined;
  Welcome: undefined;
}

const Stack = createNativeStackNavigator<PropsNavigationStack>();

export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>;

const Routes = () => {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none"
        }}
      >
        {token === null ? (
          <>
            <Stack.Screen name="Alarms" component={Alarms} />
            <Stack.Screen name="CreateAlarm" component={CreateAlarm} />
            <Stack.Screen name="Welcome" component={Welcome} />
          </>
        ) : (
          <>
            <Stack.Screen name="Alarms" component={Alarms} />
            <Stack.Screen name="CreateAlarm" component={CreateAlarm} />
            <Stack.Screen name="User" component={User} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes