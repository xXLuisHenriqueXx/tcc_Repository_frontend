import React from 'react'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

import Alarms from '../screens/Alarms';
import CreateAlarm from '../screens/CreateAlarm';
import User from '../screens/User';
import useAuth from '../hook/useAuth';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Register from '../screens/Register';
import UpdateProfile from '../screens/UpdateProfile';
import Notes from "../screens/Notes";
import CreateNote from "../screens/CreateNote";

import { User as UserEntitie } from '../entities/User';
import { Note } from '../entities/Note';
import UpdateNote from '../screens/UpdateNote';

export type PropsNavigationStack = {
  Alarms: {
    newAlarm?: boolean;
  };
  CreateAlarm: undefined;
  Notes: {
    newNote?: boolean;
  };
  CreateNote: undefined;
  UpdateNote: {
    noteInfo?: Note;
  };
  User: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  UpdateProfile: {
    userInfo?: UserEntitie;
  };
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
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="Alarms" component={Alarms} />
            <Stack.Screen name="CreateAlarm" component={CreateAlarm} />
            <Stack.Screen name="Notes" component={Notes} />
            <Stack.Screen name="CreateNote" component={CreateNote} />
            <Stack.Screen name="UpdateNote" component={UpdateNote} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes