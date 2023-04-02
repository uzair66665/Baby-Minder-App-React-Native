import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React, {useState,useEffect} from 'react';



export default function LullabySettings({navigation,route}){


 

  return (
    
      <ImageBackground source={require('../Assests/Images/bg.png')} style={styles.bg} >
<View style={{width: '100%', height: '8%',justifyContent: 'center', backgroundColor: '#00a2ed'}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
          }}>
          LULLABY SETTINGS
        </Text>
          </View>


      <View style={styles.viw}>
      <TouchableOpacity onPress={() => navigation.navigate('AddLullaby')}>
            <Text
             style={styles.btn1}>
                Add{"\n"}
                Lullaby
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LullabyList')}>
            <Text
             style={styles.btn1}>
                Lullaby {"\n"}
                List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChildListForCP',{fun:'lp'})}>
            <Text
             style={styles.btn1}>
                Lullaby {"\n"}
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

