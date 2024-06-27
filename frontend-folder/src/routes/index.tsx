import React from 'react'
import { NativeStackNavigationProp, createNativeStackNavigator } from 'react-native-screens/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Alarms from '../screens/Alarms';
import CreateAlarm from '../screens/CreateAlarm';

export type PropsNavigationStack = {
  Alarms: {
    newAlarm?: boolean;
  };
  CreateAlarm: undefined;
}

const Stack = createNativeStackNavigator<PropsNavigationStack>();

export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>;

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Alarms" component={Alarms} />
        <Stack.Screen name="CreateAlarm" component={CreateAlarm} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes