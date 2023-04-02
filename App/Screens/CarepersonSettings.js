import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React, {useState,useEffect} from 'react';


//////////////////////////////////////////
export default function CarepersonSettings({navigation,route}){

    //const {pid}=route.params;
  // const GetUid=  async() => {
  //   try {
  //   await  fetch("http://172.20.144.1/ProjectApi/api/login/Get_Parentid", {
  //           method: 'POST',
  //           headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({
  //             Email:email,
  //           })
  //           }).then(response => response.json())
  //           .then(data => {
  //             pid=data;
  //             //alert(pid);
  //           });
        
  //   }
  //   catch (error) {
  //     console.log("Post submission failed");
  //     console.log(error.message);
  //   }
  // }
  // useEffect(() => {
  //   //alert(email);
  //   GetUid();
  //   //chooseFile('video');
  // }, [])

  return (
    
      <ImageBackground source={require('../Assests/Images/bg.png')} style={styles.bg} >
{/*           
          <TouchableOpacity onPress={() => navigation.navigate('MonitorBaby')}>
            <Text
             style={styles.btn1}>
                Monitor{"\n"}
                Baby
            </Text>
          </TouchableOpacity> */}

<View style={{width: '100%', height: '8%',justifyContent: 'center', backgroundColor: '#00a2ed'}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
          }}>
          CAREPERSON SETTINGS
        </Text>
          </View>

      <View style={styles.viw}>
      <TouchableOpacity onPress={() => navigation.navigate('ChildListForCP',{fun:'ad'})}>
            <Text
             style={styles.btn1}>
                Add{"\n"}
                Careperson
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChildListForCP',{fun:'cl'})}>
            <Text
             style={styles.btn1}>
                Careperson {"\n"}
                List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChildListForCP',{fun:'cp'})}>
            <Text
             style={styles.btn1}>
                Careperson {"\n"}
                Priority
            </Text>
          </TouchableOpacity>



          <TouchableOpacity onPress={() => navigation.navigate('ParentHome')}>
            <Text
             style={styles.btn1}>
                Done
            </Text>
          </TouchableOpacity>
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
  img1:{
    width:"45%",
    height:"40%",
    marginTop:"10%",
  },
  btn1:{
            fontSize:23,
            color:"black",
            width:150,
            backgroundColor:'#00a2ed',
            borderRadius: 30,
            textAlign:'center',
  },
})

