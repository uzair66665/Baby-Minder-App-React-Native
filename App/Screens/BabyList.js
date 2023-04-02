import { View, Text, StyleSheet,ImageBackground, TouchableOpacity,FlatList,Pressable} from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';


///////////////////////////
export default function BabyList({navigation,route}){
    const [data,setData]=useState("");
    //const {pid}=route.params;
    const GetChild=  async() => {
        try {
            //alert(pid);
            const response = await fetch(global.ip+"Get/Get_Child?id="+global.pid);
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
            await  fetch(global.ip+"Delete/removeChild", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  cpid:global.pid,
                  cid:id
                })
                }).then(response => response.json())
                .then(data => {
                  
                  alert(data);
                  GetChild()
                });
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      useEffect(() => {
        GetChild();
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
          BABY LIST
        </Text>
          </View>
       <View>
       <FlatList
          data={data}
          keyExtractor={(item) => item.cid}
          renderItem={({ item })=> (
          <View style={styles.container} >
              <View style={{ flex: 1 }}>
                  <Text style={styles.Foodname}>{item.cname}</Text>
                  <Text style={styles.price}>{item.contact}</Text>
                </View>
                <View
                >
                <TouchableOpacity onPress={() => DelChild(item.cid)}>
                  <Text 
                  style={styles.btn1}>Delete</Text>
                </TouchableOpacity>
              
              </View>
          </View>
            
          )}
        />
        <View style={styles.btn}>
        <TouchableOpacity onPress={() => navigation.navigate('ParentHome')}>
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
 
  bg:{
    width:'100%',
    height:'100%',
  },
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: "black",
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
  btn:{
alignItems:'center',

  },
  btn1:{
    fontSize:18,
    color:"black",
    width:100,
    backgroundColor:'#e1ecf5',
    borderRadius: 30,
    textAlign:'center',
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

