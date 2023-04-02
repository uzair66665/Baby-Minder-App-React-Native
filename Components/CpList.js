import { View, Text, StyleSheet, Image, Pressable,TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from 'react';


const CpList = ({ child }) => {
  
   const Route = useRoute();
   
   const {cid}=Route.params;

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
              
            });
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  return (
    <View
      style={styles.container}
    >
      
      <View style={{ flex: 1 }}>
        <Text style={styles.Foodname}>{child.cpname}</Text>
        <Text style={styles.price}>{child.contact}</Text>
      </View>
      <View
      >
      <TouchableOpacity onPress={() => DelChild(child.cpid)}>
        <Text 
        style={styles.btn1}>Delete</Text>
      </TouchableOpacity>
      
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
      marginVertical: 10,
      marginHorizontal: 20,
      borderBottomColor: "black",
      borderBottomWidth: 1,
      flexDirection: "row",
    },
    Foodname: {
      color:'black',
      fontWeight: "600",
      fontSize: 16,
      letterSpacing: 0.5,
    },
    price: {
      color:"black",
      fontSize: 16,
    },
    image: {
      height: 75,
      aspectRatio: 1,
    },
    edit:{
       color:'blue',
       fontSize:15
    },
    delete:{
      color:'red',
      fontSize:15
   },
   btn1:{
    fontSize:18,
    color:"black",
    width:100,
    backgroundColor:'#e1ecf5',
    borderRadius: 30,
    textAlign:'center',
},
  });
export default CpList;