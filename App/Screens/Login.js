import { View, Text,TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import { Voximplant } from 'react-native-voximplant';
import {ACC_NAME, APP_NAME} from '../Constants/Constants';


export default function Login({navigation}){
  
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    global.uemail
    // const voximplant = Voximplant.getInstance();
    // const connect=async ()=>{
    //   const status=await voximplant.getClientState();
    //   if(status === Voximplant.ClientState.DISCONNECTED){
    //     await voximplant.connect();
    //   }
    //   console.log(status);
    // }
    // useEffect(()=>{
     
    
       
    //    connect(); 
    // },[])

    const LoginVox= async()=>{
      try{
        //const fqUsername=`${email}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
       
        //alert(fqUsername)
        await voximplant.login( `${email}@videocall.uzair66665.voximplant.com`,password,)
        //await voximplant.login(fqUsername,password,);
        alert('login')
        navigation.navigate('ParentHome',{email})
       }
      catch(e){
        
        alert(e.name);
        alert('oooooo')
      }
    }
 
     const LoginUser=  async() => {
      try {
      await  fetch(global.ip+"login/User_Login", {
              method: 'POST',
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email:email,
                passwrd:password
              })
              }).then(response => response.json())
              .then(data => {
                console.log(data)
                global.uemail=email
                if (data ==1) {
                  //LoginVox();
                  
                  navigation.navigate('ParentHome')
                }
                else if(data==2){
                  //LoginVox();
                  navigation.navigate('ChildHome')
                }
                else alert("Incorrect username or password")
              });
          
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }
  
  return (
    <View >
      <ImageBackground source={require('../Assests/Images/bg.png')} style={styles.bg} >
      <View style={{width: '100%', height: '8%',justifyContent: 'center', backgroundColor: '#00a2ed'}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
          }}>
          LOGIN
        </Text>
      </View>
          <Image
          style={styles.img1}
          source={require('../Assests/Images/logo1.png')}
          />

            <TextInput style={styles.inputStyle}
                placeholder='Enter Email'
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                onChangeText={(email)=>setEmail(email)}
            />

            <TextInput style={styles.inputStyle}
                placeholder='Enter Password'
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                onChangeText={(password)=>setPassword(password)}
                secureTextEntry={true}
            />

            <TouchableOpacity onPress={() => LoginUser() }>
                <Text
                style={styles.btn1}>
                    Login
                </Text>
            </TouchableOpacity>

            
      </ImageBackground>
    </View>
          
  );
}

const styles=StyleSheet.create({
  
  bg:{
    width:'100%',
    height:'100%',
    alignItems:'center',
  },
  img1:{
    width:"45%",
    height:"30%",
    marginTop:"10%",
  },
  btn1:{
            fontSize:30,
            color:"black",
            width:150,
            backgroundColor:'#00a2ed',
            marginTop:50,
            borderRadius: 30,
            textAlign:'center',
            justifyContent:'center'
  },
  inputStyle: {
            color:"black",
            width:'60%',
            marginTop:'7%',
            paddingLeft:25,
            borderRadius: 30,
            borderColor: 'black',
            backgroundColor: 'white',
            borderWidth: 1,
            
  },
})
