import { View, Text,TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';


export default function CryTest({navigation}){
  
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    global.uemail
    

    
 
     const Cry=  async() => {
      try {
          console.log("caling.....")
      await  fetch("http://192.168.186.1:5000/cry_detector", {
              method: 'GET'
            }).then((response) => response.json())
            .then((responseJson) => {
               console.log(responseJson);
               
               
            })
          
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
          CRY TEST
        </Text>
          </View>
           

            <TouchableOpacity onPress={() => Cry() }>
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
            backgroundColor:'#75c8ff',
            marginTop:50,
            borderRadius: 30,
            textAlign:'center',
            justifyContent:'center'
  },
  inputStyle: {
            color:"black",
            width:'60%',
            backgroundColor:'#75c8ff',
            marginTop:'7%',
            paddingLeft:25,
            borderRadius: 30,
  },
})
