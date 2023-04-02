import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React from 'react'
import {useState,useEffect} from 'react';


export default function ChildHome({navigation,route}){
global.cid
  const GetUid=  async() => {
    try {
    await  fetch(global.ip+"login/Get_Childid", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Email:global.uemail,
            })
            }).then(response => response.json())
            .then(data => {
              global.cid=data;
              console.log(global.cid)
            });
        
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  useEffect(() => {
    //alert(global.uemail);
    GetUid();
    //chooseFile('video');
  }, [])
  return (
    
      <ImageBackground source={require('../Assests/Images/bg.png')} style={styles.bg} >
          <View style={{width: '100%', height: '8%',justifyContent: 'center', backgroundColor: '#00a2ed'}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
          }}>
          CHILD HOME
        </Text>
          </View>
          <View style={styles.viw}>
            <TouchableOpacity onPress={() => navigation.navigate('LullabyPlaying')}>
              <Text
              style={styles.btn1}>
                  Monitor{"\n"}
                  Mode
              </Text>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile',{typ:'child'})}>
              <Text
              style={styles.btn1}>
                  Edit{"\n"}
                  Profile
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('VCall')}>
              <Text
              style={styles.btn1}>
                  Video{"\n"}
                  Call
              </Text>
            </TouchableOpacity> */}
          </View>



          
          



      </ImageBackground>
    
          
  );
}

const styles=StyleSheet.create({
  
  bg:{
    width:'100%',
    height:'100%',
  },
  viw:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  btn1:{
            fontSize:25,
            color:"black",
            width:150,
            backgroundColor:'#00a2ed',
            borderRadius: 30,
            textAlign:'center',
  },
})

