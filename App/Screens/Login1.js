import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React from 'react'



export default function Login1({navigation}){
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
          BABY MINDER
        </Text>
      </View>
          <Image
          style={styles.img1}
          source={require('../Assests/Images/logo1.png')}
          />

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
             style={styles.btn1}>
                Login
            </Text>
          </TouchableOpacity>



          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
             style={styles.btn1}>
                Signup
            </Text>
          </TouchableOpacity>
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
            fontSize:30,
            color:"black",
            width:150,
            backgroundColor:'#00a2ed',
            marginTop:50,
            borderRadius: 30,
            textAlign:'center',
  },
})

