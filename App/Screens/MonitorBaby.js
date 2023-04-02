import { View, Text,TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React,{useEffect} from 'react'


export default function MonitorBaby({navigation}){
  const Cry=  async() => {
    try {
        console.log("caling.....")
    await  fetch("http://192.168.132.1:5000/cry_detector", {
            method: 'GET'
          }).then((response) => response.json())
          .then((responseJson) => {
             console.log(responseJson);
             navigation.navigate('LullabyPlaying')
             //alert("Baby is Crying")
          })
        
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }

  useEffect(()=>{
    if(global.cry==1)
    {
      Cry()
    }
    Cry()
  },[])

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
          MONITOR MODE
        </Text>
          </View>
          <View style={{flex:1, justifyContent:'space-evenly'}}>
          <Text style={styles.txt}>
            Baby{"\n"}is{"\n"}Sleeping
          </Text>
          </View>
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
  txt:{
    fontSize:50,
    textAlign:'center'
  }
})
