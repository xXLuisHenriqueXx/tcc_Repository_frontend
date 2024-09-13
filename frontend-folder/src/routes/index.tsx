import React from 'react'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Register from '../screens/Register';
import User from '../screens/User';
import UpdateProfile from '../screens/UpdateProfile';
import Alarms from '../screens/Alarms';
import CreateAlarm from '../screens/CreateAlarm';
import Notes from "../screens/Notes";
import CreateNote from "../screens/CreateNote";
import UpdateNote from '../screens/UpdateNote';
import Todos from '../screens/Todos';
import CreateTodo from '../screens/CreateTodo';
import UpdateTodo from '../screens/UpdateTodo';

import useAuth from '../hook/useAuth';
import { User as UserEntitie } from '../entities/User';
import { Note } from '../entities/Note';
import { Todo } from '../entities/Todo';

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
  Todos: {
    newTodo?: boolean;
  };
  CreateTodo: undefined;
  UpdateTodo: {
    todoInfo?: Todo;
  }
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
          animation: "none",
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
            <Stack.Screen name="Todos" component={Todos} />
            <Stack.Screen name="CreateTodo" component={CreateTodo} />
            <Stack.Screen name="UpdateTodo" component={UpdateTodo} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;