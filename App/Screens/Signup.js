import { View, Text,TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';



export default function Signup({navigation}){
  const [pickerValue, setPickerValue] = useState('');
  const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    global.uemail
     const SignupUsr=  async() => {
      try {
        console.log('signing...')
        if(password==confirmPassword)
        {
          await  fetch(global.ip+"login/Add_User", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
              email:email,
              passwrd:password,
              usertype:pickerValue,
            })
            }).then(response => response.json())
            .then(data => {
              if(data=="Sorry")
              {
                alert("Email Already Exists")
              }
              else if(typeof data=='number')
              {
                global.uemail=email
                if (pickerValue=="careperson") {
                  navigation.navigate('SetParentProfile',{userid:data})
                }
                else if(pickerValue=="child"){
                  navigation.navigate('SetChildProfile',{userid:data})
                }
              }
              else 
                alert(data)
            });
        }
        else
          alert("Confirm Password Not match")
        
          
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
          SIGN UP
        </Text>
          </View>

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
            <TextInput style={styles.inputStyle}
                placeholder='Confirm Password'
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                onChangeText={(confirmPassword)=>setConfirmPassword(confirmPassword)}
                secureTextEntry={true}
            />

          <View style={styles.container}>
              <Picker mode="dropdown" style={styles.picker}  
              
              selectedValue={pickerValue}
              onValueChange={(itemValue)=>setPickerValue(itemValue)}
              >
                    <Picker.Item label='Select Role' enabled={false} ></Picker.Item> 
                    <Picker.Item label='Care Person' value={'careperson'}></Picker.Item> 
                    <Picker.Item label='Child' value={'child'}></Picker.Item> 
              </Picker>
          </View>

            <TouchableOpacity onPress={()=>SignupUsr()}>
                <Text
                style={styles.btn1}>
                    Signup
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
