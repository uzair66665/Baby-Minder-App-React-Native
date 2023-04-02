import { View, Text,TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { useState,useEffect } from 'react';


//////////////////////////////////////////////
export default function EditProfile({navigation, route}){
    const [num,setNum]=useState("");
    const [name,setName]=useState("");
    const {typ}=route.params;

    const UpdateProfile=  async() => {
        try {
            if(typ=='parent')
            {
              await  fetch(global.ip+"setprofile/update_parent", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  cpname:name,
                  contact:num,
                  cpid:global.pid
                })
                }).then(response => response.json())
                .then(data => {
                  if(data=="sorry")
                  {
                    alert("Contact No Already Exists")
                  }
                  else if(typeof data=='number')
                  {
                      alert("Profile Updated")
                      navigation.navigate('ParentHome')
                    
                  }
                  else 
                    alert(data)
                });
            }
            if(typ=='child')
            {
              await  fetch(global.ip+"setprofile/update_child", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  cname:name,
                  contact:num,
                  cid:global.cid
                })
                }).then(response => response.json())
                .then(data => {
                  if(data=="sorry")
                  {
                    alert("Contact No Already Exists")
                  }
                  else if(typeof data=='number')
                  {
                      alert("Profile Updated")
                      navigation.navigate('ChildHome')
                    
                  }
                  else 
                    console.log(data)
                });
            }
          
            
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
          EDIT PROFILE
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

        


            <TouchableOpacity onPress={()=>UpdateProfile()}>
                <Text
                style={styles.btn1}>
                    Update
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
  container:{
    marginTop:'10%',
   justifyContent:'center',
   alignItems:'center',
  },
  picker:{
    width:230,
    color:'black',
    borderColor:'blue',
    borderWidth:1,
    backgroundColor:'white',
    borderBottomLeftRadius:30,
    borderRadius: 30,
  },
})
