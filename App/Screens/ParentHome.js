import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React, {useRef,useState,useEffect} from 'react';



export default function ParentHome({navigation,route}){

  //let pid;
  global.pid
  global.caleeName
  global.caleeid
  //const {email}=route.params;
  const GetUid=  async() => {
    try {
    await  fetch(global.ip+"login/Get_Parentid", {
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
              //console.log(data)
              global.pid=data;
              //alert(pid);
            });
        
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  const checkNotification=  async() => {
    try {
     // console.log(global.pid)
      const response = await fetch(global.ip+"notification/checkCalling?id="+global.pid);
        const json = await response.json();
        //console.log(json)
        if(json=="nocall")
        {
            
        }
        else if(json=='no')
        {

        }
        else
        {
          console.log(json)
          global.caleeName=json.cname;
          global.caleeid=json.cid;
          navigation.navigate('CallScreen')
        }
          
        
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  
  useEffect(() => {
    //alert(global.uemail);
    GetUid();
  }, [])
  useEffect(() => {
    const interval=setInterval(()=>{
      checkNotification();
      //console.log("3 seconds")
    },3000)
    return()=>clearImmediate(interval)
    
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
          PARENT HOME
        </Text>
          </View>


      <View style={styles.viw}>
        <TouchableOpacity onPress={() => navigation.navigate('AddBaby')}>
            <Text
             style={styles.btn1}>
                Add{"\n"}
                Baby
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BabyList')}>
            <Text
             style={styles.btn1}>
                Baby {"\n"}
                List
            </Text>
          </TouchableOpacity>



          <TouchableOpacity onPress={() => navigation.navigate('LullabySettings')}>
            <Text
             style={styles.btn1}>
                Lullaby{"\n"}
                Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CarepersonSettings')}>
            <Text
             style={styles.btn1}>
                CarePerson{"\n"}
                Settings
            </Text>
          </TouchableOpacity>



          <TouchableOpacity onPress={() => navigation.navigate('EditProfile',{typ:'parent'})}>
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

