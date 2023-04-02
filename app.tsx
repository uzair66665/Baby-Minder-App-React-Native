
import 'react-native-gesture-handler';
import React from 'react';
import Login from './App/Screens/Login';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamsList } from './App/Video/ParamsList';
const Stack = createStackNavigator<ParamsList>();


function MyStack() {
  return (

    <NavigationContainer>

        <Stack.Navigator>
          
          <Stack.Screen name="Login" component={Login} 
              options={{headerShown:false}}/>
          
          
        </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default MyStack
