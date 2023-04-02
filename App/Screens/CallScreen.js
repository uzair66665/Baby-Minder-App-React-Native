import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity,Button, Alert} from 'react-native'
import React from 'react'



export default function CallScreen({navigation}){
  
    const connectcall= async(check)=>{
        try {
            const response = await fetch(global.ip+"notification/updateCalling?cid="+global.caleeid+"&check="+check+"&cpid="+global.pid);
              const json = await response.json();
              console.log(json)
              global.role="parent"
              if(check=="accept")
              {
                navigation.navigate('VCall')
              }
              else if(check=="reject")
              {
                navigation.navigate('ParentHome')
              }
              else if(check=="hold")
              {
                navigation.navigate('ParentHome')
              }
              
              
          }
          catch (error) {
            console.log("Post submission failed");
            console.log(error.message);
          }
    }
  return (
    <View style={styles.vie}>
      <ImageBackground source={require('../Assests/Images/bg.png')} style={styles.bg} >
      <View style={{width: '100%', height: '8%',justifyContent: 'center', backgroundColor: '#00a2ed'}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
          }}>
          INCOMMING VIDEO CALL
        </Text>
      </View>
      <View style={{width: '100%', height: '50%',justifyContent: 'center'}}>
        <Text style={{
            fontSize: 60,
            textAlign: 'center',
            color: 'black',
            textTransform: 'uppercase'
          }}>
            {global.caleeName}{"\n"}Is{"\n"}Crying
        </Text>
      </View>
          
          
    
        <View style={{flex:1,justifyContent:"space-evenly", marginTop:100}}>
        <TouchableOpacity onPress={() => connectcall("accept")}>
            <Text
             style={styles.btn1}>
                Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => connectcall("reject")}>
            <Text
             style={styles.btn2}>
                Reject
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => connectcall("hold")}>
            <Text
             style={styles.btn3}>
                Hold
            </Text>
          </TouchableOpacity>
        </View>

          
          {/* <TouchableOpacity onPress={() => navigation.navigate('VideoCall')}>
            <Text
             style={styles.btn1}>
                Signup
            </Text>
          </TouchableOpacity> */}
          
      </ImageBackground>
    </View>
          
  );
}

const styles=StyleSheet.create({
  vie:{
  },
  bg:{
    width:'100%',
    height:'100%',
    alignItems:'center',
  },
  img1:{
    width:"45%",
    height:"40%",
    marginTop:"10%",
  },
  btn1:{
            fontSize:40,
            color:"black",
            width:150,
            backgroundColor:'#3ff731',
            borderRadius: 30,
            textAlign:'center',
  },
  btn2:{
    fontSize:40,
    color:"black",
    width:150,
    backgroundColor:'red',
    borderRadius: 30,
    textAlign:'center',
},
btn3:{
  fontSize:40,
  color:"black",
  width:150,
  backgroundColor:'#00a2ed',
  borderRadius: 30,
  textAlign:'center',
},
})

