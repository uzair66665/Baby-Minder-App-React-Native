import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React from 'react'



export default function ParentHome2({navigation}){
  return (
    
      <ImageBackground source={require('../Assests/Images/bg.png')} style={styles.bg} >
          
          <TouchableOpacity onPress={() => navigation.navigate('ChildHome')}>
            <Text
             style={styles.btn1}>
                Lullaby{"\n"}
                Priority
            </Text>
          </TouchableOpacity>



          
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
             style={styles.btn1}>
                Edit{"\n"}
                Profile
            </Text>
          </TouchableOpacity>



          
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
             style={styles.btn1}>
                Unlock Child{"\n"}
                Screen
            </Text>
          </TouchableOpacity>



      </ImageBackground>
    
          
  );
}

const styles=StyleSheet.create({
  
  bg:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  btn1:{
            fontSize:25,
            color:"black",
            width:150,
            backgroundColor:'#b6c8db',
            borderRadius: 30,
            textAlign:'center',
  },
})

