import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AddCareperson from "../App/Screens/AddCareperson";

const ChildList2 = ({ child }) => {
   const Route = useRoute();
   const navigation = useNavigation();
   //const {pid}=Route.params;
   const {fun}=Route.params;
   
   const AddCP= async()=>{
     const cid=child.cid;
     if(fun=='ad')
        navigation.navigate('AddCareperson',{cid})
      if(fun=='cl')
        navigation.navigate('CarepersonList',{cid})
      if(fun=='cp')
        navigation.navigate('CarepersonPriority',{cid})
      if(fun=='lp')
        navigation.navigate('LullabyPriority',{cid})
   }

  return (
    <Pressable
      style={styles.container} onPress={() => AddCP()}
    >
      
      <View style={{ flex: 1 }}>
        <Text style={styles.Foodname}>{child.cname}</Text>
        <Text style={styles.price}>{child.contact}</Text>
      </View>
      
    </Pressable>
  );
};
const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
      marginVertical: 10,
      marginHorizontal: 20,
      borderBottomColor: "black",
      backgroundColor:'white',
      borderBottomWidth: 1,
      flexDirection: "row",
    },
    Foodname: {
      color:'black',
      fontWeight: "600",
      fontSize: 16,
      letterSpacing: 0.5,
      marginLeft:'10%'
    },
    price: {
      color:"black",
      fontSize: 16,
      marginLeft:'10%'
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
   }
  });
export default ChildList2;