import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/Home';
import Login from './src/Login';
import SignUp from './src/SignUp';
import FirstSrc from './src/FirstSrc';
import Splash from './src/Splash';
import Data from './src/Data';
import Firebase from './src/Firebase';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Root() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="FirstSrc" component={FirstSrc} />
      <Tab.Screen name="Firebase" component={Firebase}/>
    </Tab.Navigator>
  );
}

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='Root' component={Root}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
// AIzaSyBEx0sG_03PJRAaZDAv8KXPtjg7irH4FGQ
export default App;