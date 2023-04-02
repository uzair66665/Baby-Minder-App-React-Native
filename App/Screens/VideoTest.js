import React ,{useState,useEffect} from 'react';
import {View,Text,Button,StyleSheet,Image,TextInput,SafeAreaView,TouchableOpacity,Alert,KeyboardAvoidingView,ScrollView} 
from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker'; 







const AddLullaby=({navigation})=>
{
const [filePath, setFilePath] = useState();
const [singleFile, setSingleFile] = useState(null);
const [shouldShow ,setshouldShow]= useState(true);
const [ID,setID] = useState('')
const [Category,setCategory] = useState('')
const [Stocktype,setStocktype] = useState('')
const [Location,setLocation] = useState('')
const [Weight,setWeight] = useState('')
const [Age,setAge] = useState('')
const [Price,setPrice] = useState('')
const [AvailableShares,setAvailableShares] = useState('')
const [Description,setDescription] = useState('')
let imageName;

const chooseFile = (type) => {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
  };
  launchImageLibrary(options, (response) => {
    console.log('Response = ', response);

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
    console.log('base64 -> ', response.assets[0].base64);
    console.log('uri -> ', response.uri);
    console.log('width -> ', response.width);
    console.log('height -> ', response.height);
    console.log('fileSize -> ', response.fileSize);
    console.log('type -> ', response.type);
    console.log('fileName -> ', response.assets[0].fileName);
    setFilePath(response.assets[0]);
    //console,log(filePath)
    //AddVideo();
  });
};
const AddVideo = async () => {
  try {
 
    const data = new FormData();
    data.append("video", {
      name: 'abc.mp4',
      type: 'video/mp4',
      uri:
        Platform.OS === "android" ? filePath.uri : filePath.uri.replace("file://", "")
    });
    console.log("Calling  1...");
    await fetch(global.ip+'File/UploadFile',
      {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data;',
        }
      }
    ).then(response => response.json())
      .then(data => {
        console.log("Printing filename...");
        console.log(data.Name);
        console.log("Calling  ...");
        imageName=data.Name
        fetch(global.ip+"File/Add_File", {
          method: 'POST',
          body: JSON.stringify({
            vname:imageName,
            cpid:global.pid
          }
          ),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(data => {
            if (data != '') {
              alert("Successfully Posted!"+imageName)
              navigation,navigate('LullabySettings')
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
useEffect(() => {
  //alert(global.uemail);
  //GetUid();
  chooseFile('video');
}, [])
    return(
        <View style ={styles.body}>
        <View  style ={styles.view}>
        <TouchableOpacity onPress={() => chooseFile('video')}>
        {filePath!=undefined? 
          ( <Image  style={styles.image001} source={{uri:filePath.uri}}
            resizeMode='stretch'/>)
       :
       (<Image  style={styles.image} source={require('../Assests/Images/bg.png')}
       resizeMode='stretch'/>)
     
        
         } 
    
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>AddVideo()}>
                <Text
                style={styles.btn1}>
                    Add
                </Text>
            </TouchableOpacity>
        </View>
        
        
        

         </View>

        )
    };
    export default AddLullaby;
    const styles = StyleSheet.create({
        body: {
            flex:1,
           backgroundColor:'#DCDCDC',
          },
          
          view:{
              height:'100%',
              justifyContent:'center',
              alignItems:'center',
              borderColor:'#696969',
              borderWidth:1,

          },
         
           image:{
             width:300,
             height:600,
          },
          image001:{
            width:300,
             height:600,
         },
         
         
         btn1:{
          fontSize:30,
          color:"black",
          width:150,
          backgroundColor:'#75c8ff',
          marginTop:50,
          borderRadius: 30,
          textAlign:'center',
          justifyContent:'center'
},
    });