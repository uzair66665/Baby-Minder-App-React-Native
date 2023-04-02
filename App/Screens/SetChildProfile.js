import { View, Text,TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';



export default function SetChildProfile({navigation, route}){
  const [name,setName]=useState("");
    const [num,setNum]=useState("");
    const [age,setAge]=useState("");
    const {userid}=route.params;
    global.cid
     const SetProfile=  async() => {
      try {
          await  fetch(global.ip+"setprofile/set_child", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cname:name,
              Contact:num,
              cage:age,
              uid:userid
            })
            }).then(response => response.json())
            .then(data => {
              if(data=="sorry")
              {
                alert("Contact No Already Exists")
              }
              else if(typeof data=='number')
              {
                global.cid=data
                  navigation.navigate('ChildHome')
                
              }
              else 
                alert(data)
            });
        
          
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }
  return(
    <View >
      <ImageBackground source={require('../Assests/Images/bg.png')} style={styles.bg} >
      <View style={{width: '100%', height: '8%',justifyContent: 'center', backgroundColor: '#00a2ed'}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
          }}>
          SET PROFILE
        </Text>
          </View>

            <TextInput style={styles.inputStyle}
                placeholder='Name'
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                onChangeText={(name)=>setName(name)}
            />

            <TextInput style={styles.inputStyle}
                placeholder='Conatct Number'
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                onChangeText={(num)=>setNum(num)}
                
            />
            <TextInput style={styles.inputStyle}
                placeholder='Age'
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                onChangeText={(age)=>setAge(age)}
            />


            <TouchableOpacity onPress={()=>SetProfile()}>
                <Text
                style={styles.btn1}>
                    Save
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
            width:'60%',
            backgroundColor:'white',
            color:'#000',
            placeholderTextColor:'black',
            marginTop:'10%',
            paddingLeft:25,
            borderRadius: 30,
  },
})
