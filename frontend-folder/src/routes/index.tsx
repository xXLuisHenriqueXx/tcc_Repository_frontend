import React from 'react'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

import Welcome from '../screens/WelcomeScreens/Welcome';
import Login from '../screens/WelcomeScreens/Login';
import Register from '../screens/WelcomeScreens/Register';
import User from '../screens/UserScreens/User';
import UpdateProfile from '../screens/UserScreens/UpdateProfile';

import Pomodoro from '../screens/PomodorosScreens/Pomodoro';
import PomodoroRunning from '../screens/PomodorosScreens/PomodoroRunning';

import Alarms from '../screens/AlarmsScreens/Alarms';
import CreateAlarm from '../screens/AlarmsScreens/CreateAlarm';
import UpdateAlarm from '../screens/AlarmsScreens/UpdateAlarm';

import Notes from "../screens/NotesScreens/Notes";
import CreateNote from "../screens/NotesScreens/CreateNote";
import UpdateNote from '../screens/NotesScreens/UpdateNote';

import Todos from '../screens/TodosScreens/Todos';
import CreateTodo from '../screens/TodosScreens/CreateTodo';
import UpdateTodo from '../screens/TodosScreens/UpdateTodo';

import useAuth from '../hook/useAuth';
import { User as UserEntitie } from '../entities/User';
import { Note } from '../entities/Note';
import { Todo } from '../entities/Todo';
import { Alarm } from '../entities/Alarm';

export type PropsNavigationStack = {
  Pomodoro: undefined;
  PomodoroRunning: {
    studyTime: number;
    restTime: number;
  };
  Alarms: {
    newAlarm?: boolean;
  };
  CreateAlarm: undefined;
  UpdateAlarm: {
    alarmInfo?: Alarm;
  }
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
            <Stack.Screen name="Pomodoro" component={Pomodoro} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="Pomodoro" component={Pomodoro} />
            <Stack.Screen name='PomodoroRunning' component={PomodoroRunning} />
            <Stack.Screen name="Alarms" component={Alarms} />
            <Stack.Screen name="CreateAlarm" component={CreateAlarm} />
            <Stack.Screen name="UpdateAlarm" component={UpdateAlarm} />
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