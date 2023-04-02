
import { Picker } from '@react-native-picker/picker';
import 'react-native-gesture-handler';
import React from 'react';
import Login1 from './App/Screens/Login1';
import Login from './App/Screens/Login';
import ParentHome from './App/Screens/ParentHome';
import ParentHome2 from './App/Screens/ParentHome2';
import ChildHome from './App/Screens/ChildHome';
import Signup from './App/Screens/Signup';
import AddBaby from './App/Screens/AddBaby';
import BabyList from './App/Screens/BabyList';
import MonitorBaby from './App/Screens/MonitorBaby';
import Signup1 from './App/Screens/Signup1';
import SetChildProfile from './App/Screens/SetChildProfile';
import SetParentProfile from './App/Screens/SetParentProfile';
import AddLullaby from './App/Screens/AddLullaby';
import Exaple from './App/Screens/Exaple'
import LullabySettings from './App/Screens/LullabySettings';
import CarepersonSettings from './App/Screens/CarepersonSettings';
import ChildListForCP from './App/Screens/ChildListForCP';
import AddCareperson from './App/Screens/AddCareperson';
import CarepersonList from './App/Screens/CarepersonList';
import CarepersonPriority from './App/Screens/CarepersonPriority';
import EditProfile from './App/Screens/EditProfile';
import LullabyList from './App/Screens/LullabyList';
import LullabyPlaying from './App/Screens/LullabyPlaying';
import LullabyPriority from './App/Screens/LullabyPriority';
//import JoinChannelVideo from './App/Video/examples/basic/JoinChannelVideo/JoinChannelVideo';
//import JoinChannelVideo from './App/Video/JoinChannelVideo';
import VideoCall from './App/Video/VideoCall';
import AppStateExample from './App/Screens/AppStateExample';
import TestVideo from './App/Video/TestVideo';
import Vid from './App/Video/Vid';
import VCall from './App/Video/VCall';
import CallScreen from './App/Screens/CallScreen'
import ChildCall from './App/Video/ChildCall'
import Dpicker from './App/Screens/DPicker'
import VideoCallSingle from './App/Video/VideoCallSingle'
import VideoFun from './App/Video/VideoFun'
import Img from './App/Screens/Img';
import VideoTest from './App/Screens/VideoTest';
import CryTest from './App/Screens/CryTest';
 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { nativeViewGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
console.disableYellowBox=true;
import ImageLib from './App/Screens/ImageLib'
 global.videoUri="http://192.168.10.22/ProjApi/"
 global.ip="http://192.168.10.22/ProjApi/api/"
 global.flaskip="http://192.168.10.22:5000/cry_detector"
 global.role
const Stack = createStackNavigator();

function MyStack() {
  return (
      //<ImageLib/>
    // <Exaple/>
      //<UploadFromCameraRoll/>
      //<Img/>
      
//<VideoTest/>
//<CryTest/>
//<Video/>
//<JoinChannelVideo/>
//<VideoCall/>
//<VideoFun/>
//<VideoCallSingle/>
//<Dpicker/>
//<APlayer/>
//<AddLullaby/>
    <NavigationContainer>

        <Stack.Navigator>
          
          <Stack.Screen name="Login1" component={Login1} 
              options={{headerShown:false}}/>
              
          <Stack.Screen name="Login" component={Login} 
              options={{headerShown:false}}/>
          <Stack.Screen name="ParentHome2" component={ParentHome2} 
              options={{headerShown:false}}/>
          <Stack.Screen name="ParentHome" component={ParentHome} 
              options={{headerShown:false}}/>
          <Stack.Screen name="ChildHome" component={ChildHome} 
              options={{headerShown:false}}/>
          <Stack.Screen name="Signup" component={Signup} 
              options={{headerShown:false}}/>
          <Stack.Screen name="Signup1" component={Signup1} 
              options={{headerShown:false}}/>
          <Stack.Screen name="AddBaby" component={AddBaby} 
              options={{headerShown:false}}/>
          <Stack.Screen name="BabyList" component={BabyList} 
              options={{headerShown:false}}/>
          <Stack.Screen name="MonitorBaby" component={MonitorBaby} 
              options={{headerShown:false}}/>
          <Stack.Screen name="SetChildProfile" component={SetChildProfile} 
              options={{headerShown:false}}/>
          <Stack.Screen name="SetParentProfile" component={SetParentProfile} 
              options={{headerShown:false}}/>
          <Stack.Screen name="AddLullaby" component={AddLullaby} 
              options={{headerShown:false}}/>
          <Stack.Screen name="LullabySettings" component={LullabySettings} 
              options={{headerShown:false}}/>
          <Stack.Screen name="CarepersonSettings" component={CarepersonSettings} 
              options={{headerShown:false}}/>
          <Stack.Screen name="ChildListForCP" component={ChildListForCP} 
              options={{headerShown:false}}/>
          <Stack.Screen name="AddCareperson" component={AddCareperson} 
              options={{headerShown:false}}/>
          <Stack.Screen name="CarepersonList" component={CarepersonList} 
              options={{headerShown:false}}/>
          <Stack.Screen name="CarepersonPriority" component={CarepersonPriority} 
              options={{headerShown:false}}/>
          <Stack.Screen name="EditProfile" component={EditProfile} 
              options={{headerShown:false}}/>
          <Stack.Screen name="LullabyList" component={LullabyList} 
              options={{headerShown:false}}/>
          <Stack.Screen name="LullabyPlaying" component={LullabyPlaying} 
              options={{headerShown:false}}/>
          <Stack.Screen name="LullabyPriority" component={LullabyPriority} 
              options={{headerShown:false}}/>
            <Stack.Screen name="VideoCall" component={VideoCall} 
              options={{headerShown:false}}/>
        <Stack.Screen name="AppStateExample" component={AppStateExample} 
              options={{headerShown:false}}/>
        <Stack.Screen name="TestVideo" component={TestVideo} 
              options={{headerShown:false}}/>
        <Stack.Screen name="Vid" component={Vid} 
              options={{headerShown:false}}/>
        <Stack.Screen name="VCall" component={VCall} 
              options={{headerShown:false}}/>
        <Stack.Screen name="CallScreen" component={CallScreen} 
              options={{headerShown:false}}/>
        <Stack.Screen name="ChildCall" component={ChildCall} 
              options={{headerShown:false}}/>
        
        
          
         </Stack.Navigator>
     </NavigationContainer>
    
  );
}

export default MyStack
