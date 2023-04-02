import { View, Text, StyleSheet,ImageBackground, TouchableOpacity,FlatList,Pressable} from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';


///////////////////////////////////////////////
export default function CarepersonList({navigation,route}){
    const [data,setData]=useState("");
    const {cid}=route.params;
    
    const GetCp=  async() => {
        try {
            //alert(pid);
            const response = await fetch(global.ip+"Get/Get_Careperson?cid="+cid);
            const json = await response.json();
            setData(json);
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      const DelChild=  async(id) => {
        try {
            await  fetch(global.ip+"Delete/removeCareperson", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  cpid:id,
                  cid:cid
                })
                }).then(response => response.json())
                .then(data => {
                  
                  alert(data);
                  GetCp()
                });
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      useEffect(() => {
        GetCp();
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
          CAREPERSON LIST
        </Text>
          </View>
       <View>
       <FlatList
          data={data}
          keyExtractor={(item) => item.cpid}
          renderItem={({ item })=> (
            <View style={styles.container} >
              <View style={{ flex: 1 }}>
                  <Text style={styles.Foodname}>{item.cpname}</Text>
                  <Text style={styles.price}>{item.contact}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => DelChild(item.cpid)}>
                  <Text 
                  style={styles.btn1}>Delete</Text>
                </TouchableOpacity>
              
              </View>
            </View>
          )}
        />
        <View style={styles.btn}>
        <TouchableOpacity onPress={() => navigation.navigate('CarepersonSettings')}>
            <Text
             style={styles.btn2}>
                Done
            </Text>
          </TouchableOpacity>
        </View>
          </View>
      </ImageBackground>
      
    
          
  );
}

const styles=StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    backgroundColor:'white'
  },
  Foodname: {
    color:'black',
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
    paddingLeft:10
  },
  price: {
    color:"black",
    fontSize: 16,
    paddingLeft:10
  },
  btn1:{
    fontSize:18,
    color:"black",
    width:100,
    backgroundColor:'#e1ecf5',
    borderRadius: 30,
    textAlign:'center',
},
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
    backgroundColor:'#00a2ed',
    borderRadius: 30,
    marginBottom:'10%',
    textAlign:'center',
    marginTop:"30%",
},
})

