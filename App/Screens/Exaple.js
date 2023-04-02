import { StyleSheet, Text, View ,TouchableOpacity,Button,Image,FlatList} from 'react-native'
import React,{ useEffect} from 'react'
import {
    launchCamera, 
    launchImageLibrary
  } from 'react-native-image-picker';


export default function Exaple() {
    const [filePath, setFilePath] = React. useState();
  const [Imgname ,setiImgname] = React. useState();
  const [text, onChangeText] = React.useState("Useless Text");
  const[img,setImg] = React. useState();
 let  imgname;
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
          console.log(response)
   
     
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
  
      console.log('base64 -> ', response.base64);
      console.log('uri -> ',response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
     
      console.log('file PAth  -> ', response.assets[0].fileName);
      setFilePath(response.assets[0]);
      console.log("file="+JSON.stringify(filePath));  
     // console.log("filename========== "+JSON.stringify(filePath.fileName))
     let n=response.assets[0].fileName;
      setiImgname(n);
            console.log("Image name========== "+Imgname)
          
    
    });
  };
  const onGroupClick = async () => {
    try {
  
      const data = new FormData();
      data.append("photo", {
        name: Imgname,
        type: 'image/jpeg',
        uri:
          Platform.OS === "android" ? filePath.uri : filePath.uri.replace("file://", "")
      });
      console.log("Calling  1...");
      await fetch(
"http://172.25.48.1/ProjectApi/api/login/UploadFile",
        {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data;',
          }
        }
      ).then(response => response.json())
        .then(data => {
          console.log("Printing  image name...",data.Name);
        
          console.log("Calling  ...");
          fetch("http://172.25.48.1/ProjectApi/api/login/Add_File", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
       
            
            imgpath:data.Name,
            })
            }).then(response => response.json())
            .then(data => {
              if (data != '') {
                alert("Successfully Posted!"+data)
              }
              else alert("Plz Try Again!")
            });
        });
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
 

  const getAllImages = () => {
    return fetch('http://172.25.48.1/ProjectApi/api/login/AllImages')
      .then((response) => response.json())
      .then((json) => {
        setImg(json)
        console.log(JSON.stringify(img))

      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllImages();
  },[]);
  return (
    <View>
          <TouchableOpacity
       
       onPress={() => {chooseFile('photo')}}>
         
         <View style={styles.Imgcontainer}>
   {filePath != undefined ? (
       <Image source={{uri:filePath.uri}} style={{width:100,height:100}}/>
        
       ) : (
       <Text>Select Image</Text>
       )}
         
     </View>
     </TouchableOpacity>
    
      <Button title="login" onPress={()=>onGroupClick()}/>



      <FlatList
  
  data={img}
  renderItem={({ item }) => (
     
    <Image source={{uri:item.imgpath}} style={{width:300,height:300}}/>
  )}
  keyExtractor={item => item.id}
/>

    </View>
  )
}

const styles = StyleSheet.create({})