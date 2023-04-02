import { useRoute } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from 'react-native';


const CarepersonPriority = () => {
  let Counter=0;
  const route= useRoute();
  const{cid}=route.params
 
  
  const [data2,setData2]= useState([])  
  const [arr,setArray]= useState([])
  const [first,setFirst]= useState("")
  const [second,setSecond]= useState("")
  useEffect(()=>{
    GetCp()
    console.log('data2',data2)
  },[])
  const GetCp=  async() => {
    try {
        //alert(pid);
        const response = await fetch(global.ip+"Get/Get_Careperson?cid="+cid);
        const json = await response.json();
        setData2(json);
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  const Swap=  async() => {
    try {
        //alert(pid);
        if(arr.length==2)
        {
          console.log(arr[0])
          console.log(arr[1])
          const response = await fetch(global.ip+"Get/update_priority?cid="+cid+"&cpid1="+arr[0]+"&cpid2="+arr[1]);
          GetCp()
        }
        else
        {
            alert("Please Select Only Two Index")
        }
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  const ListItem = ({item, selected, onPress, onLongPress}) => (
    <>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.listItem}>
        <View style={{padding: 8}}>
          {selected ? <Text style={{fontSize: 22, color: 'red'}}>{item.cpname}</Text>
          :
          <Text style={{fontSize: 22, color: 'black'}}>{item.cpname}</Text>
          }
          <Text style={{color: '#989BA1'}}>{item.contact}</Text>
        </View>
        {selected && <View style={styles.overlay} />}
      </TouchableOpacity>
    </>
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const handleOnPress = contact => {
    if (selectedItems.length) {
      return selectItems(contact);
    }

    // here you can add you code what do you want if user just do single tap
    console.log('pressed');
  };

  const getSelected = item => selectedItems.includes(item.cpid);

  const deSelectItems = () => setSelectedItems([]);

  const selectItems = item => {
    if (selectedItems.includes(item.cpid)) {
      const newListItems = selectedItems.filter(
        listItem => listItem !== item.cpid,
        

      );
      arr.pop(item.cpid)
      console.log(arr)
      return setSelectedItems([...newListItems, Counter-=1]);
     
    }
    else if(Counter<=1){
      setSelectedItems([...selectedItems, item.cpid]);
      
      Counter+=1
      arr.push(item.cpid)
      console.log(arr)

    }
  };

  return (
    <ImageBackground
    source={require('../Assests/Images/bg.png')}
    style={{flex:1}}
    >
      <View style={{width: '100%', height: '8%',justifyContent: 'center', backgroundColor: '#00a2ed'}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
          }}>
          CHANGE PRIORITY
        </Text>
      </View>
    <View style={{flex:1}}>
    <Pressable onPress={deSelectItems} style={{flex: 1, padding: 15}}>
      <FlatList
        data={data2}
        renderItem={({item}) => (
          <ListItem
            //onPress={() => handleOnPress(item)}
            onLongPress={() => selectItems(item)}
            selected={getSelected(item)}
            item={item}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Pressable>
        
        <TouchableOpacity style={{alignItems:'center',marginBottom:'20%'}} onPress={() => Swap()}>
              <Text
              style={styles.btn1}>
                  SWAP
              </Text>
            </TouchableOpacity>
        
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {},
  listItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    color:"black",
    width: '100%',
    height: '100%',
    backgroundColor: '#e1ecf5',
    opacity:0.4
  },
  btn1:{
    fontSize:25,
    color:"black",
    width:150,
    backgroundColor:'#00a2ed',
    borderRadius: 30,
    textAlign:'center',
    
},
});

export default CarepersonPriority;