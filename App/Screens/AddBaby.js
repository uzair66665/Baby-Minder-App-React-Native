import { View, Text,TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { useState,useEffect } from 'react';


//////////////////////////////////////////////
export default function AddBaby({navigation, route}){
    const [pickerValue, setPickerValue] = useState('');
    const [num,setNum]=useState("");
    let cid;
    //const {pid}=route.params;
    //const {email}=route.params;
     const Add=  async() => {
      try {
          await  fetch(global.ip+"Add/Add_child", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cpid:global.pid,
              cid:cid,
              relation:pickerValue,
            })
            }).then(response => response.json())
            .then(data => {
              if(data=='ok')
              {
                alert("Child added successfully")
                navigation.navigate('ParentHome')
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
                alert('Child Already Added')
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
          await  fetch(global.ip+"Add/Chk_Child", {
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
              if(data=="cp")
              {
                alert("Entered Number is Registered with Care Person Account")
              }
              else if(typeof data=='number')
              {
                cid=data;
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
      //alert(global.uemail);
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
          ADD BABY
        </Text>
          </View>

            

          <TextInput style={styles.inputStyle}
                placeholder='Conatct Number'
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                onChangeText={(num)=>setNum(num)}
                
            />
{/*           
          <TextInput style={styles.inputStyle}
            placeholder='Relation'
            autoCapitalize='none'
            placeholderTextColor={'#000'}
            onChangeText={(relation)=>setRelation(relation)}
            
        /> */}
        <View style={styles.container}>
              <Picker style={styles.picker}  
              
              selectedValue={pickerValue}
              onValueChange={(itemValue)=>setPickerValue(itemValue)}
              >
                    <Picker.Item label='Select Relation' enabled={false} ></Picker.Item> 
                    <Picker.Item label='Mother' value={'mother'}></Picker.Item> 
                    <Picker.Item label='Father' value={'father'}></Picker.Item> 
                    <Picker.Item label='Other' value={'other'}></Picker.Item> 
              </Picker>
          </View>


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
            backgroundColor:'#00a2ed',
            marginTop:50,
            borderRadius: 30,
            textAlign:'center',
            justifyContent:'center'
  },
  inputStyle: {
            width:'60%',
            borderColor: 'black',
            backgroundColor: 'white',
            borderWidth: 1,
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
    borderColor:'black',
    borderWidth:1,
    backgroundColor:'white',
    borderBottomLeftRadius:30,
    borderRadius: 30,
  },
})
