import { View, Text,TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { useState,useEffect } from 'react';



export default function AddCareperson({navigation, route}){
    const [num,setNum]=useState("");
    //const {pid}=route.params;
    const {cid}=route.params;
    let cpid;
    // useEffect(() => {
    //   alert(pid)
    // }, [])
     const Add=  async() => {
      try {
          await  fetch(global.ip+"Add/Add_Child", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cpid:cpid,
              cid:cid,
              relation:'other'
            })
            }).then(response => response.json())
            .then(data => {
                console.log(data)
              if(data=='ok')
              {
                alert("Careperson added successfully")
                navigation.navigate('CarepersonSettings')
              }
              else if(data=='m')
              {
                  alert("Mother is already added with this child")
                
              }else if(data=='f')
              {
                alert("Father is already added with this child")
              }else if(data=='o')
              {
                alert("This careperson is already added with this child")
              }
              else if(data=='already')
              {
                alert('Careperson Already Added',[{onPress:() =>console.log('OK Pressed')}])
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
    const Check=  async() => {
      try {
          await  fetch(global.ip+"Add/Chk_Parent", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contact:num,
            })
            }).then(response => response.json())
            .then(data => {
              if(data=="c")
              {
                alert("Entered Number is Registered with Child Account")
              }
              else if(typeof data=='number')
              {
                cpid=data;
                  Add()
              }else if(data=='sorry')
              {
                alert("Entered Number is Not Registered")
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
    useEffect(() => {
      //alert(cid);
      //chooseFile('video');
    }, [])
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
          ADD CAREPERSON
        </Text>
          </View>
          <TextInput style={styles.inputStyle}
                placeholder='Conatct Number'
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                onChangeText={(num)=>setNum(num)}
                
            />
            <TouchableOpacity onPress={()=>Check()}>
                <Text
                style={styles.btn1}>
                    Add
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
