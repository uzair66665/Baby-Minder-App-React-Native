import { View, Text, StyleSheet,ImageBackground, TouchableOpacity,FlatList,Pressable} from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import ChildList2 from '../../Components/ChildList2';


///////////////////////////////////////
export default function ChildListForCP({navigation,route}){
    const [data,setData]=useState("");
    //const {pid}=route.params;
    const {fun}=route.params;
    const GetChild=  async() => {
        try {
            //alert(pid);
            const response = await fetch(global.ip+"Get/Get_ChildforCP?id="+global.pid);
            const json = await response.json();
            setData(json);
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      useEffect(() => {
        //alert(email);
        GetChild();
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
          SELECT CHILD
        </Text>
          </View>
       <View>
       <FlatList
          data={data}
          renderItem={({ item })=> <ChildList2 child={item}/>}
        />
        {/* <View style={styles.btn}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
             style={styles.btn2}>
                Done
            </Text>
          </TouchableOpacity>
        </View> */}
          </View>
      </ImageBackground>
      
    
          
  );
}

const styles=StyleSheet.create({
 
  bg:{
    width:'100%',
    height:'100%',
  },
  btn:{
alignItems:'center',
  },
  btn2:{
    fontSize:30,
    color:"black",
    width:150,
    backgroundColor:'#e1ecf5',
    borderRadius: 30,
    marginBottom:'10%',
    textAlign:'center',
    marginTop:"30%",
},
})

